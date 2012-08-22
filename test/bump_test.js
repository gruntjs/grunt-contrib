var grunt = require("grunt");

grunt.loadTasks("../tasks");

exports.bump = function(test) {
  test.expect(3);

  test.equal(grunt.helper("bump_version", "0.0.1", "patch"), "0.0.2");
  test.equal(grunt.helper("bump_version", "1.0.1", "minor"), "1.1.0");
  test.equal(grunt.helper("bump_version", "1.5.1", "major"), "2.0.0");

  test.done();
};