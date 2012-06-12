/*
 *
 * Task: RequireJS
 * Description: Optimize RequireJS projects using r.js
 * Dependencies: requireJS
 * Contributor(s): @tbranyen, @tkellen, @ctalkington
 *
 */

module.exports = function(grunt) {
  grunt.registerMultiTask("requirejs", "Build a RequireJS project.", function() {
    var options = grunt.helper("options", this),
        done = this.async();

    grunt.helper("requirejs", options, function(error, response) {
      if (error === null) {
        grunt.log.ok(response);
      } else {
        grunt.log.error(error);
        grunt.fail.warn("RequireJS optimizer failed.");
      }

      done();
    });
  });

  grunt.registerHelper("requirejs", function(options, callback) {
    try {
      require('requirejs').optimize(options, function(response) {
        callback(null, response);
      });
    } catch (e) {
      callback(e, null);
    }
  });
};