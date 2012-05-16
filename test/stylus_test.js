var grunt = require("grunt");

exports.stylus = {

  setUp: function(done) {
    grunt.helper("testContribTask", "stylus:compile", done);
  },

  helper: function(test) {
     var expect = "body{font:Helvetica;font-size:10px}\n";
     var result = grunt.file.read("test/fixtures/output/stylus.css");
 
     test.equal(expect, result, "should compile stylus to css, handling includes and compression");
     test.done();
  }

};
