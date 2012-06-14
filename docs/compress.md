## Compress files
> Contributed By: Chris Talkington (@ctalkington)

### Configuration

Inside your `grunt.js` file add a section named `compress`. This section
specifies the files to compress and the options passed to either [zipstream](https://github.com/wellawaretech/node-zipstream)
(for zip) or [tar](https://github.com/isaacs/node-tar) (for tar).

*Specifying gzip options (level/memLevel etc) is not yet supported due to deficiencies in the current implementation of node's zlib library.*

``` javascript
compress: {
  zip: {
    options: {
      type: 'zip',
      level: 1,
      basePath: 'path/to' // adjusts filenames in archives to be relative to this path
    },
    files: {
      'path/to/result.zip': 'path/to/source/*', // includes files in dir
      'path/to/another.gz': 'path/to/source/**', // includes files in dir and subdirs
      'path/to/project-<%= pkg.version %>.zip': 'path/to/source/**', // variables in destination
      'path/to/final.zip': ['path/to/sources/*.js', 'path/to/more/*.js'] // include JS files in two diff dirs
    }
  }

  tar: {
    options: {
      type: 'tar',
      basePath: 'path/to' // adjusts internal names in archives to be relative to this path
    },
    files: {
      'path/to/result.tar': 'path/to/file.ext'
    }
  },

  tgz: {
    options: {
      type: 'tar',
      gzip: true,
      basePath: 'path/to' // adjusts internal names in archives to be relative to this path
    },
    files: {
      'path/to/result.tgz': 'path/to/file.ext'
    }
  }
},
```
