var grunt = require("grunt");

exports.yuidoc = {
  main: function(test) {
    test.expect(4);

    var expectA = true;
    var resultA = require("path").existsSync("fixtures/output/yuidoca/data.json");
    test.equal(resultA, expectA, "If provided with a string path, Should generate JSON from source code");

    var expectB = true;
    var resultB = require("path").existsSync("fixtures/output/yuidoca/index.html");
    test.equal(resultB, expectB, "If provided with a string path, Should create template files for viewing data.json");

    var expectC = true;
    var resultC = require("path").existsSync("fixtures/output/yuidocb/data.json");
    test.equal(resultC, expectC, "If provided with an array of paths, should generate JSON from source code");

    var expectD = true;
    var resultD = require("path").existsSync("fixtures/output/yuidocb/index.html");
    test.equal(resultD, expectD, "If provided with an array of paths, should create template files for viewing data.json");

    test.done();
  }
};