## Compress files

### Overview

Inside your `grunt.js` file add a section named `compress`. This section specifies the files to compress and the options passed to either [zipstream](https://github.com/wellawaretech/node-zipstream) (for zip) or [tar](https://github.com/isaacs/node-tar) (for tar).

#### Parameters

##### files ```object```

This parameter defines what files this task will compress and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch) regex).

##### options ```object```

This parameter controls how this task operates and should contain key:value pairs, see options below.

#### Options

##### archiver ```string```

This option is used to define which archiver to use, currently supports tar and zip (default).

##### basePath ```string```

This option adjusts internal filenames to be relative to provided path, within the resulting archive file. defaults to null.

##### gzip ```boolean```

This option toggles the gzipping of data within the tar process. when set to ```true``` without a set ```archiver``` this gzips single files.

##### level ```integer``` ```zip only```

This option sets the level of archive compression. defaults to 1.

> Currently, gzip compression related options are not supported due to deficiencies in node's zlib library.

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
      'path/to/project-<%= pkg.version %>.zip': 'path/to/source/**' // variables in destination
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
  },

  gzip: {
    options: {
      archiver: null,
      gzip: true
    },
    files: {
      'path/to/result.tgz': 'path/to/file.ext'
    }
  }
},
```

> Contributed By: Chris Talkington (@ctalkington) and Tyler Kellen (@tkellen)