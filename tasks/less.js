/*
 *
 * Task: less
 * Description: Compile LESS files to CSS
 * Dependencies: less
 * Contributor(s): @tkellen, @thomasaboyt
 *
 */

module.exports = function(grunt) {

  var file = grunt.file;
  var log = grunt.log;

  var lessError = function(e, src) {
    var pos = '['.red + ('L' + e.line).yellow + ':'.red + ('C' + e.column).yellow + ']'.red;
    grunt.log.writeln(src.yellow + ': ' + pos + ' ' + e.message.yellow);
    grunt.warn("Error compiling less.", 1);
  };

  grunt.registerMultiTask("less",
    "Compile LESS files to CSS", function() {

    // load libraries
    var less = require("less");
    var data = this.data;

    // load options from task or global options key
    var options = grunt.helper('options',this);

    // initialize LESS parser
    var parser = new(less.Parser)(options);

    // make sure task runs until parser is completely finished (imports are processed asynchronously)
    var done = this.async();

    // iterate over files to compile/compress
    Object.keys(data.files).forEach(function(dest) {

      // grab src file to compile dest to
      var src = data.files[dest];

      // run LESS compiler
      parser.parse(file.read(src), function (parse_err, tree) {

        // record error (if any)
        // in this step, basic parsing/syntax errors are caught
        if(parse_err) {
          lessError(parse_err, src);
        }

        // compile LESS to CSS
        // in this step, more complex errors like mixins not existing are caught.
        try {
          var css = tree.toCSS();
          grunt.file.write(dest,css);
        }
        catch (toCSS_error) {
          lessError(toCSS_error, src);
        }

        // flag task as complete
        done();
      });

    });

    // Fail task if errors were logged.
    if (grunt.errors) { return false; }

    // Otherwise, print a success message.
    log.writeln("LESS compilation complete.");
  });

};
