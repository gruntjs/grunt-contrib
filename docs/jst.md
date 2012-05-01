## Compile underscore templates to JST file
> Contributed By: Tim Branyen (@tbranyen)

This task compiles Underscore compatible templates into functions
that can be concatenated and minified with existing source files.

### Configuration

Inside your `grunt.js` file, add a section named `jst`

``` javascript
jst: {
  "path/to/compiled/templates.js": ["path/to/source/**/*.html"]
}
```

You may specify additional Underscore template settings inside the global `options` property using the `jst` key.
``` javascript
options: {
  jst: {
    // Change to mustache style tags
    templateSettings: {
      interpolate : /\{\{(.+?)\}\}/g
    },

    // Change top level namespace to TMPL
    namespace: "TMPL"
  }
}
```
