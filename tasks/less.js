/*
 *
 * Task: less
 * Description: Compile LESS files to CSS
 * Dependencies: less
 * Contributor(s): @tkellen, @thomasaboyt, @tkazec
 *
 */

module.exports = function(grunt) {
  var async = grunt.utils.async;

  grunt.registerMultiTask("less", "Compile LESS files to CSS", function() {
    var lessError = function(e, src) {
      var pos = '['.red + ('L' + e.line).yellow + ':'.red + ('C' + e.column).yellow + ']'.red;
      grunt.log.writeln(src.yellow + ': ' + pos + ' ' + e.message.yellow);
      grunt.fail.warn("Error compiling LESS.", 1);
    };

    var options = grunt.helper("options", this),
        less = require("less"),
        data = this.data,
        parser = new less.Parser(options);

    // make sure task runs until parser is completely finished (imports are processed asynchronously)
    var done = this.async();

    // iterate over files to compile/compress
    async.forEachSeries(Object.keys(data.files), function(dest, next) {
      // grab src file to compile dest to
      var src = data.files[dest];

      // run LESS compiler
      parser.parse(grunt.file.read(src), function(parse_err, tree) {
        // record error (if any)
        // in this step, basic parsing/syntax errors are caught
        if (parse_err) {
          lessError(parse_err, src);
        }

        // compile LESS to CSS
        // in this step, more complex errors like mixins not existing are caught.
        try {
          var css = tree.toCSS();
          grunt.file.write(dest,css);
          grunt.log.writeln("File '" + dest + "' created.");
        }
        catch (toCSS_error) {
          lessError(toCSS_error, src);
        }

        // go on to the next dest
        next();
      });

    }, function() {
      // flag task as complete
      done();
    });
  });
};