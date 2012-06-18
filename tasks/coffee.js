/*
 *
 * Task: coffee
 * Description: Compile CoffeeScript files into JavaScript
 * Dependencies: coffee-script
 * Contributor(s): @errcw / @ctalkington
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._;
  var async = grunt.utils.async;

  grunt.registerMultiTask("coffee", "Compile CoffeeScript files into JavaScript", function() {
    var options = grunt.helper("options", this);
    var data = this.data;
    var done = this.async();

    async.forEachSeries(_.keys(data.files), function(dest, next) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);
      var dest = grunt.template.process(dest);

      async.concatSeries(srcFiles, function(srcFile, nextConcat) {
        var coffeeOptions = _.extend({filename: srcFile}, options);
        var coffeeSource = grunt.file.read(srcFile);

        grunt.helper("coffee", coffeeSource, coffeeOptions, function(error, script) {
          nextConcat(error, script);
        });
      }, function(error, script) {
        if (error === null) {
          grunt.file.write(dest, script.join("\n"));
          grunt.log.writeln("File '" + dest + "' created.");
        } else {
          grunt.log.error(error);
          grunt.fail.warn("CoffeeScript failed to compile.");
        }

        next();
      });

    }, function() {
      done();
    });
  });

  grunt.registerHelper("coffee", function(coffeescript, options, callback) {
    try {
      var javascript = require("coffee-script").compile(coffeescript, options);
      callback(null, javascript);
    } catch (e) {
      callback(e, null);
    }
  });
};