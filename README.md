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
let profile = new EasyProxy();
profile.proxy = 'SOCKS 127.0.0.1:1080';
```

## Properties
- [data](#data)
- [pacScript](#pacScript)

### data
- `array`
- **read only**
```javascript
let { data } = match;
```

### pacScript
- `string`
- **read only**
```javascript
let { pacScript } = match;
```

## Method
- [new](#new)
- [add](#add)
- [delete](#delete)
- [clear](#clear)
- [test](#test)

### new
```javascript
profile.new(string[]);
```

### add
```javascript
profile.add(string | string[]);
```

### delete
```javascript
profile.delete(string | string[]);
```

### clear
```javascript
profile.clear();
```

### test
```javascript
let result = profile.test(string);
```

## Static Properties
- [caches](#caches)
- [pacScript](#pacScript-1)

### caches
- `Map`
- **readonly**
```javascript
let { caches } = easyproxy;
```

### pacScript
- `string`
- **read only**
```javascript
let { pacScript } = match;
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
   - Doesn't Match `test-example.com`, `www.example.com.cn`

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
