var grunt = require("grunt");

exports.coffee = {
  main: function(test) {
     var expectSimple = "test";
     eval(grunt.file.read("fixtures/output/coffee_basic.js"));
     var resultSimple = HelloWorld.test;

     var expectInheritance = "hello";
     eval(grunt.file.read("fixtures/output/coffee_inheritance.js"));
     var resultInheritance = Derived.test;

     test.expect(2);
     test.equal(expectSimple, resultSimple, "should compile coffeescript to javascript");
     test.equal(expectInheritance, resultInheritance, "should compile coffeescript to javascript with proper scope");
     test.done();
  }
};
