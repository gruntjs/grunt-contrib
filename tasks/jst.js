/**
 * Task: jst
 * Description: Compile underscore templates to JST file
 * Dependencies: underscore
 * Contributor: @tbranyen
 */

module.exports = function(grunt) {
  "use strict";

  var _ = require("underscore");

  grunt.registerMultiTask("jst", "Compile underscore templates to JST file", function() {
    var options = grunt.helper("options", this, {namespace: "JST", templateSettings: {}});

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || grunt.helper("normalizeMultiTaskFiles", this.data, this.target);

    grunt.verbose.writeflags(options, "Options");

    this.files.forEach(function(file) {
      var srcFiles = grunt.file.expandFiles(file.src);

      var jstOutput = [];
      var jstNamespace = "this['" + options.namespace + "']";

      jstOutput.push(jstNamespace + " = " + jstNamespace + " || {};");

      srcFiles.forEach(function(srcFile) {
        var jstSource = grunt.file.read(srcFile);

        jstOutput.push(grunt.helper("jst", jstSource, srcFile, jstNamespace, options.templateSettings));
      });

      if (jstOutput.length > 0) {
        grunt.file.write(file.dest, jstOutput.join("\n\n"));
        grunt.log.writeln("File '" + file.dest + "' created.");
      }
    });
  });

  grunt.registerHelper("jst", function(source, filepath, namespace, templateSettings) {
    try {
      return namespace + "['" + filepath + "'] = " + _.template(source, false, templateSettings).source + ";";
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn("JST failed to compile.");
    }
  });
};