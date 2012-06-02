var grunt = require("grunt");

exports.less = {
  main: function(test) {
    var expect = "body {\n  color: #ffffff;\n}\n";
    var resultA = grunt.file.read("fixtures/output/less_a.css");
    var resultB = grunt.file.read("fixtures/output/less_b.css");

    test.expect(2);
    test.equal(expect, resultA, "should compile less, with the ability to handle imported files from alternate include paths");
    test.equal(expect, resultB, "should compile to all dests");
    test.done();
  }
};