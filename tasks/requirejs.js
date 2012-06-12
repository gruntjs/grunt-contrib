/*
 *
 * Task: RequireJS
 * Description: Optimize RequireJS projects using r.js
 * Dependencies: requireJS
 * Contributor(s): @tbranyen, @tkellen
 *
 */

module.exports = function(grunt) {
  var requirejs = require("requirejs");

  grunt.registerMultiTask("requirejs", "Build a RequireJS project.", function(prop) {
    var options = grunt.helper("options", this);
    grunt.helper("r.js", options, function(resp) {
      grunt.log.writeln(resp);
    });

  });

  grunt.registerHelper("r.js", function(options, done) {
    requirejs.optimize(options, done);
  });

};
