/**
 * Task: coffee
 * Description: Compile CoffeeScript files into JavaScript
 * Dependencies: coffee-script
 * Contributor: @errcw
 */

module.exports = function(grunt) {
  var _ = grunt.utils._;

  grunt.registerMultiTask("coffee", "Compile CoffeeScript files into JavaScript", function() {
    var options = grunt.helper("options", this);

    // TODO: ditch this when grunt v0.4 is released
    this.files = grunt.helper("normalizeMultiTaskFiles", this.data, this.target);

    grunt.verbose.writeflags(options, "Options");

    this.files.forEach(function(file) {
      var srcFiles = grunt.file.expandFiles(file.src);

      var coffeeOutput = [];

      srcFiles.forEach(function(srcFile) {
        var coffeeOptions = _.extend({filename: srcFile}, options);
        var coffeeSource = grunt.file.read(srcFile);

        coffeeOutput.push(grunt.helper("coffee", coffeeSource, coffeeOptions));
      });

      if (coffeeOutput.length > 0) {
        grunt.file.write(file.dest, coffeeOutput.join("\n"));
        grunt.log.writeln("File '" + file.dest + "' created.");
      }
    });
  });

  grunt.registerHelper("coffee", function(coffeescript, options) {
    try {
      return require("coffee-script").compile(coffeescript, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn("CoffeeScript failed to compile.");
    }
  });
};