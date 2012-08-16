var grunt = require("grunt");
var fs = require("fs");

grunt.loadTasks("../tasks");

exports.copy = {
  main: function(test) {
    test.expect(5);

    var expectA = ["test.css", "test.js"].sort();
    var resultA = fs.readdirSync("fixtures/output/copy_test_files").sort();
    test.deepEqual(expectA, resultA, "should copy several files");

    var expectB = ["folder_one", "folder_two", "test.css", "test.js"].sort();
    var resultB = fs.readdirSync("fixtures/output/copy_test_v0.3.9").sort();
    test.deepEqual(expectB, resultB, "should copy several folders and files (with template support)");

    var expectD = ["one.css", "one.js", "test.css", "test.js", "two.css", "two.js"].sort();
    var resultD = fs.readdirSync("fixtures/output/copy_test_flatten").sort();
    test.deepEqual(expectD, resultD, "should create a flat structure");

    var expectE = ["grunt-contrib"].sort();
    var resultE = fs.readdirSync("fixtures/output/copy_test_outside_cwd").sort();
    test.deepEqual(expectE, resultE, "should copy file outside of working dir");

    var expectF = [".hidden", "test.css", "test.js"].sort();
    var resultF = fs.readdirSync("fixtures/output/copy_minimatch").sort();
    test.deepEqual(expectF, resultF, "should allow for minimatch dot option");

    test.done();
  }
};