## Copy files into another directory
> Contributed By: Chris Talkington (@ctalkington)

### Configuration

Inside your `grunt.js` file add a section named `copy`. This section
specifies the files to copy.

``` javascript
copy: {
  dist: {
    files: {
      'path/to/directory': 'path/to/source/*', // includes files in dir
      'path/to/directory': 'path/to/source/**', // includes files in dir and subdirs
      'path/to/project-<%= pkg.version %>': 'path/to/source/**', // variables in destination
      'path/to/directory': ['path/to/sources/*.js', 'path/to/more/*.js'] // include JS files in two diff dirs
    }
  }
},
```