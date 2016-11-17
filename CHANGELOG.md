<a name="0.1.3"></a>
## [0.1.3](https://github.com/voorhoede/fastatic/compare/v0.1.2...v0.1.3) (2016-11-17)


### Bug Fixes

* **ci:** add gulp-replace to deps ([88be0fa](https://github.com/voorhoede/fastatic/commit/88be0fa))
* **ci:** add marked as deps ([0a059e9](https://github.com/voorhoede/fastatic/commit/0a059e9))
* **ci:** fix build task ([d126e6f](https://github.com/voorhoede/fastatic/commit/d126e6f))
* **fastatic:** can run without arguments ([8571f92](https://github.com/voorhoede/fastatic/commit/8571f92))
* **fastatic:** options is overridden, so it should be let inst. of const ([bfcdfc9](https://github.com/voorhoede/fastatic/commit/bfcdfc9))
* **index:** use lodash merge instead of Object.assign ([7eded65](https://github.com/voorhoede/fastatic/commit/7eded65))
* **parse-html:** add more agressive html minifier options ([367114b](https://github.com/voorhoede/fastatic/commit/367114b)), closes [#45](https://github.com/voorhoede/fastatic/issues/45) [#46](https://github.com/voorhoede/fastatic/issues/46)
* **parser:** explicitly set `base` for patterns not starting with wildcard ([0a690ef](https://github.com/voorhoede/fastatic/commit/0a690ef))
* **parser-stats:** add new like before table render ([d2111cf](https://github.com/voorhoede/fastatic/commit/d2111cf))
* **serve-locally:** fix paths on readme, rename scripts ([5b091cb](https://github.com/voorhoede/fastatic/commit/5b091cb))


### Features

* **ci:** publish disto to gh-pages on sucessfull build ([f5e6d15](https://github.com/voorhoede/fastatic/commit/f5e6d15)), closes [#50](https://github.com/voorhoede/fastatic/issues/50)
* **examples:** add build task; add task to generate html based on readme ([18ca140](https://github.com/voorhoede/fastatic/commit/18ca140))
* **examples:** change paths on react examples ([0bd7ce1](https://github.com/voorhoede/fastatic/commit/0bd7ce1))
* **examples:** examples now serving from dist ([4ead3ec](https://github.com/voorhoede/fastatic/commit/4ead3ec))
* **examples:** remove general gulpfile and move task to scripts ([6e45ea0](https://github.com/voorhoede/fastatic/commit/6e45ea0))
* **results:** fastatic returns filesizes in results ([#92](https://github.com/voorhoede/fastatic/issues/92)) ([4bd7962](https://github.com/voorhoede/fastatic/commit/4bd7962))



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



