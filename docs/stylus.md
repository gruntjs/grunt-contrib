## Compile Stylus files to CSS
> Contributed By: Eric Woroshow (@errcw)

### Configuration

Inside your `grunt.js` file add a section named `stylus`. This section
specifies the files to compile and the options passed to stylus.

``` javascript
stylus: {
  compile: {
    options: {
      compress: true,
      paths: ['path/to/import', 'another/to/import']
    },
    files: {
      'path/to/result.css': 'path/to/source.styl',
      'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.style'],
    }
  }
},
```
