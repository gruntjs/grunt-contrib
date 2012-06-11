var grunt = require("grunt"),
    _ = grunt.utils._;

grunt.loadTasks("../tasks");

exports.copy = {
  main: function(test) {
    var fs = require("fs");

    var expectations = {
      "fixtures/output/copy_test_files": ['test.css','test.js'],
      "fixtures/output/copy_test_folders": [
        'test.css',
        'test.js',
        'folder_one/one.css',
        'folder_one/one.js',
        'folder_two/two.css',
        'folder_two/two.js'
      ],
      "fixtures/output/copy_test_v0.3.9": [
        'test.css',
        'test.js',
        'folder_one/one.css',
        'folder_one/one.js',
        'folder_two/two.css',
        'folder_two/two.js'
      ],
      "fixtures/output/copy_test_array": [
        'test.css',
        'test.js',
        'folder_one/one.css',
        'folder_one/one.js'
      ]
    };

    test.expect(_.size(expectations));

    _.each(expectations,function(expected, directory){
      var actual = fs.readdirSync(directory);
      test.equal(actual,expected, directory + " should contain " + _.size(expected) + " files");
    });

    test.done();
  }
};