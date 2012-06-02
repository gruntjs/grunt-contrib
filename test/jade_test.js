var grunt = require("grunt");

exports.jade = {
  main: function(test) {
     var expectSimple = '<div id="test" class="test"><span id="data">data</span><div>testing</div></div>'
       , resultSimple = grunt.file.read("fixtures/output/jade.html")
       , expectInclude = '<html><head><title>TEST</title></head><body></body></html><p>hello jade test</p>'
       , resultInclude = grunt.file.read("fixtures/output/jadeInclude.html")
       , expectTemplate = '<div>' + grunt.template.today("yyyy") + '</div>'
       , resultTemplate = grunt.file.read("fixtures/output/jadeTemplate.html")

     test.expect(3);
     test.equal(expectSimple, resultSimple, "should compile jade templates to html");
     test.equal(expectInclude, resultInclude, "should compile jade templates to html with an include");
     test.equal(expectTemplate, resultTemplate, "should compile jade templates to html with grunt template support");
     test.done();
  }
};