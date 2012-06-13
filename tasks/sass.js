/*
 *
 * Task: sass
 * Description: Compile SASS files into CSS
 * Dependencies: node-sass
 * Contributor(s): @tkellen
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._,
      async = grunt.utils.async,
      sass = require("sass");

  grunt.registerMultiTask("sass", "Compile Stylus files into CSS", function() {
    var options = grunt.helper('options', this),
        files = this.data.files,
        done = this.async();

    async.forEach(Object.keys(files), function(dest, callback) {
      var src = files[dest];
      async.concat(grunt.file.expand(src), function(filename, callback) {
        grunt.helper("sass", grunt.file.read(filename), function(err, css) {
          callback(err, css);
        });
      }, function(err, css) {
        if (!err) {
          grunt.file.write(dest, css.join("\n"));
          grunt.log.writeln("File '" + dest + "' created.");
        }
        callback(err);
      });
    }, function (err) {
      done(!err);
    });
  });

  // Compiles a single stylus file and returns the resulting CSS via a callback.
  grunt.registerHelper("sass", function(src, callback) {
    var sass = require("sass");

    sass.render(src, function(err, css) {
      if (err) {
        grunt.log.error(err);
      }
      callback(err, css);
    });
  });
};
