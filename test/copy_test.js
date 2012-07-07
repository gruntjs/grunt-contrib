var grunt = require("grunt");
var fs = require("fs");

grunt.loadTasks("../tasks");

exports.copy = {
  main: function(test) {
    test.expect(4);

    var expectA = ["test.css", "test.js"];
    var resultA = fs.readdirSync("fixtures/output/copy_test_files");
    test.deepEqual(expectA, resultA, "should copy several files");

    var expectB = ["folder_one", "folder_two", "test.css", "test.js"];
    var resultB = fs.readdirSync("fixtures/output/copy_test_v0.3.9");
    test.deepEqual(expectB, resultB, "should copy several folders and files (with template support)");

    var expectC = ["folder_one", "test.css", "test.js"];
    var resultC = fs.readdirSync("fixtures/output/copy_test_array");
    test.deepEqual(expectC, resultC, "should copy several folders and files (based on array)");

    var expectD = ["one.css", "one.js", "test.css", "test.js", "two.css", "two.js"];
    var resultD = fs.readdirSync("fixtures/output/copy_test_flatten");
    test.deepEqual(expectD, resultD, "should create a flat structure");

    test.done();
  }
};