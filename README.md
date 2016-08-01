# Fastatic

## Usage

### CLI

```bash
fastatic my-static-site/
```

```bash
fastatic my-static-site-source/ --dest my-static-site/
```

### JS

```javascript
const fastatic = require('fastatic');
fastatic();
```

## Configuration

### Configure patterns

```javascript
// Disable a parser:
fastatic({
    js: {
      pattern: ['**/*.js', '!**/*.min.js'],
    }
});
```

### Disable parsers

```javascript
// Disable a parser:
fastatic({
    js: false
});
```

### Use your own parsers

```javascript
// Use your own parser:
fastatic({
    js: {
      pattern: '**/*.js',
      parser: function(config) {
      	console.log(config.src, config.dest, config.pattern);
      	return new Promise(/* do your own magic here */);
      }
    }
});
```

## Test

Start local server:

`npm start` -> `localhost:3278` // 3278 is "fast" in T9

Proxy using [ngrok](ngrok https://www.npmjs.com/package/ngrok):

`npm run ngrok`

## To do

* Integrate [psi](https://una.im/gulp-local-psi/)?
* Show optimisation stats? -> file type (pattern?) | original size | optimised size | savings