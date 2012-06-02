var grunt = require("grunt");

exports.coffee = {
  main: function(test) {
     var expect = "test";
     eval(grunt.file.read("fixtures/output/coffee.js"));
     var result = HelloWorld.test;

     test.expect(1)
     test.equal(expect, result, "should compile coffeescript to javascript");
     test.done();
  }
};