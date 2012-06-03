module.exports = function(grunt) {
  grunt.initConfig({
    test: {
      tasks: ["*_test.js"],
      clean: ['clean_task.js']
    },

    clean: {
      output: ["fixtures/output"]
    },

    coffee: {
      compile: {
        files: {
          "fixtures/output/coffee.js": "fixtures/coffee/coffee.coffee"
        },
        options: {
          bare: true
        }
      }
    },

    jade: {
      simple: {
        src: "fixtures/jade/jade.jade",
        dest: "fixtures/output",
        options: {
          data: {
            test: true
          }
        }
      },
      include: {
        src: "fixtures/jade/jadeInclude.jade",
        dest: "fixtures/output"
      },
      template: {
        src: "fixtures/jade/jadeTemplate.jade",
        dest: "fixtures/output",
        options: {
          data: {
            year: "<%= grunt.template.today('yyyy') %>"
          }
        }
      }
    },

    jst: {
      'fixtures/output/jst.js': ['fixtures/jst/*.html']
    },

    less: {
      compile: {
        files: {
          "fixtures/output/less_a.css": "fixtures/less/style.less",
          "fixtures/output/less_b.css": "fixtures/less/style.less"
        },
        options: {
          paths: ["fixtures/less/include"]
        }
      }
    },

    mincss: {
      "fixtures/output/style.css": [
        "fixtures/mincss/input_one.css",
        "fixtures/mincss/input_two.css"
      ]
    },

    stylus: {
      compile: {
        files: {
          "fixtures/output/stylus.css": "fixtures/stylus/stylus.styl"
        },
        options: {
          paths: ["fixtures/stylus/include"],
          compress: true
        }
      }
    },

    options: {
      jade: {
        filename: 'fixtures/jade/inc/'
      }
    }
  });

  grunt.loadTasks("../tasks");
  grunt.registerTask("default", "clean test:clean coffee jade jst less mincss stylus test:tasks");
};