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
        },
        options: {
          paths: ['fixtures/less/include']
        }
      }
    },

    clean: ['fixtures/output']

  });

  grunt.loadTasks("../tasks");

};
