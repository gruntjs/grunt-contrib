/**
 * Task: stylus
 * Description: Compile Stylus files into CSS
 * Dependencies: stylus
 * Contributor: @errcw
 */

module.exports = function(grunt) {
  "use strict";

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;
  var async = grunt.util.async;

  grunt.registerMultiTask("stylus", "Compile Stylus files into CSS", function() {
    var options = grunt.helper("options", this);

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || grunt.helper("normalizeMultiTaskFiles", this.data, this.target);

    var done = this.async();

    grunt.verbose.writeflags(options, "Options");

    async.forEachSeries(this.files, function(file, next) {
      var srcFiles = grunt.file.expandFiles(file.src);

      async.concatSeries(srcFiles, function(srcFile, nextConcat) {
        var stylusOptions = _.extend({filename: srcFile}, options);
        var stylusSource = grunt.file.read(srcFile);

        grunt.helper("stylus", stylusSource, stylusOptions, function(css) {
          nextConcat(css);
        });
      }, function(css) {
        grunt.file.write(file.dest, css);
        grunt.log.writeln("File '" + file.dest + "' created.");

        next();
      });
    }, function() {
      done();
    });
  });

  grunt.registerHelper("stylus", function(source, options, callback) {
    var s = require("stylus")(source);

    _.each(options, function(value, key) {
      s.set(key, value);
    });

    s.render(function(e, css) {
      if (!e) {
        callback(css);
      } else {
        grunt.log.error(e);
        grunt.fail.warn("Stylus failed to compile.");
      }
    });
  });
};