/**
 * Task: jade
 * Description: Compile Jade templates to HTML
 * Dependencies: jade
 * Contributor: @errcw
 */

module.exports = function(grunt) {
  "use strict";

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;

  grunt.registerMultiTask("jade", "Compile Jade templates into HTML.", function() {
    var options = grunt.helper("options", this);

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || grunt.helper("normalizeMultiTaskFiles", this.data, this.target);

    var jadeData = options.data;

    grunt.verbose.writeflags(options, "Options");

    if (_.isEmpty(jadeData) === false) {
      _.each(jadeData, function(value, key) {
        if (_.isString(value)) {
          jadeData[key] = grunt.template.process(value);
        }
      });
    }

    this.files.forEach(function(file) {
      var srcFiles = grunt.file.expandFiles(file.src);

      var jadeOutput = [];

      srcFiles.forEach(function(srcFile) {
        var jadeOptions = _.extend({filename: srcFile}, options);
        var jadeSource = grunt.file.read(srcFile);

        jadeOutput.push(grunt.helper("jade", jadeSource, jadeOptions, jadeData));
      });

      if (jadeOutput.length > 0) {
        grunt.file.write(file.dest, jadeOutput.join("\n"));
        grunt.log.writeln("File '" + file.dest + "' created.");
      }
    });
  });

  grunt.registerHelper("jade", function(src, options, data) {
    try {
      return require("jade").compile(src, options)(data);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn("Jade failed to compile.");
    }
  });
};