/*
 *
 * Task: less
 * Description: Compile LESS files to CSS
 * Dependencies: less
 * Contributor(s): @tkellen, @thomasaboyt, @tkazec
 *
 */

module.exports = function(grunt) {

  grunt.registerMultiTask("less",
    "Compile LESS files to CSS", function() {

    var lessError = function(e, src) {
      var pos = '['.red + ('L' + e.line).yellow + ':'.red + ('C' + e.column).yellow + ']'.red;
      grunt.log.writeln(src.yellow + ': ' + pos + ' ' + e.message.yellow);
      grunt.warn("Error compiling less.", 1);
    };

    var options = grunt.helper("options", this),
           less = require("less"),
           data = this.data,
         parser = new(less.Parser)(options);

    // make sure task runs until parser is completely finished (imports are processed asynchronously)
    var done = this.async();

    // iterate over files to compile/compress
    Object.keys(data.files).forEach(function(dest) {

      // grab src file to compile dest to
      var src = data.files[dest];

      // run LESS compiler
      parser.parse(grunt.file.read(src), function (parse_err, tree) {

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
    grunt.log.writeln("LESS compilation complete.");
  });

};
