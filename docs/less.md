## Compile LESS files to CSS
> Contributed By: Tyler Kellen (@tkellen)

### Configuration

Inside your `grunt.js` file, add a section named `less` and specify the less
parser options, as well as the files you wish to compile.  The `paths` option
specifies directories to scan for @import directives.

``` javascript
less: {
  compile: {
    files: {
      'path/to/result.css': 'path/to/source.less'
    },
    options: {
      paths: ['assets/css']
    }
  }
}
```
