# Fastatic
> Speed up your static site with one command

## Usage

### CLI

```bash
$ fastatic my-static-site/
```

```bash
$ fastatic my-static-site-source/ --dest my-static-site/
```

### JS

```javascript
const fastatic = require('fastatic');
fastatic();
```

#### Configure patterns

```javascript
// configure patterns:
fastatic({
    js: {
      pattern: ['**/*.js', '!**/*.min.js'],
    }
});
```

#### Disable a parser

```javascript
// Disable a parser:
fastatic({
    js: false
});
```

## Default parsers

parser | pattern | function
--- | --- | ---
`css` | `**/*.css` | Minify stylesheets
`js` | `**/*.js` | Minify javascript files
`json` | `**/*.json` | Minify json files by removing all whitespace. 
`html` | `**/*.html` | Minify HTML by removing whitespace and minifying inline css/javascript
`images` | `**/*.{gif,jpg,jpeg,png,svg}` | Optimize images and SVG files


## Available tasks

task | function
--- | ---
`npm run start` | Start local server with your optimized version
`npm run ngrok` | Create a proxy to your local server with [ngrok](ngrok https://www.npmjs.com/package/ngrok).


## Known limitations

* *Fastastic* doesn't concatenate files (css / js ) because there is no reliable way to determine the combinations in which these files are served, nor does it know about the protocol over which it's served (HTTP/1 or HTTP/2).
* *Fastastic* doesn't resize images (png / jpg / gif) because there is no reliable way to determine which sizes the images are displayed in.
