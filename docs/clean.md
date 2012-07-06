## Clear files and folders.
> Contributed By: Tim Branyen (@tbranyen)

### Overview

Inside your `grunt.js` file, add a section named `clean`.

Due to the destructive nature of this task, we have implemented several sanity checks but always be cautious of the paths you clean.

#### Parameters

##### src ```string```

This defines what paths this task will clean recursively (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md) and [minimatch](https://github.com/isaacs/minimatch)).

##### options ```object```

This controls how this task (and its helpers) operate and should contain key:value pairs, see options below.

#### Options

##### force ```boolean```

Force deletion, bypasses all built-in sanity checks.

#### Config Examples

There are three different formats that you can use to run this task.

##### Short

``` javascript
clean: ["path/to/dir/one", "path/to/dir/two"]
```

##### Medium (specific targets with global options)

``` javascript
clean: {
  build: ["path/to/dir/one", "path/to/dir/two"],
  release: ["path/to/another/dir/one", "path/to/another/dir/two"]
},
options: {
  clean: {
    force: true // bypasses built-in sanity checks
  }
}
```

##### Long (specific targets with per target options)

``` javascript
clean: {
  build: {
    options: {
      force: true // bypasses built-in sanity checks.
    }
    src: ["path/to/dir/one", "path/to/dir/two"]
  }
}
```