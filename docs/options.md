## Options Retreival Helper
> Contributed By: Tyler Kellen (@tkellen)

### Usage

In order to ensure a consistent configuration style, all grunt-contrib tasks retreive their optional paramters with `grunt.helper('options', this)`
This helper will retreieve an options object from the global `options` key first.  If a subtask has been defined, the helper will override any global options with data in `options.subtask`.  Finally, an options object defined in the `task` key will override all.

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
