# EasyProxy.js

## Usage

| Lastest | Extension |
| - | - |
| [easyproxy.js](https://jc3213.github.io/easyproxy.js/easyproxy.js) | [Easy Proxy](https://github.com/jc3213/easy_proxy) |

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
let manager = new EasyProxy();
```

## Properties
- [rules](#rules)
- [routing](#routing)
- [pacScript](#pacScript)

### rules
- `map`
- **read only**
```javascript
let { rules } = manager;
```

### routing
- `object`
- **read only**
```javascript
let { routing } = manager;
```

### pacScript
- `string`
- **read only**
```javascript
let { pacScript } = manager;
```

## Method
- [new](#new)
- [add](#add)
- [delete](#delete)
- [remove](#remove)
- [destroy](#destroy)
- [match](#match)
- [getScript](#getScript)

### new
```javascript
profile.new(proxy | string"");
```
```javascript
manager.new(proxy | string"", rules | array[]);
```

### add
```javascript
manager.add(proxy | string"", rule | string"");
```

### delete
```javascript
manager.delete(proxy | string"", rule | string"");
```

### remove
```javascript
manager.removee(proxy | string"");
```

### destroy
```javascript
manager.destroy();
```

### match
```javascript
let result = manager.match(host | string"");
```

### getScript
```javascript
let pasScript = manager.getScript(proxy | string"");
```

## Static Properties
- [pacScript](#pacScript-1)

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
let rule = EasyProxy.make(string);
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
