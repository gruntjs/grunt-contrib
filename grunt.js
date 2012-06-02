module.exports = function(grunt) {

  grunt.initConfig({});

  grunt.loadTasks("tasks");

  grunt.registerTask("test",function(){
    grunt.warn('test has been relocated. go to test directory and run grunt.');
  });

  grunt.registerTask("default", "test");

};