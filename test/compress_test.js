var grunt = require("grunt");
var fs = require("fs");

var getSize = function(filename) {
  try {
    return fs.statSync(filename).size;
  } catch (e) {
    return 0;
  }
};

grunt.loadTasks("../tasks");

exports.compress = {
  zip: function(test) {
    test.expect(5);

    var expectA = 310;
    var resultA = getSize("fixtures/output/compress_test_files.zip");
    test.equal(expectA, resultA, "should compress files into zip");

    var expectB = 962;
    var resultB = getSize("fixtures/output/compress_test_v0.3.9.zip");
    test.equal(expectB, resultB, "should compress folders and their files into zip (with template support)");

    var expectD = 302;
    var resultD = getSize("fixtures/output/compress_test_files_template.zip");
    test.equal(expectD, resultD, "should compress files and folders into zip (grunt template in source)");

    var expectE = 874;
    var resultE = getSize("fixtures/output/compress_test_flatten.zip");
    test.equal(expectE, resultE, "should create a flat internal structure");

    var expectF = true;
    var resultF = getSize("fixtures/output/compress_test_outside_cwd.zip") >= 200;
    test.equal(expectF, resultF, "should compress file outside of working dir");

    test.done();
  },
  tar: function(test) {
    test.expect(5);

    var expectA = 3072;
    var resultA = getSize("fixtures/output/compress_test_files.tar");
    test.equal(expectA, resultA, "should add files into tar");

    var expectB = 8192;
    var resultB = getSize("fixtures/output/compress_test_v0.3.9.tar");
    test.equal(expectB, resultB, "should add folders and their files into tar (with template support)");

    var expectD = 3072;
    var resultD = getSize("fixtures/output/compress_test_files_template.tar");
    test.equal(expectD, resultD, "should add files and folders into tar (grunt template in source)");

    var expectE = 7168;
    var resultE = getSize("fixtures/output/compress_test_flatten.tar");
    test.equal(expectE, resultE, "should create a flat internal structure");

    var expectF = 2048;
    var resultF = getSize("fixtures/output/compress_test_outside_cwd.tar");
    test.equal(expectF, resultF, "should compress file outside of working dir");

    test.done();
  },
  tgz: function(test) {
    test.expect(5);

    var expectA = true;
    var resultA = getSize("fixtures/output/compress_test_files.tgz") >= 200;
    test.equal(expectA, resultA, "should compress files into tar");

    var expectB = true;
    var resultB = getSize("fixtures/output/compress_test_v0.3.9.tgz") >= 350;
    test.equal(expectB, resultB, "should compress folders and their files into tgz (with template support)");

    var expectD = true;
    var resultD = getSize("fixtures/output/compress_test_files_template.tgz") >= 200;
    test.equal(expectD, resultD, "should compress files and folders into tgz (grunt template in source)");

    var expectE = true;
    var resultE = getSize("fixtures/output/compress_test_flatten.tgz") >= 320;
    test.equal(expectE, resultE, "should create a flat internal structure");

    var expectF = true;
    var resultF = getSize("fixtures/output/compress_test_outside_cwd.tgz") >= 175;
    test.equal(expectF, resultF, "should compress file outside of working dir");

    test.done();
  },
  gzip: function(test) {
    test.expect(2);

    var expectA = 52;
    var resultA = getSize("fixtures/output/compress_test_file.gz");
    test.equal(expectA, resultA, "should gzip file");

    var expectB = 67;
    var resultB = getSize("fixtures/output/compress_test_file2.gz");
    test.equal(expectB, resultB, "should gzip another file (multiple dest:source pairs)");

    test.done();
  }
};