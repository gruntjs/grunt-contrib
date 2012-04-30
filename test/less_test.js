var grunt = require('grunt');

exports.mincss = {

  setUp: function(done) {
    grunt.helper('testContribTask','less:compile',done);
  },

  helper: function(test) {

    var expect = "body {\n  color: #ffffff;\n}\n";
    var result = grunt.file.read('test/fixtures/output/less.css');

    test.expect(1);
    test.equal(expect,result,'should compile less, with the ability to handle imported files from alternate include paths');
    test.done();

  }

};
