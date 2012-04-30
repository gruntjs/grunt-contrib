module.exports = function(grunt) {

  grunt.initConfig({
    test: {
      files: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');

  // Helper to run contrib tasks for testing.
  grunt.registerHelper('testContribTask',function(task, done) {
    var path = require('path');
    var fs = require('fs');
    if(!path.existsSync('test/fixtures/output')) {
      fs.mkdirSync('test/fixtures/output');
    }
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

  grunt.registerTask('default', 'test');

};
