var grunt = require("grunt");

exports.handlebars = {
  main: function(test) {
    test.expect(1);

    var expectA = "function";
    var sourceA = require("./fixtures/output/handlebars.js");
    var resultA = typeof sourceA["JST"]["fixtures/handlebars/one.handlebar"];
    test.equal(expectA, resultA, "should compile handlebars template into JST");

    test.done();
  }
};