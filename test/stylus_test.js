var grunt = require("grunt");

exports.stylus = {
  main: function(test) {
    test.expect(2);

    var expectA = "body{font:Helvetica;font-size:10px}\n";
    var resultA = grunt.file.read("fixtures/output/stylus.css");
    test.equal(expectA, resultA, "should compile stylus to css, handling includes and compression");

    var expectB = "body{font:Helvetica;font-size:10px}\n\n#header{font:Helvetica}\n";
    var resultB = grunt.file.read("fixtures/output/stylus_b.css");
    test.equal(expectB, resultB, "should concat output when passed an array");

    test.done();
  }
};