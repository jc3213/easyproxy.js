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
- [new](#new)
- [add](#add)
- [delete](#delete)
- [remove](#remove)
- [purge](#purge)
- [destroy](#destroy)
- [match](#match)
- [getRules](#getrules)
- [getScript](#getscript)

### new
```javascript
router.new(proxy | string"");
```
```javascript
router.new(proxy | string"", rules | array[]);
```

### add
```javascript
router.add(proxy | string"", rule | string"");
```

### delete
```javascript
router.delete(proxy | string"", rule | string"");
```

### remove
```javascript
router.remove(proxy | string"");
```

### purge
```javascript
router.purge();
```

### destroy
```javascript
router.destroy();
```

### match
```javascript
let result = router.match(host | string"");
```

### getRules
```javascript
let rules = router.getRules(proxy | string"");
```

### getScript
```javascript
let pasScript = router.getScript(proxy | string"");
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

### make
```javascript
let rule = EasyProxy.make(host | string"");
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
