var grunt = require("grunt");

exports.jade = {
  main: function(test) {
     var expect = "this['JST'] = this['JST'] || {};\n\nthis['JST']['fixtures/jst/template.html'] = function(data) { return function (obj,_) {\nvar __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<head><title>', title ,'</title></head>');}return __p.join('');\n}(data, _)};";
     var result = grunt.file.read("fixtures/output/jst.js");

     test.expect(1);
     test.equal(expect, result, "should compile underscore templates to jst file");
     test.done();
  }
};