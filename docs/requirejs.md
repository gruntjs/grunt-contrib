## Optimize RequireJS projects using r.js
> Contributed By: Tim Branyen (@tbranyen)

### Configuration

Inside your `grunt.js` file add a section named `requirejs`. The options key
for each subtask therein can contain any RequireJS configuration values.  For
a full list of possible options, [see the r.js example build file](https://github.com/jrburke/r.js/blob/master/build/example.build.js).

``` javascript
requirejs: {
  compile: {
    options: {
      baseUrl: "path/to/base",
      mainConfigFile: "path/to/config.js",
      out: "path/to/optimized.js"
    }
  }
}
```
