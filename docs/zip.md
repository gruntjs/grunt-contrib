## Compress files into ZIP
> Contributed By: Chris Talkington (@ctalkington)

### Configuration

Inside your `grunt.js` file add a section named `zip`. This section
specifies the files to compress and the options passed to zipstream.

``` javascript
zip: {
  compress: {
    options: {
      level: 1
    },
    files: {
      'path/to/result.zip': 'path/to/source/*', // includes files in dir
      'path/to/another.zip': 'path/to/source/**', // includes files in dir and subdirs
      'path/to/project-<%= pkg.version %>.zip': 'path/to/source/**', // variables in destination
      'path/to/final.zip': ['path/to/sources/*.js', 'path/to/more/*.js'] // include JS files in two diff dirs
    }
  }
},
```
