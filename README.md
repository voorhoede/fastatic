# Fastatic

**Speed up your static site with one command: `fastatic`**

Static site generators are [the next big thing](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/). Fastatic takes the ouput of *any static site generator* ([Jekyll](http://jekyllrb.com/), [Hugo](http://gohugo.io/) and [many others](https://www.staticgen.com/)) and optimises it. The result: faster static sites.

Fastatic minifies your HTML, CSS, JS, JSON, XML and images. [See issues for more planned improvements](https://github.com/voorhoede/fastatic/issues).


## Example: React

Running Fastatic on the [React](https://facebook.github.io/react/)'s [static site files](https://github.com/facebook/react/tree/gh-pages) results in a faster site:

```bash
┌─────────────────────────────┬───────────────┬────────────────┬─────────────────┐
│ Filetype                    │ Original size │ Optimized size │          Saving │
├─────────────────────────────┼───────────────┼────────────────┼─────────────────┤
│ **/*.css                    │      29.51 KB │       22.57 KB │   6.94 KB (24%) │
├─────────────────────────────┼───────────────┼────────────────┼─────────────────┤
│ **/*.html                   │       8.77 MB │        7.47 MB │   1.30 MB (15%) │
├─────────────────────────────┼───────────────┼────────────────┼─────────────────┤
│ **/*.{gif,jpg,jpeg,png,svg} │      14.83 MB │       13.44 MB │   1.39 MB  (9%) │
├─────────────────────────────┼───────────────┼────────────────┼─────────────────┤
│ **/*.js                     │       2.06 MB │        1.36 MB │ 714.22 KB (34%) │
├─────────────────────────────┼───────────────┼────────────────┼─────────────────┤
│ **/*.xml                    │     197.68 KB │      197.30 KB │     381 B  (0%) │
├─────────────────────────────┼───────────────┼────────────────┼─────────────────┤
│ Total                       │      25.94 MB │       22.54 MB │   3.39 MB (13%) │
└─────────────────────────────┴───────────────┴────────────────┴─────────────────┘
```

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


## Known limitations

* Fastastic doesn't concatenate files (css / js) because there is no reliable way to determine the combinations in which these files are served, nor does it know about the protocol over which it's served (HTTP/1 or HTTP/2).
* Fastastic doesn't resize images (png / jpg / gif) because there is no reliable way to determine which sizes the images are displayed in.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for [guidelines](CONTRIBUTING.md#guidelines) and [development scripts](CONTRIBUTING.md#scripts).


## License

[MIT licensed](LICENSE) © [De Voorhoede](https://www.voorhoede.nl/)
