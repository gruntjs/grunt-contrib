/**
 * Task: handlebars
 * Description: Compile handlebars templates to JST file
 * Dependencies: handlebars
 * Contributor: @tbranyen
 */

module.exports = function(grunt) {
  "use strict";

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;

  grunt.registerMultiTask("handlebars", "Register handlebars partials and then Compile handlebars templates to JST file", function() {
    var options = grunt.helper("options", this, {namespace: "JST"});

    grunt.verbose.writeflags(options, "Options");

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || grunt.helper("normalizeMultiTaskFiles", this.data, this.target);

    var srcFiles;
    var partialFiles;
    var taskOutput = [];
    var sourceCode;
    var sourceCompiled;
    var expandedFiles;

    var helperNamespace = "this['" + options.namespace + "']";
    var isPartial = options.partialRegex || /^_/;

    var defaultProcessPartialName = function(filePath) {
      var pieces = _.last(filePath.split("/")).split(".");
      var name   = _(pieces).without(_.last(pieces)).join("."); // strips file extension
      return name.substr(1, name.length);                       // strips leading _ character
    };

    var preProcessWithHelper = function(files, helper, output) {
      files.forEach(function(srcFile) {
        sourceCode = grunt.file.read(srcFile);

        // non-partials
        if (helper === "handlebars" && options.processName && _.isFunction(options.processName)) {
          srcFile = options.processName(srcFile);
        }

        // partials
        if (helper === "handlebars-partial" && options.processPartialName && _.isFunction(options.processPartialName)) {
          srcFile = options.processPartialName(srcFile);
        } else if (helper === "handlebars-partial") {
          srcFile = defaultProcessPartialName(srcFile);
        }

        sourceCompiled = grunt.helper(helper, sourceCode, srcFile, helperNamespace);
        output.push(sourceCompiled);
      });
    };

    this.files.forEach(function(file) {
      expandedFiles = grunt.file.expandFiles(file.src);

      srcFiles = _.filter(expandedFiles, function(f) {
        return !isPartial.test(_.last(f.split("/")));
      });

      partialFiles = _.filter(expandedFiles, function(f) {
        return isPartial.test(_.last(f.split("/")));
      });

      taskOutput.push(helperNamespace + " = " + helperNamespace + " || {};");

      preProcessWithHelper(partialFiles, "handlebars-partial",    taskOutput);
      preProcessWithHelper(srcFiles,     "handlebars", taskOutput);

      if (taskOutput.length > 0) {
        grunt.file.write(file.dest, taskOutput.join("\n\n"));
        grunt.log.writeln("File '" + file.dest + "' created.");
      }
    });
  });

  grunt.registerHelper("handlebars-partial", function(source, filepath, namespace) {
    try {
      return "Handlebars.registerPartial('" + filepath + "', " + "Handlebars.template(" + require("handlebars").precompile(source) + "));";
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn("Handlebars failed to compile partial.");
    }
  });

  grunt.registerHelper("handlebars", function(source, filepath, namespace) {
    try {
      var output = "Handlebars.template(" + require("handlebars").precompile(source) + ");";
      return namespace + "['" + filepath + "'] = " + output;
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn("Handlebars failed to compile.");
    }
  });
};
