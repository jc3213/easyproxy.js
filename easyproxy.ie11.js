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
    var pasScript = `
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
    var properties = `{
        "proxies": [],
        "routing": {},
        "ruleMap": {}
    }`;

    function initiator() {
        instances.push(this);
        this.props = JSON.parse(properties);
    }

    initiator.getScript = function(instances) {
        var proxies = [];
        var scripts = [];
        for (var i = 0; i < instances.length; i++) {
            var instance = instances[i];
            var global = instance.props.routing['*'];
            var server = instance.props.proxies;
            if (global) {
                return `function FindProxyForURL(url, host) {\n    return "${global}";\n}\n`;
            }
            for (var x = 0; x < server.length; x++) {
                let proxy = server[x];
                let rules = instance.props.ruleMap[proxy];
                if (rules.length === 0) {
                    continue;
                }
                if (proxy === 'DIRECT') {
                    var id = '"DIRECT"';
                } else {
                    id = `PROXY${proxies.length}`;
                    proxies.push(`var ${id} = "${proxy}";`);
                }
                for (var n = 0; n < rules.length; n++) {
                    var r = rules[n];
                    scripts.push(`    "${r}": ${id}`);
                }
            }
        }
        if (proxies.length === 0) {
            return 'function FindProxyForURL(url, host) {\n    return "DIRECT";\n}\n';
        }
        return `${proxies.join('\n')}\n\nvar RULES = {\n${scripts.join(',\n')}\n};\n${pasScript}`;
    }

    initiator.makeRule = function(host) {
        var array = host.split('.');
        if (array.length < 2) {
            return host;
        }
        var sbd = array.at(-3);
        var sld = array.at(-2);
        var tld = array.at(-1);
        if (sbd && sld in etld) {
            return `${sbd}.${sld}.${tld}`;
        }
        return `${sld}.${tld}`;
    }

    Object.defineProperty(initiator, 'pacScript', {
        get: function() {
            return initiator.getScript(instances);
        },
        enumerable: true
    });

    Object.defineProperty(initiator.prototype, 'routing', {
        get: function() {
            return this.props.routing;
        },
        enumerable: true
    });

    Object.defineProperty(initiator.prototype, 'pacScript', {
        get: function() {
            return initiator.getScript([this]);
        },
        enumerable: true
    });

    initiator.prototype.getScript = function(proxy) {
        var rules = this.props.ruleMap[proxy];
        if (!rules || rules.length === 0) {
            return 'function FindProxyForURL(url, host) {\n    return "DIRECT";\n}\n';
        }
        if (rules.includes('*')) {
            return `function FindProxyForURL(url, host) {\n    return "${proxy}";\n}\n`;
        }
        var scripts = [];
        for (var i = 0; i < rules.length; i++) {
            scripts.push(`    "${rules[i]}": PROXY`);
        }
        return `var PROXY = "${proxy}";\n\nvar RULES = {\n${scripts.join(',\n')}\n};\n${pasScript}`;;
    }

    initiator.prototype.addProxy = function(proxy, rules) {
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
                next.push(r);
            }
        }
        return true;
    }

    initiator.prototype.removeProxy = function(proxy) {
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

    initiator.prototype.hasProxy = function(proxy) {
        return proxy in this.props.ruleMap;
    }

    initiator.prototype.findProxy = function(host) {
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

    initiator.prototype.listProxies = function() {
        return this.props.proxies;
    }

    initiator.prototype.addRule = function(proxy, rule) {
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

    initiator.prototype.removeRule = function(proxy, rule) {
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

    initiator.prototype.hasRule = function(rule) {
        return rule in this.props.routing;
    }

    initiator.prototype.getRules = function(proxy) {
        if (proxy !== null && proxy !== undefined) {
            return this.props.ruleMap[proxy];
        }
        return this.props.ruleMap;
    }

    initiator.prototype.purgeRules = function() {
        var proxies = this.props.proxies;
        for (var i = 0; i < proxies.length; i++) {
            var proxy = proxies[i];
            this.props.ruleMap[proxy] = [];
        }
        this.props.routing = {};
    }

    initiator.prototype.destroy = function() {
        this.props.ruleMap = {};
        this.props.routing = {};
        this.props.proxies = [];
        intances.splice(instances.indexOf(this), 1);
        return true;
    }
    
    return initiator;
})();
