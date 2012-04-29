## Compile CoffeeScript files to JavaScript
> Contributed By: Eric Woroshow (@errcw)

### Configuration

Inside your `grunt.js` file add a section named `coffee`. This section
specifies the files to compile and the options passed to coffee.

``` javascript
coffee: {
  compile: {
    options: {
      bare: true
    },
    files: {
      'path/to/result.js': 'path/to/source.coffee',
      'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee']
    }
  }
},
```
