var grunt = require("grunt");

grunt.loadTasks("../tasks");

exports.copy = {
  main: function(test) {
    var fs = require("fs");

    test.expect(3);

    var expectA = ["test.css","test.js"];
    var resultA = fs.readdirSync("fixtures/output/copy_test_files");
    test.equal(expectA, resultA, "should copy several files");

    var expectB = [
      "test.css",
      "test.js",
      "folder_one/one.css",
      "folder_one/one.js",
      "folder_two/two.css",
      "folder_two/two.js"
    ];
    var resultB = fs.readdirSync("fixtures/output/copy_test_folders");
    test.equal(expectB, resultB, "should copy several folders and files");

    var expectC = [
      "test.css",
      "test.js",
      "folder_one/one.css",
      "folder_one/one.js"
    ];
    var resultC = fs.readdirSync("fixtures/output/copy_test_array");
    test.equal(expectC, resultC, "should copy several folders and files (based on array)");

    test.done();
  }
};