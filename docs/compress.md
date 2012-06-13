## Compress files
> Contributed By: Chris Talkington (@ctalkington)

### Configuration

Inside your `grunt.js` file add a section named `compress`. This section
specifies the files to compress and the options passed to either [zipstream](https://github.com/wellawaretech/node-zipstream)
(for zip) or [zlib](http://nodejs.org/api/zlib.html#zlib_options) (for gzip).

*If using gzip, only one input file may be specified per output file.  Also, specifying gzip options (level/memLevel etc) is not yet supported due to deficiencies in the current implementation of node's zlib library.*

``` javascript
compress: {
  zip: {
    options: {
      type: 'zip',
      level: 1
    },
    files: {
      'path/to/result.zip': 'path/to/source/*', // includes files in dir
      'path/to/another.gz': 'path/to/source/**', // includes files in dir and subdirs
      'path/to/project-<%= pkg.version %>.zip': 'path/to/source/**', // variables in destination
      'path/to/final.zip': ['path/to/sources/*.js', 'path/to/more/*.js'] // include JS files in two diff dirs
    }
  }

  gzip: {
    options: {
      type: 'gzip'
    },
    files: {
      'path/to/result.gz': 'path/to/file.ext'
    }
}
},
```
