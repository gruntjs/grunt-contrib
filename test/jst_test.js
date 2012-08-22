var grunt = require("grunt");

exports.jade = {
  main: function(test) {
    test.expect(1);

    var expectA = "this['JST'] = this['JST'] || {};\n\nthis['JST']['fixtures/jst/template.html'] = function(obj){obj||(obj={});var __t,__p='',__e=_.escape,__d=obj.obj||obj;__p += '<head><title>'+((__t=( obj.title ))==null?'':__t)+'</title></head>';return __p};";
    var resultA = grunt.file.read("fixtures/output/jst.js");
    test.equal(expectA, resultA, "should compile underscore templates into JST");

    test.done();
  }
};