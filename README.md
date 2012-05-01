# grunt-contrib

A collection of general use grunt tasks.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-contrib`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-contrib');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
Grunt-contrib is currently alpha-quality software.  See the docs dir for more information.  

## Contributing

#### Configuration
In order to ensure a consistent configuration style, task submissions should retreive options with `grunt.helper('options', this);`.  This will search within the current task (or subtask) object for an `options` key.  If none is found, the helper will traverse up to the global `options` entry, looking for a key that matches the task name.
```javascript
task: {
  subtask: {
    options: { param: override },
  },
}
options: {
  task: {
    param: default
  }
}
```

#### Testing
Tests must be included with your submission.  New tasks can be added to the config in `test/grunt.js`, please see existing tests for guidance.  *Currently, testing with grunt is a bit cumbersome--this will be addressed in a future release.*

## Release History

2012/05/01 - v0.0.1 - Alpha release.

## License
Copyright (c) 2012 "Cowboy" Ben Alman & contributors.
Licensed under the MIT license.
