## Compile Jade files to HTML
> Contributed By: Eric Woroshow (@errcw)

### Configuration

Inside your `grunt.js` file add a section named `jade`. This section
specifies the files to compile and the destination directory.

``` javascript
jade: {
  'path/to/dest': ['path/to/templates/*.jade', 'another/path/tmpl.jade']
},
```

Set the options passed to `jade` in a section named `options.jade`. Refer to
the [jade documentation](https://github.com/visionmedia/jade#public-api) for
the available options.

``` javascript
options: {
  jade: {
    parameter: value
  }
},
```
