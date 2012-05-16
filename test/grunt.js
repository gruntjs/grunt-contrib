module.exports = function(grunt) {

  grunt.initConfig({

    clean: ["fixtures/output"],

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
        data: {
          test: true
        }
      },
      include: {
        src: "fixtures/jade/jadeInclude.jade",
        dest: "fixtures/output"
      }
    },

    less: {
      compile: {
        files: {
          "fixtures/output/less.css": "fixtures/less/style.less"
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

};
