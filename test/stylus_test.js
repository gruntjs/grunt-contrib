var grunt = require("grunt");

exports.stylus = {
  main: function(test) {
     var expect = "body{font:Helvetica;font-size:10px}\n";
     var result = grunt.file.read("fixtures/output/stylus.css");

     test.expect(1);
     test.equal(expect, result, "should compile stylus to css, handling includes and compression");
     test.done();
  }
};