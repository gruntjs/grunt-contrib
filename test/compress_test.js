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
        expected: 1346
      },
      "fixtures/output/compress_test_array.zip": {
        test: 'size',
        expected: 642
      },
      "fixtures/output/compress_test_files_template.zip": {
        test: 'size',
        expected: 394
      },
      "fixtures/output/compress_test_v0.3.9.zip": {
        test: 'size',
        expected: 1346
      },
      "fixtures/output/compress_test_files.tar": {
        test: 'size',
        expected: 3072
      },
      "fixtures/output/compress_test_folders.tar": {
        test: 'size',
        expected: 10752
      },
      "fixtures/output/compress_test_array.tar": {
        test: 'size',
        expected: 5632
      },
      "fixtures/output/compress_test_files_template.tar": {
        test: 'size',
        expected: 3584
      },
      "fixtures/output/compress_test_v0.3.9.tar": {
        test: 'size',
        expected: 10752
      },
      "fixtures/output/compress_test_files.tgz": {
        test: 'size-greaterthan',
        expected: 200
      },
      "fixtures/output/compress_test_folders.tgz": {
        test: 'size-greaterthan',
        expected: 350
      },
      "fixtures/output/compress_test_array.tgz": {
        test: 'size-greaterthan',
        expected: 300
      },
      "fixtures/output/compress_test_files_template.tgz": {
        test: 'size-greaterthan',
        expected: 225
      },
      "fixtures/output/compress_test_v0.3.9.tgz": {
        test: 'size-greaterthan',
        expected: 300
      },
      "fixtures/output/compress_test_file.gz": {
        test: 'size',
        expected: 52
      },
      "fixtures/output/compress_test_file2.gz": {
        test: 'size',
        expected: 67
      }
    };

    test.expect(_.size(expectations));

    _.each(expectations,function(properties, filename){
      if (properties.test == 'size') {
        var actual = getSize(filename);
        test.equal(properties.expected, actual, filename + " size should equal " + properties.expected + " bytes");
      } else if (properties.test == 'size-greaterthan') {
        var actual = getSize(filename) > properties.expected;
        test.equal(true, actual, filename + " should exist and have a size > " + properties.expected + " bytes");
      }
    });

    test.done();
  }
};