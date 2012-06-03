# Helpers

Several helpers are included as part of grunt-contrib, often to help improve consistency between tasks.

## Included Helpers

### Options

#### Overview

This helper will retrieve an options object from the global options.task key. If a subtask has been defined, data in options.task.subtask can override keys in options.task. Finally, an options object defined directly in the task key will override all.

#### Parameters

##### data

This parameter is used to find out the current task, commonly passed ```this``` from within tasks.

##### defaults

This parameter allows developers to define sensible default options that are set if user neglected to set them.

#### Usage

```javascript
var options = grunt.helper("options", this, {fallback: true}); // loads options for current task
```

#### Config


```javascript
options: {
  task: {
    param: 'default',
    subtask: {
      param: 'override default'
    }
  }
},

task: {
  subtask: {
    options: {
      param: 'override all'
    }
  }
}
```

> Contributed By: Tyler Kellen (@tkellen)

### Utils

#### Overview

This helper was designed to provide a bridge between grunt v0.3.9 and v0.4.0 due to changes in util property naming.

#### Parameters

##### utility

This parameter is used to specify which utility you want to load. (_, async, etc)

#### Usage

```javascript
var _ = grunt.helper("utils", "_"); // loads _ (underscore js) for usage in task
```

> Contributed By: Chris Talkington (@ctalkington)