## Compile Jade files to HTML
> Contributed By: Eric Woroshow (@errcw), Conrad Zimmerman (@conradz), and Chris Talkington (@ctalkington)

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

Set the data passed to the compiled jade template when it is rendered in a
section named `options.data` on the target. Any data can be passed to the
template (including `grunt` templates). This can be used to generate a debug
file and a release file from the same template, by using this:

``` javascript
jade: {
  debug: {
    files: {
      "debug/": "test.jade"
    },
    options: {
      data: {
        debug: true
      }
    }
  },
  release: {
    files: {
      "release/": "test.jade"
    },
    options: {
      data: {
        debug: false
      }
    }
  }
}
```

If you want to use `grunt` template in `options.data`:

``` javascript
jade: {
  debug: {
    files: {
      "debug/": "test.jade"
    },
    options: {
      data: {
        debug: true,
        timestamp: "<%= new Date().getTime() %>"
      }
    }
  }
}
```

or you can use `grunt` helpers (grunt object was exposed at template context):

``` javascript
jade: {
  debug: {
    files: {
      "debug/": "test.jade"
    },
    options: {
      data: {
        debug: true,
        timestamp: "<%= grunt.template.today() %>"
      }
    }
  }
}
```