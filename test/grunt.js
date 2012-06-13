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
          "fixtures/output/coffee_basic.js": "fixtures/coffee/coffee_basic.coffee",
          "fixtures/output/coffee_inheritance.js": "fixtures/coffee/coffee_inheritance.coffee"
        },
        options: {
          bare: true
        }
      }
    },

    compress: {
      zip: {
        options: {
          type: 'zip',
          level: 1
        },
        files: {
          'fixtures/output/compress_test_files.zip': 'fixtures/compress/*',
          'fixtures/output/compress_test_folders.zip': 'fixtures/compress/**',
          'fixtures/output/compress_test_v<%= pkg.version %>.zip': 'fixtures/compress/**',
          'fixtures/output/compress_test_array.zip': ['fixtures/compress/test.*','fixtures/compress/folder_one/*']
        }
      },
      gzip: {
        options: {
          type: 'gzip'
        },
        files: {
          'fixtures/output/test.gz': 'fixtures/compress/test.js'
        }
      }
    },

    jade: {
      simple: {
        files: {
          "fixtures/output": ["fixtures/jade/jade.jade", "fixtures/jade/jade2.jade"]
        },
        options: {
          data: {
            test: true
          }
        }
      },
      include: {
        files: {
          "fixtures/output": "fixtures/jade/jadeInclude.jade"
        }
      },
      template: {
        files: {
          "fixtures/output": "fixtures/jade/jadeTemplate.jade"
        },
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

    requirejs: {
      compile: {
        options: {
          baseUrl: "fixtures/requirejs",
          name: "project",
          out: "fixtures/output/requirejs.js"
        }
      }
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
  grunt.registerTask("default", "clean test:clean coffee compress jade jst less mincss requirejs stylus test:tasks");
};
