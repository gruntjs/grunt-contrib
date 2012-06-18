/*
 *
 * Task: mincss
 * Description: Minify CSS files
 * Dependencies: clean-css
 * Contributor(s): @tbranyen, @thomasaboyt, @ctalkington
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._;
  var async = grunt.utils.async;

  grunt.registerMultiTask("mincss", "Minify CSS files", function() {
    var options = grunt.helper("options", this);
    var data = this.data;
    var done = this.async();

    async.forEachSeries(_.keys(data.files), function(dest, next) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);
      var dest = grunt.template.process(dest);
      var source = grunt.helper("concat", srcFiles);

      grunt.helper("mincss", source, function(error, min, max) {
        if (error === null) {
          grunt.file.write(dest, min);
          grunt.log.writeln("File '" + dest + "' created.");
          grunt.helper('min_max_info', min, max);
        } else {
          grunt.log.error(error);
          grunt.fail.warn("clean-css failed.");
        }

        next();
      });
    }, function() {
      done();
    });
  });

  grunt.registerHelper("mincss", function(source, callback) {
    try {
      var css = require("clean-css").process(source);
      callback(null, css, source);
    } catch (e) {
      callback(e, null, source);
    }
  });
};