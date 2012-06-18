/*
 *
 * Task: handlebars
 * Description: Compile handlebars templates to JST file
 * Dependencies: handlebars
 * Contributor(s): @tbranyen / @ctalkington
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._;
  var async = grunt.utils.async;

  grunt.registerMultiTask("handlebars", "Compile handlebars templates to JST file", function() {
    var options = grunt.helper("options", this, {namespace: "JST"});
    var data = this.data;
    var done = this.async();

    async.forEachSeries(_.keys(data.files), function(dest, next) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);
      var dest = grunt.template.process(dest);

      grunt.helper("handlebars", srcFiles, options.namespace, function(error, script) {
        if (error === null) {
          grunt.file.write(dest, script);
          grunt.log.writeln("File '" + dest + "' created.");
        } else {
          grunt.log.error(error);
          grunt.fail.warn("Handlebars failed to compile.");
        }

        next();
      });
    }, function() {
      done();
    });
  });

  grunt.registerHelper("handlebars", function(files, namespace, callback) {
    namespace = "this['" + namespace + "']";

    var results = [];
    results.push(namespace + " = " + namespace + " || {};");

    try {
      _.each(files, function(filepath) {
        var handleSource = grunt.file.read(filepath);
        var handleOutput = require("handlebars").precompile(handleSource);
        results.push(namespace + "['" + filepath + "'] = " + handleOutput);
      });
      var result = results.join("\n\n");
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  });
};