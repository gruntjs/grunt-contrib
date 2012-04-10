/*
 * grunt-contrib
 * https://github.com/gruntjs/grunt-contrib
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('contrib', 'Your task description goes here.', function() {
    grunt.log.write(grunt.helper('contrib'));
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('contrib', function() {
    return 'contrib!!!';
  });

};
