module.exports = function(grunt) {

  grunt.initConfig({

    mincss: {
      "fixtures/output/style.css": [
        "fixtures/mincss/input_one.css",
        "fixtures/mincss/input_two.css"
      ]
    },

    less: {
      compile: {
        files: {
          'fixtures/output/less.css': 'fixtures/less/style.less'
        }
      },
      options: {
        paths: ['fixtures/less/include']
      }
    }

  });

  // Helper for consistent options key access across contrib tasks.
  grunt.registerHelper("options", function(task) {
    return grunt.config(task+'.options') || grunt.config('options.'+task);
  });

  grunt.loadTasks("../tasks");


};
