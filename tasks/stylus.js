/*
 *
 * Task: stylus
 * Description: Compile Stylus files into CSS
 * Dependencies: stylus
 * Contributor(s): @errcw
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._;
  var async = grunt.utils.async;

  grunt.registerMultiTask("stylus", "Compile Stylus files into CSS", function() {
    var options = grunt.helper('options', this);
    var data = this.data;
    var done = this.async();

    async.forEachSeries(_.keys(data.files), function(dest, next) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);
      var dest = grunt.template.process(dest);

      async.concatSeries(srcFiles, function(srcFile, nextConcat) {
        var stylusOptions = _.extend({filename: srcFile}, options);
        var stylusSource = grunt.file.read(srcFile);

        grunt.helper("stylus", stylusSource, stylusOptions, function(error, css) {
          nextConcat(error, css);
        });
      }, function(error, css) {
        if (error === null) {
          grunt.file.write(dest, css.join("\n"));
          grunt.log.writeln("File '" + dest + "' created.");
        } else {
          grunt.log.error(error);
          grunt.fail.warn("Stylus failed to compile.");
        }

        next();
      });
    }, function () {
      done();
    });
  });

  grunt.registerHelper("stylus", function(source, options, callback) {
    var s = require("stylus")(source);

    _.each(options, function(value, key) {
      s.set(key, value);
    });

    s.render(function(error, css) {
      callback(error, css);
    });
  });
};