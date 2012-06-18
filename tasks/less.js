/*
 *
 * Task: less
 * Description: Compile LESS files to CSS
 * Dependencies: less
 * Contributor(s): @tkellen, @thomasaboyt, @tkazec, @ctalkington
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._;
  var async = grunt.utils.async;

  grunt.registerMultiTask("less", "Compile LESS files to CSS", function() {
    var lessError = function(e) {
      var pos = '[' + 'L' + e.line + ':' + ('C' + e.column) + ']';
      grunt.log.error(e.filename + ': ' + pos + ' ' + e.message);
      grunt.fail.warn("Error compiling LESS.", 1);
    };

    var options = grunt.helper("options", this);
    var data = this.data;
    var done = this.async();

    async.forEachSeries(_.keys(data.files), function(dest, next) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);
      var dest = grunt.template.process(dest);

      async.concatSeries(srcFiles, function(srcFile, nextConcat) {
        var lessOptions = _.extend({filename: srcFile}, options);
        var lessSource = grunt.file.read(srcFile);

        grunt.helper("less", lessSource, lessOptions, function(error, css) {
          nextConcat(error, css);
        });
      }, function(error, css) {
        if (error === null) {
          grunt.file.write(dest, css.join("\n\n"));
          grunt.log.writeln("File '" + dest + "' created.");
        } else {
          lessError(error);
        }

        next();
      });

    }, function () {
      done();
    });
  });

  grunt.registerHelper("less", function(source, options, callback) {
    require("less").Parser(options).parse(source, function(parse_error, tree) {
      if (parse_error) {
        callback(parse_error, null);
        return;
      }

      try {
        var css = tree.toCSS();
        callback(null, css);
      } catch (e) {
        callback(e, null);
      }
    });
  });
};