module.exports = function(grunt) {

  // Helper for consistent options key access across contrib tasks.
  grunt.registerHelper("options", function(task) {
    task = task.split(':');
    task.push('options');
    return grunt.config(task) || grunt.config(['options', task[0]]);
  });

};
