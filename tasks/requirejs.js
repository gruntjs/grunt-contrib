/**
 * Task: RequireJS
 * Description: Optimize RequireJS projects using r.js
 * Dependencies: requireJS
 * Contributor: @tbranyen
 */

module.exports = function(grunt) {
  grunt.registerMultiTask("requirejs", "Build a RequireJS project.", function() {
    var options = grunt.helper("options", this);
    require('requirejs').optimize(options);
  });
};