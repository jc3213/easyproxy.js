# EasyProxy.js

## Usage

| Lastest | Minified | Extension |
| - | - | - | 
| [easyproxy.js](https://jc3213.github.io/easyproxy.js/easyproxy.js) | [easyproxy.min.js](https://jc3213.github.io/easyproxy.js/easyproxy.min.js) | [Easy Proxy](https://github.com/jc3213/easy_proxy) |

### HTML
```HTML
<script src="https://jc3213.github.io/easyproxy.js/easyproxy.js"></script>
```

### TamperMonkey
```javascript
// @require https://jc3213.github.io/easyproxy.js/easyproxy.js
```

## Syntax
```javascript
let router = new EasyProxy();
```

## Properties
- [routing](#routing)
- [pacScript](#pacscript)

### routing
- `object`
- **read only**
```javascript
let { routing } = router;
```

### pacScript
- `string`
- **read only**
```javascript
let { pacScript } = router;
```

## Method
- [getScript](#getscript)
- [addProxy](#addproxy)
- [removeProxy](#removeproxy)
- [hasProxy](#hasproxy)
- [listProxies](#listproxies)
- [findProxy](#findproxy)
- [addRule](#addrule)
- [removeRule](#removerule)
- [hasRule](#hasrule)
- [getRules](#getrules)
- [purgeRules](#purgerules)
- [destroy](#destroy)

### getScript
```javascript
router.getScript(proxy | string"");
```

### addProxy
```javascript
router.addProxy(proxy | string"", rule | Array[] | null);
```

### removeProxy
```javascript
router.removeProxy(proxy | string"");
```

### hasProxy
```javascript
let result = router.hasProxy(proxy | string"");
```

### listProxies
```javascript
let proxies = router.listProxies();
```

### findProxy
```javascript
let result = router.findProxy(hostname | location.hostname | string"");
```

### addRule
```javascript
router.addRule(proxy | string"", rule | string"");
```

### removeRule
```javascript
router.removeRule(proxy | string"", rule | string"");
```

### hasRule
```javascript
let result = router.hasRule(rule | string"");
```

### getRules
```javascript
let rules = router.getRules(proxy | string"");
```

### purgeRules
```javascript
router.purgeRules();
```

### match
```javascript
let result = router.match(host | string"");
```



### getScript
```javascript
let pasScript = router.getScript(proxy | string"");
```

### destroy
```javascript
router.destroy();
```

## Static Properties
- [pacScript](#pacscript-1)

### pacScript
- `string`
- **read only**
```javascript
let { pacScript } = EasyProxy;
```

## Static Method
- [make](#make)
- [getScript](#getscript-1)

### make
```javascript
let rule = EasyProxy.make(host | string"");
```

### getScript
```javascript
let pacScript = EasyProxy.getScript(Array[ router | instance ]);
```

## MatchPattern
- `example.com`
   - Matches `www.example.com`, `example.com`
   - Exclude `test-example.com`, `www.example.com.cn`

| Match Pattern ↓  | www.youtube.com | www.facebook.net | x.com | telegram.org |
|------------------|-----------------|------------------|-------|--------------|
| *                | ✅              | ✅              | ✅   | ✅           |
| youtube.com      | ✅              | ❌              | ❌   | ❌           |
| facebook.com     | ❌              | ✅              | ❌   | ❌           |
| x.com            | ❌              | ❌              | ✅   | ❌           |
| com              | ✅              | ❌              | ✅   | ❌           |
| org              | ❌              | ❌              | ❌   | ✅           |
| youtube          | ❌              | ❌              | ❌   | ❌           |
| telegram         | ❌              | ❌              | ❌   | ❌           |
