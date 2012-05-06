module.exports = function(grunt) {
  grunt.initConfig({
    pkg: {
      version: "0.3.9"
    },

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

    zip: {
      compress: {
        options: {
          level: 1
        },
        files: {
          'fixtures/output/zip_test_files.zip': 'fixtures/zip/*',
          'fixtures/output/zip_test_folders.zip': 'fixtures/zip/**',
          'fixtures/output/zip_test_v<%= pkg.version %>.zip': 'fixtures/zip/**',
          'fixtures/output/zip_test_array.zip': ['fixtures/zip/test.*','fixtures/zip/folder_one/*']
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
  grunt.registerTask("default", "clean test:clean coffee jade jst less mincss stylus zip test:tasks");
};