module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    test: {
      files: ['test/*_test.js']
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Helper for consistent options key access across contrib tasks.
  grunt.registerHelper("options", function(task) {
    return grunt.config(task+'.options') || grunt.config('options.'+task);
  });

  // Helper to run contrib tasks for testing.
  grunt.registerHelper('testContribTask',function(task, done) {
    grunt.utils.spawn(
      {
        cmd: "grunt",
        args: [ "--config", "test/grunt.js", "--base", "test", task ]
      },
      function (err, result) {
        if(err !== null) {
          console.log(result.stdout);
        }
        done();
      }
    );
  });

  // Default task.
  grunt.registerTask('default', 'test');

};
