var grunt = require("grunt");

exports.sass = {
  main: function(test) {
     var expect = "body {\n  color: #f1f1f1; }\n";
     var result = grunt.file.read("fixtures/output/sass.css");

     test.expect(1);
     test.equal(expect, result, "should compile sass to css");
     test.done();
  }
};
