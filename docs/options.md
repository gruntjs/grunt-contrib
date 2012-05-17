## Options Retreival Helper
> Contributed By: Tyler Kellen (@tkellen)

### Usage

This helper will retreieve an options object from the global `options.task` key.  If a subtask has been defined, data in `options.task.subtask` can override keys in `options.task`.  Finally, an options object defined directly in the `task` key will override all.

``` javascript
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
