var grunt = require('grunt');

exports.mincss = {

  setUp: function(done) {
    grunt.helper('testContribTask','mincss',done);
  },

  helper: function(test) {

    var expect = "body{margin:0;font-size:18px}a{color:#00f}h1{font-size:48px;font-weight:700}";
    var result = grunt.file.read('test/fixtures/output/style.css');

    test.expect(1);
    test.equal(expect,result,'should concat and minify and array of css files in order using clean-css');
    test.done();

  }

};
