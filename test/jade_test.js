var grunt = require("grunt");

exports.jade = {

  setUp: function(done) {
    grunt.helper("testContribTask", "jade", done);
  },

  helper: function(test) {
     var expect = '<div id="test" class="test"><span id="data">data</span></div>';
     var result = grunt.file.read("test/fixtures/output/jade.html");
 
     test.equal(expect, result, "should compile jade templates to html");
     test.done();
  }

};
