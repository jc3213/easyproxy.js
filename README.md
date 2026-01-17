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
- [data](#data)
- [pacScript](#pacScript)

### proxy
- `string`
- **read only**
```javascript
let { proxy } = profile;
```

### rules
- `object`
- **read only**
```javascript
let { rules } = profile;
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
- [test](#test)

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

### test
```javascript
let result = profile.test(string);
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
- [test](#test-2)
- [make](#make)
- [delete](#delete)

### test
```javascript
let result = EasyProxy.test(string);
```

### make
```javascript
let rule = EasyProxy.make(string);
```

### delete
```javascript
EasyProxy.delete(string | string[]);
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
