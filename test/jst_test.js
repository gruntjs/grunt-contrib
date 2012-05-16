var grunt = require("grunt");

exports.jade = {

  setUp: function(done) {
    grunt.helper("testContribTask", "jst", done);
  },

  helper: function(test) {
     var expect = "this['JST'] = this['JST'] || {};\n\nthis['JST']['fixtures/jst/template.html'] = function(data) { return function (obj,_) {\nvar __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<head><title>', title ,'</title></head>\\n');}return __p.join('');\n}(data, _)};";
     var result = grunt.file.read("test/fixtures/output/jst.js");

     test.equal(expect, result, "should compile underscore templates to jst file");
     test.done();
  }

};


//this['JST'] = this['JST'] || {};\n\nthis['JST']['fixtures/jst/template.html'] = function(data) { return function (obj,_) {\nvar __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<head><title>', title ,'</title></head>\n');}return __p.join('');\n}(data, _)};' ==
