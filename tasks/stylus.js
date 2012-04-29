/*
 *
 * Task: stylus
 * Description: Compile Stylus files into CSS
 * Dependencies: stylus
 * Contributor(s): @errcw
 *
 */

module.exports = function(grunt) {

  var file = grunt.file;
  var log = grunt.log;

  var _ = grunt.utils._;
  var async = grunt.utils.async;

  grunt.registerMultiTask("stylus",
    "Compile Stylus files into CSS", function() {

    var files = this.data.files;
    var options = this.data.options || {};
    var done = this.async();

    async.forEach(Object.keys(files), function(dest, callback) {
      var src = files[dest];
      async.concat(file.expand(src), function(filename, callback) {
        var opts = _.extend(options, {filename: filename});
        grunt.helper("stylus", file.read(filename), opts, function(err, css) {
          callback(err, css);
        });
      }, function(err, css) {
        if (!err) {
          file.write(dest, css.join("\n"));
          log.writeln("File '" + dest + "' created.");
        }
        callback(err);
      });
    }, function (err) {
      done(!err);
    });
  });

  // Compiles a single stylus file and returns the resulting CSS via a callback.
  grunt.registerHelper("stylus", function(src, options, callback) {
    var stylus = require("stylus");
    var s = stylus(src);

    _.each(options, function(value, key) {
      s.set(key, value);
    });

    s.render(function(err, css) {
      if (err) {
        log.error(err);
      }
      callback(err, css);
    });
  });

};
