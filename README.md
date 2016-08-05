# Fastatic

**Speed up your static site with one command: `fastatic`**


## Usage

Fastatic works out-of-the-box with zero configuration.

You can use Fastatic both as a [CLI tool](#cli) and [programmatically in JS](#js).


### Install

Fastatic is written in [Node.js](http://nodejs.org/) and can be installed via [npm](https://npmjs.org/):

```bash
$ npm install fastatic
```

### CLI

Optimise all static files in **current directory**:

```bash
$ fastatic
```

Optimise all static files in a **specific directory**:

```bash
$ fastatic my-static-site-source/
```

Optimise all static files from a specific directory and **output to a different directory** using `--dest`:

```bash
$ fastatic my-static-site-source/ --dest my-static-site-dest/
```

### JS

To use Fastatic programmatically import the `fastatic` module:

```javascript
const fastatic = require('fastatic');
```

Optimise all static files in **current directory**:

```javascript
fastatic();
```

Optimise all static files in a **specific directory**:

```javascript
fastatic({ src: 'my-static-site-source/' });
```

Optimise all static files from a specific directory and **output to a different directory**:

```javascript
fastatic({ src: 'my-static-site-source/', dest: 'my-static-site-dest/' });
```


#### Configure parser pattern

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
`json` | `**/*.json` | Minify json files by removing all whitespace 
`html` | `**/*.html` | Minify HTML by removing whitespace and minifying inline css/javascript
`images` | `**/*.{gif,jpg,jpeg,png,svg}` | Optimize images and SVG files
`xml` | `**/*.xml` | Minify XML files by removing all whitespace and comments


## Known limitations

* Fastastic doesn't concatenate files (css / js) because there is no reliable way to determine the combinations in which these files are served, nor does it know about the protocol over which it's served (HTTP/1 or HTTP/2).
* Fastastic doesn't resize images (png / jpg / gif) because there is no reliable way to determine which sizes the images are displayed in.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for [guidelines](CONTRIBUTING.md#guidelines) and [development scripts](CONTRIBUTING.md#scripts).


## License

[MIT licensed](LICENSE) © [De Voorhoede](https://www.voorhoede.nl/)
