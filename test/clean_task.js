var grunt = require("grunt");

exports.clean = {
  main: function(test) {
    var path = require("path");
    var result = path.existsSync("fixtures/output");

    test.expect(1);
    test.equal(result, false, "should rm -rf a directory");
    test.done();
  }
};