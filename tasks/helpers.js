module.exports = function(grunt) {

  // Helper for consistent options key access across contrib tasks.
  grunt.registerHelper("options", function(task) {
    var config = task.nameArgs.split(':');
    config.push('options');
    return grunt.config(config) || grunt.config(['options', config[0]]);
  });

};
