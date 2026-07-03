var EasyProxy = (function() {
    var instances = [];

    var etld = {
        "ac": true,
        "co": true,
        "com": true,
        "edu": true,
        "go": true,
        "gov": true,
        "ne": true,
        "net": true,
        "or": true,
        "org": true,
        "sch": true
    };

    var pacScript = `
function FindProxyForURL(url, host) {
    for (;;) {
        var hit = RULES[host];

        if (hit) {
            return hit;
        }

        var dot = host.indexOf(".");

        if (dot < 0) {
            return "DIRECT";
        }

        host = host.substring(dot + 1);
    }
}
`;

    function EasyProxy() {
        instances.push(this);

        this.props = {
            proxies: [],
            routing: {},
            ruleMap: {}
        };
    }

    EasyProxy.getScript = function(instances) {
        console.log(instances);
        var proxies = [];
        var scripts = [];

        for (var i = 0, l = instances.length; i < l; i++) {
            var instance = instances[i];

            if ('*' in instance.props.routing) {
                return 'function FindProxyForURL(url, host) {\n    return "' + global + '";\n}\n';
            }

            var ruleMap = instance.props.ruleMap;
            var servers = instance.props.proxies;

            for (var j = 0, m = servers.length; j < m; j++) {
                let proxy = servers[j];
                let rules = ruleMap[proxy];

                if (rules.length === 0) {
                    continue;
                }

                if (proxy === 'DIRECT') {
                    var id = '"DIRECT"';
                } else {
                    id = 'PROXY' + proxies.length;
                    proxies.push('var ' + id + ' = "' + proxy + '";');
                }

                for (var k = 0, n = rules.length; k < n; k++) {
                    var r = rules[k];
                    scripts.push('    "' + r + '": ' + id);
                }
            }
        }

        if (proxies.length === 0) {
            return 'function FindProxyForURL(url, host) {\n    return "DIRECT";\n}\n';
        }

        return proxies.join('\n') + '\n\nvar RULES = {\n' + scripts.join(',\n') + '\n};\n' + EasyProxy.#pacScript;
    }

    EasyProxy.makeRule = function(host) {
        var array = host.split('.');

        if (array.length < 2) {
            return host;
        }

        var sbd = array.at(-3);
        var sld = array.at(-2);
        var tld = array.at(-1);

        if (sbd && sld in etld) {
            return sbd + '.' + sld + '.' +tld;
        }

        return sld + '.' +tld;
    }

    Object.defineProperty(EasyProxy, 'pacScript', {
        get: function() {
            return EasyProxy.getScript(instances);
        }
    });

    Object.defineProperty(EasyProxy.prototype, 'routing', {
        get: function() {
            return this.props.routing;
        }
    });

    Object.defineProperty(EasyProxy.prototype, 'pacScript', {
        get: function() {
            return EasyProxy.getScript([this]);
        }
    });

    EasyProxy.prototype.getScript = function(proxy) {
        var rules = this.props.ruleMap[proxy];

        if (!rules || rules.length === 0) {
            return 'function FindProxyForURL(url, host) {\n    return "DIRECT";\n}\n';
        }

        if (this.props.routing['*'] === proxy) {
            return 'function FindProxyForURL(url, host) {\n    return "' + proxy + '";\n}\n';
        }

        var scripts = [];

        for (var i = 0; i < rules.length; i++) {
            scripts[i] = `    "${rules[i]}": PROXY`;
        }

        return 'var PROXY = "' + proxy + '";\n\nvar RULES = {\n' + scripts.join(',\n') + '\n};\n' + EasyProxy.#pacScript;
    }

    EasyProxy.prototype.addProxy = function(proxy, rules) {
        var routing = this.props.routing;
        var prev = this.props.ruleMap[proxy];
        var next = [];

        if (prev) {
            for (var i = 0; i < prev.length; i++) {
                var p = prev[i];
                delete routing[p];
            }
        }

        this.props.ruleMap[proxy] = next;
        this.props.proxies.push(proxy);

        if (rules) {
            for (var n = 0; n < rules.length; n++) {
                var r = rules[n];

                if (routing[r]) {
                    continue;
                }

                routing[r] = proxy;
                next[n] = r;
            }
        }

        return true;
    }

    EasyProxy.prototype.removeProxy = function(proxy) {
        var rules = this.props.ruleMap[proxy];

        if (!rules) {
            return false;
        }

        var proxies = this.props.proxies;
        var routing = this.props.routing;
        proxies.splice(proxies.indexOf(proxy), 1);

        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            delete routing[r];
        }

        return true;
    }

    EasyProxy.prototype.hasProxy = function(proxy) {
        return proxy in this.props.ruleMap;
    }

    EasyProxy.prototype.findProxy = function(host) {
        var routing = this.props.routing;

        for (;;) {
            var proxy = routing[host];

            if (proxy) {
                return proxy;
            }

            var dot = host.indexOf('.');

            if (dot < 0) {
                return;
            }

            host = host.substring(dot + 1);
        }
    }

    EasyProxy.prototype.listProxies = function() {
        return this.props.proxies;
    }

    EasyProxy.prototype.addRule = function(proxy, rule) {
        var routing = this.props.routing;
        var find = routing[rule];

        if (find) {
            return false;
        }

        var rules = this.props.ruleMap[proxy] || [];
        rules.push(rule);
        routing[rule] = proxy;
        return true;
    }

    EasyProxy.prototype.removeRule = function(proxy, rule) {
        var routing = this.props.routing;
        var rules = this.props.ruleMap[proxy];
        var find = routing[rule];

        if (!find || !rules) {
            return false;
        }

        rules.splice(rules.indexOf(rule), 1);
        delete routing[rule];
        return true;
    }

    EasyProxy.prototype.hasRule = function(rule) {
        return rule in this.props.routing;
    }

    EasyProxy.prototype.getRules = function(proxy) {
        let rules = this.props.ruleMap[proxy];

        if (rules) {
            return rules;
        }

        if (proxy !== null && proxy !== undefined) {
            return [];
        }

        return this.props.ruleMap;
    }

    EasyProxy.prototype.clearRules = function(proxy) {
        var ruleMap = this.props.ruleMap;
        var routing = this.props.routing;
        var rules = ruleMap[proxy];

        if (rules) {
            for (let i = 0, l = rules.length; i < l; i++) {
                let rule = rules[i];
                delete routing[rule];
            }

            ruleMap[proxy] = [];
            return true;
        }

        if (proxy !== null && proxy !== undefined) {
            return false;
        }
        
        var proxies = this.props.proxies;

        for (var i = 0; i < proxies.length; i++) {
            var proxy = proxies[i];
            ruleMap[proxy] = [];
        }

        this.props.routing = {};
        return true;
    }

    EasyProxy.prototype.listRules = function() {
        var rules = [];
        var proxies = instance.props.proxies;

        for (var i = 0; i < proxies.length; i++) {
            var proxy = proxies[i];
            rules[i] = this.props.ruleMap[proxy];
        }

        return rules;
    }

    EasyProxy.prototype.destroy = function() {
        this.props.ruleMap = {};
        this.props.routing = {};
        this.props.proxies = [];
        intances.splice(instances.indexOf(this), 1);
        return true;
    }
    
    return EasyProxy;
})();
