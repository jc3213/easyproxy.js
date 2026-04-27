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
const router = new EasyProxy();
```

## Properties
- [routing](#routing)
- [pacScript](#pacscript)

### routing
- `object`
- **read only**
```javascript
const { routing } = router;
```

### pacScript
- `string`
- **read only**
```javascript
const { pacScript } = router;
```

## Method
- [getScript](#getscript)
- [addProxy](#addproxy)
- [removeProxy](#removeproxy)
- [hasProxy](#hasproxy)
- [findProxy](#findproxy)
- [listProxies](#listproxies)
- [addRule](#addrule)
- [removeRule](#removerule)
- [hasRule](#hasrule)
- [getRules](#getrules)
- [purgeRules](#purgerules)
- [destroy](#destroy)

### getScript
```javascript
const pacScript = router.getScript(proxy | string"");
```

### addProxy
```javascript
const result = router.addProxy(proxy | string"", rule | Array[] | null);
// true or false
```

### removeProxy
```javascript
const result = router.removeProxy(proxy | string"");
// true or false
```

### hasProxy
```javascript
const result = router.hasProxy(proxy | string"");
// true or false
```

### findProxy
```javascript
const result = router.findProxy(hostname | location.hostname | new URL().hostname | string"");
// proxy or undefined
```

### listProxies
```javascript
const proxies = router.listProxies();
```

### addRule
```javascript
const result = router.addRule(proxy | string"", rule | string"");
// true or false
```

### removeRule
```javascript
const result = router.removeRule(proxy | string"", rule | string"");
// true or false
```

### hasRule
```javascript
const result = router.hasRule(rule | string"");
// true or false
```

### getRules
```javascript
const rules = router.getRules(proxy | string"");
// Array[]
```

```javascript
const object = router.getRules();
// Object{}
```

### purgeRules
```javascript
router.purgeRules();
// true or false
```

### getScript
```javascript
const pacScript = router.getScript(proxy | string"");
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
const { pacScript } = EasyProxy;
```

## Static Method
- [make](#make)
- [getScript](#getscript-1)

### make
```javascript
const rule = EasyProxy.make(hostname | location.hostname | new URL().hostname | string"");
```

### getScript
```javascript
const pacScript = EasyProxy.getScript(Array[ router | instance ]);
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
