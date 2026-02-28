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
let profile = new EasyProxy('HTTP 127.0.0.1:1230');
```

## Properties
- [proxy](#proxy)
- [route](#route)
- [pacScript](#pacScript)

### proxy
- `string`
- **read only**
```javascript
let { proxy } = profile;
```

### route
- `object`
- **read only**
```javascript
let { route } = profile;
```

### pacScript
- `string`
- **read only**
```javascript
let { pacScript } = profile;
```

## Method
- [new](#new)
- [add](#add)
- [delete](#delete)
- [match](#match)
- [destroy](#destroy)

### new
```javascript
profile.new(string | string[]);
```
```javascript
profile.new(); // Clear all rules
```

### add
```javascript
profile.add(string | string[]);
```

### delete
```javascript
profile.delete(string | string[]);
```

### match
```javascript
let result = profile.match(string);
```

### destroy
```javascript
profile.destroy();
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
- [match](#test-2)
- [make](#make)

### match
```javascript
let result = EasyProxy.match(string);
```

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
