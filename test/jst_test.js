var grunt = require("grunt");

exports.jade = {
  main: function(test) {
    test.expect(2);

    var expectA = "function";
    var sourceA = require("./fixtures/output/jst.js");
    var resultA = typeof sourceA["JST"]["fixtures/jst/template.html"];
    test.equal(expectA, resultA, "should compile underscore templates into JST");

    var expectB = "<head><title>test</title></head>";
    var sourceB = sourceA;
    var resultB = sourceB["JST"]["fixtures/jst/template.html"]({title: "test"});
    test.equal(expectB, resultB, "should output html when run");

    test.done();
  }
};