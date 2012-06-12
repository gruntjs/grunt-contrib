/*
 *
 * Task: coffee
 * Description: Compile CoffeeScript files into JavaScript
 * Dependencies: coffee-script
 * Contributor(s): @errcw
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._,
      async = grunt.utils.async;

  grunt.registerMultiTask("coffee", "Compile CoffeeScript files into JavaScript", function() {
    var options = grunt.helper("options", this),
        files = this.data.files,
        done = this.async();

    async.forEach(Object.keys(files), function(dest, callback) {
      var src = files[dest];
      async.concat(grunt.file.expand(src), function(filename, callback) {
        var opts = _.extend({filename: filename}, options);
        var javascript = grunt.helper("coffee", grunt.file.read(filename), opts);
        callback(!javascript, javascript);
      }, function(err, javascript) {
        if (!err) {
          grunt.file.write(dest, javascript.join("\n"));
          grunt.log.writeln("File '" + dest + "' created.");
        }
        callback(err);
      });
    }, function(err) {
      done(!err);
    });
  });

  grunt.registerHelper("coffee", function(coffeescript, options) {
    var coffee = require("coffee-script");
    try {
      var javascript = coffee.compile(coffeescript, options);
      return javascript;
    } catch (e) {
      grunt.log.error(e);
      return null;
    }
  });
};
