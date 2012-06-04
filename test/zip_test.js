var grunt = require("grunt"),
    _ = grunt.utils._;

grunt.loadTasks("../tasks");

exports.zip = {
  main: function(test) {
    function getSize(filename, callback) {
      try {
        var stat = require("fs").statSync(filename);
        callback(null, stat.size);
      } catch (err) {
        callback(err, 0);
      }
    }



    var expectations = {
      "fixtures/output/zip_test_files.zip": 362,
      "fixtures/output/zip_test_folders.zip": 1118,
      "fixtures/output/zip_test_v0.3.9.zip": 1118,
      "fixtures/output/zip_test_array.zip": 738
    };

    test.expect(_.size(expectations));

    _.each(expectations,function(expected, filename){
      getSize(filename,function(err,size){
        test.equal(expected, size, filename + " filesize should equal " + expected);
      });
    });

    test.done();
  }
};