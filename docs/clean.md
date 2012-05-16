## Clear files and folders.
> Contributed By: Tim Branyen (@tbranyen)

### Configuration

Inside your `grunt.js` file, add a section named `clean`

``` javascript
clean: ['/path/to/dir/one','/path/to/dir/two']
```

As an alternative, you can add specific targets to your clean config,
which can then be called as 'grunt clean:build', 'grunt clean:release' etc.

``` javascript
clean: {
  build: ['/path/to/dir/one','/path/to/dir/two'],
  release: ['/path/to/another/dir/one','/path/to/another/dir/two']
}
```