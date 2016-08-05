<a name="0.1.2"></a>
## [0.1.2](https://github.com/voorhoede/fastatic/compare/v0.1.1...v0.1.2) (2016-08-05)


### Bug Fixes

* **readme:** fix table display with for better readability on npmjs ([9152c9b](https://github.com/voorhoede/fastatic/commit/9152c9b))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/voorhoede/fastatic/compare/v0.1.0...v0.1.1) (2016-08-05)



<a name="0.1.0"></a>
# 0.1.0 (2016-08-05)


### Bug Fixes

* **config:** default config.dest to config.src; ([6223987](https://github.com/voorhoede/fastatic/commit/6223987))
* **copy:** promisify fs-extra copySync to complete copy before parsing ([6d98608](https://github.com/voorhoede/fastatic/commit/6d98608))
* **deps:** move cli-spinner, colors from devDeps to deps ([40ddb6c](https://github.com/voorhoede/fastatic/commit/40ddb6c)), closes [#41](https://github.com/voorhoede/fastatic/issues/41)
* **parse-stats:** start with a sum of zero ([eb3ec9e](https://github.com/voorhoede/fastatic/commit/eb3ec9e))
* **parser:** normalise path of src + pattern ([aab9b38](https://github.com/voorhoede/fastatic/commit/aab9b38))
* **parser-stats:** add alignment to right for better results comparison ([7fd9cba](https://github.com/voorhoede/fastatic/commit/7fd9cba))
* **parser-stats:** add bold to totals ([b9fb9a3](https://github.com/voorhoede/fastatic/commit/b9fb9a3))
* **parser-stats:** improve readability on percentage gains ([2a16100](https://github.com/voorhoede/fastatic/commit/2a16100))


### Features

* **bin:** extract program from index and register in package as `bin:fastatic` ([cdda54f](https://github.com/voorhoede/fastatic/commit/cdda54f))
* **parse-json:** add pretty-data module to json parser ([0b04ebf](https://github.com/voorhoede/fastatic/commit/0b04ebf))
* **parse-json:** use jsonminify on all .json files ([013182e](https://github.com/voorhoede/fastatic/commit/013182e)), closes [#17](https://github.com/voorhoede/fastatic/issues/17)
* **parse-json:** use pretty-data to minify all .xml files ([4ebacbc](https://github.com/voorhoede/fastatic/commit/4ebacbc)), closes [#16](https://github.com/voorhoede/fastatic/issues/16)
* **parser:** add option to disable parser ([754f895](https://github.com/voorhoede/fastatic/commit/754f895)), closes [#4](https://github.com/voorhoede/fastatic/issues/4)
* **parser-images:** add images parser ([07dc88f](https://github.com/voorhoede/fastatic/commit/07dc88f))
* **parser-stats:** add function to calculate sum of file sizes based on pattern ([869a9bd](https://github.com/voorhoede/fastatic/commit/869a9bd))
* **parser-stats:** add option to add new parser ([dcb7287](https://github.com/voorhoede/fastatic/commit/dcb7287))
* **parser-stats:** add sums to table of stats ([a7ae256](https://github.com/voorhoede/fastatic/commit/a7ae256))
* **parser-stats:** calculate total based on **/* pattern and not adding individual sums ([f01d081](https://github.com/voorhoede/fastatic/commit/f01d081)), closes [#31](https://github.com/voorhoede/fastatic/issues/31)
* **parser-stats:** check if size exists to add row on stats ([470ff35](https://github.com/voorhoede/fastatic/commit/470ff35))
* **spinner:** add spinner while parsers are working ([2930e65](https://github.com/voorhoede/fastatic/commit/2930e65))
* **spinner:** display name of directory being optimised ([160936c](https://github.com/voorhoede/fastatic/commit/160936c))



