# grunt-contrib

A collection of general use grunt tasks. All tasks are designed with cross platform support in mind and dependencies that can easily be managed through npm.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-contrib`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-contrib');
```

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Included Tasks
#### [`clean`](https://github.com/gruntjs/grunt-contrib-clean/)
Clear files and folders.

#### [`coffee`](https://github.com/gruntjs/grunt-contrib-coffee/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-coffee.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-coffee)
Compile CoffeeScript files into JavaScript.

#### [`compass`](https://github.com/gruntjs/grunt-contrib-compass/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-compass.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-compass)
Compile Compass to CSS.

#### [`compress`](https://github.com/gruntjs/grunt-contrib-compress/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-compress.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-compress)
Compress files and folders.

#### [`concat`](https://github.com/gruntjs/grunt-contrib-concat/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-concat.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-concat)
Concatenate files.

#### [`connect`](https://github.com/gruntjs/grunt-contrib-connect/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-connect.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-connect)
Start a connect web server.

#### [`copy`](https://github.com/gruntjs/grunt-contrib-copy/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-copy.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-copy)
Copy files and folders.

#### [`handlebars`](https://github.com/gruntjs/grunt-contrib-handlebars/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-handlebars.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-handlebars)
Precompile Handlebars templates to JST file.

#### [`htmlmin`](https://github.com/gruntjs/grunt-contrib-htmlmin/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-htmlmin.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-htmlmin)
Minify HTML.

#### [`imagemin`](https://github.com/gruntjs/grunt-contrib-imagemin/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-imagemin.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-imagemin)
Minify PNG and JPEG images.

#### [`internal`](https://github.com/gruntjs/grunt-contrib-internal/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-internal.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-internal)
Internal tasks for managing the grunt-contrib project.

#### [`jade`](https://github.com/gruntjs/grunt-contrib-jade/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-jade.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-jade)
Compile Jade files to HTML.

#### [`jasmine`](https://github.com/gruntjs/grunt-contrib-jasmine/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-jasmine.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-jasmine)
Run jasmine specs headlessly through PhantomJS.

#### [`jshint`](https://github.com/gruntjs/grunt-contrib-jshint/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-jshint.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-jshint)
Validate files with JSHint.

#### [`jst`](https://github.com/gruntjs/grunt-contrib-jst/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-jst.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-jst)
Precompile Underscore templates to JST file.

#### [`less`](https://github.com/gruntjs/grunt-contrib-less/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-less.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-less)
Compile LESS files to CSS.

#### [`mincss`](https://github.com/gruntjs/grunt-contrib-mincss/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-mincss.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-mincss)
Compress CSS files.

#### [`nodeunit`](https://github.com/gruntjs/grunt-contrib-nodeunit/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-nodeunit.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-nodeunit)
Run Nodeunit unit tests.

#### [`qunit`](https://github.com/gruntjs/grunt-contrib-qunit/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-qunit.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-qunit)
Run QUnit unit tests in a headless PhantomJS instance.

#### [`requirejs`](https://github.com/gruntjs/grunt-contrib-requirejs/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-requirejs.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-requirejs)
Optimize RequireJS projects using r.js.

#### [`sass`](https://github.com/gruntjs/grunt-contrib-sass/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-sass.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-sass)
Compile Sass to CSS.

#### [`stylus`](https://github.com/gruntjs/grunt-contrib-stylus/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-stylus.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-stylus)
Compile Stylus files to CSS.

#### [`uglify`](https://github.com/gruntjs/grunt-contrib-uglify/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-uglify.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-uglify)
Minify files with UglifyJS.

#### [`watch`](https://github.com/gruntjs/grunt-contrib-watch/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-watch.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-watch)
Run predefined tasks whenever watched file patterns are added, changed or deleted.

#### [`yuidoc`](https://github.com/gruntjs/grunt-contrib-yuidoc/) [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-yuidoc.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-yuidoc)
Compile YUIDoc Documentation.

## Bugs

Help us squash them by submitting an issue that describes how you encountered it; please be as specific as possible including operating system, node, grunt, and grunt-contrib versions.

## Contributing

#### Checklist

1. Ensure your task meets the submission guidelines.
2. Ensure your task follows the code style guide.
3. Submit your pull request against `master`, unless otherwise instructed.
4. Ensure your pull request only touches what your changing and that it's squashed (ie `git rebase`).

#### Submission Guidelines

* task should work out of box, cross platform, with a simple `npm install`
* task should fill a general need and ideally be pure JavaScript
* task should include tests that cover, at minimal, its basic features
* task should be linted by running `grunt` at root of project
* task should use any built-in helpers first for consistency

#### Code Style Guide

* code should be indented with 2 spaces
* single quotes should be used where feasible
* commas should be followed by a single space (function params, etc)
* variable declaration should include `var`, [no multiple declarations](http://benalman.com/news/2012/05/multiple-var-statements-javascript/)

#### Tests

* tests should be added to the config in `test/grunt.js`
* see existing tests for guidance

*Currently, testing with grunt is a bit cumbersome--this will be addressed in a future release.*

#### Running Tests
```bash
npm install grunt -g
npm install
npm test
```

See [CHANGELOG](https://github.com/gruntjs/grunt-contrib/blob/master/CHANGELOG) for release history.
