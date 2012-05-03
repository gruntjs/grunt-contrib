var grunt = require("grunt");

exports.clean = {

  setUp: function(done) {
    grunt.helper("testContribTask", "clean", done);
  },

  helper: function(test) {
    var path = require("path");
    var result = path.existsSync("test/fixtures/output");

    test.equal(result, false, "should rm -rf a directory");
    test.done();
  }

};
