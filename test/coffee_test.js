var grunt = require("grunt");

exports.coffee = {

  setUp: function(done) {
    grunt.helper("testContribTask", "coffee:compile", done);
  },

  helper: function(test) {
     var expect = "test";
     eval(grunt.file.read("test/fixtures/output/coffee.js"));
     var result = HelloWorld.test;
 
     test.equal(expect, result, "should compile coffeescript to javascript");
     test.done();
  }

};
