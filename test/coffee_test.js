var grunt = require("grunt");

exports.coffee = {
  main: function(test) {
    test.expect(2);

    var expectA = "test";
    var sourceA = grunt.file.read("fixtures/output/coffee_basic.js");
    eval(sourceA);
    var resultA = HelloWorld.test;
    test.equal(expectA, resultA, "should compile coffeescript to javascript");

    var expectB = "hello";
    var sourceB = grunt.file.read("fixtures/output/coffee_inheritance.js");
    eval(sourceB);
    var resultB = Derived.test;
    test.equal(expectB, resultB, "should compile coffeescript to javascript with proper scope");

    test.done();
  }
};