## Compress files

### Overview

Inside your `grunt.js` file add a section named `compress`. This section specifies the files to compress and the options passed to either [zipstream](https://github.com/wellawaretech/node-zipstream) (for zip) or [tar](https://github.com/isaacs/node-tar) (for tar).

#### Parameters

##### archiver ```string```

This parameter is used to define which archiver to use, currently supports tar and zip (default).

##### basePath ```string```

This parameter adjusts internal filenames to be relative to provided path, within the resulting archive file.

##### gzip ```boolean``` ```tar only```

This parameter controls the gzipping of data within the tar process.

##### level ```integer``` ```zip only```

This parameter sets the level of archive compression. gzip level is not yet supported due to deficiencies in node's zlib library.

#### Config Example

``` javascript
compress: {
  zip: {
    options: {
      archiver: 'zip',
      basePath: 'path/to',
      level: 1
    },
    files: {
      'path/to/result.zip': 'path/to/source/*', // includes files in dir
      'path/to/another.gz': 'path/to/source/**', // includes files in dir and subdirs
      'path/to/final.zip': ['path/to/sources/*.js', 'path/to/more/*.js'], // include JS files in two diff dirs
      'path/to/project-<%= pkg.version %>.zip': 'path/to/source/**', // variables in destination
    }
  }

  tar: {
    options: {
      archiver: 'tar',
      basePath: 'path/to'
    },
    files: {
      'path/to/result.tar': 'path/to/file.ext'
    }
  },

  tgz: {
    options: {
      archiver: 'tar',
      basePath: 'path/to',
      gzip: true
    },
    files: {
      'path/to/result.tgz': 'path/to/file.ext'
    }
  }
},
```

> Contributed By: Chris Talkington (@ctalkington) and Tyler Kellen (@tkellen)