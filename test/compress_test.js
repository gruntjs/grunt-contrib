var grunt = require("grunt"),
    _ = grunt.utils._;

grunt.loadTasks("../tasks");

exports.zip = {
  main: function(test) {
    function getSize(filename) {
      try {
        return require("fs").statSync(filename).size;
      } catch (e) {
        return 0;
      }
    }

    var expectations = {
      "fixtures/output/compress_test_files.zip": {
        test: 'size',
        expected: 314
      },
      "fixtures/output/compress_test_folders.zip": {
        test: 'size',
        expected: 974
      },
      "fixtures/output/compress_test_v0.3.9.zip": {
        test: 'size',
        expected: 974
      },
      "fixtures/output/compress_test_array.zip": {
        test: 'size',
        expected: 642
      },
      "fixtures/output/compress_test.tar": {
        test: 'size',
        expected: 2048
      },
      "fixtures/output/compress_test_v0.3.9.tgz": {
        test: 'size-greaterthan',
        expected: 300
      }
    };

    test.expect(_.size(expectations));

    _.each(expectations,function(properties, filename){
      if (properties.test == 'size') {
        var actual = getSize(filename);
        test.equal(properties.expected, actual, filename + " size should equal " + properties.expected + " bytes");
      } else if (properties.test == 'size-greaterthan') {
        var actual = getSize(filename) > properties.expected;
        test.equal(true, actual, filename + " should have a size > " + properties.expected + " bytes");
      }
    });

    test.done();
  }
};
