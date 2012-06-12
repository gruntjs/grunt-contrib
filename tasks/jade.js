/*
 *
 * Task: jade
 * Description: Compile Jade templates to HTML
 * Dependencies: jade, path
 * Contributor(s): @errcw / @conradz / @ctalkington
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._,
      async = grunt.utils.async;

  grunt.registerMultiTask("jade", "Compile Jade templates into HTML.", function() {
    var path = require("path");

    var options = grunt.helper("options", this),
        data = this.data,
        jadeData = options.data,
        done = this.async();

    // add template process for grunt templates
    if (_.isEmpty(jadeData) == false) {
      _.each(jadeData, function(value, key) {
        if (_.isString(value)) {
          jadeData[key] = grunt.template.process(value);
        }
      });
    }

    async.forEachSeries(_.keys(data.files), function(dest, next) {
      var src = data.files[dest],
          srcFiles = grunt.file.expandFiles(src),
          dest = grunt.template.process(dest);

      async.forEach(_.values(srcFiles), function(srcFile, callback) {
        var jadeOptions = _.extend({filename: srcFile}, options),
            jadeSource = grunt.file.read(srcFile);

        grunt.helper("jade", jadeSource, jadeOptions, jadeData, function(error, response){
          if (error === null) {
            var basename = path.basename(srcFile),
                extname = path.extname(srcFile),
                htmlname = basename.substring(0, basename.length - extname.length) + ".html",
                outpath = dest + '/' + htmlname;

            grunt.file.write(outpath, response);
            grunt.log.writeln('File "' + outpath + '" created.');
          } else {
            grunt.log.error(error);
            grunt.fail.warn("Jade compiler failed.");
          }

          callback();
        });
      }, function() {
        next();
      });

    }, function() {
      done();
    });
  });

  grunt.registerHelper("jade", function(src, options, data, callback) {
    try {
      var jadeOutput = require("jade").compile(src, options)(data);
      callback(null, jadeOutput);
    } catch (e) {
      callback(e, null);
    }
  });
};