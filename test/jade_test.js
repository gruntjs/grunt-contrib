var grunt = require("grunt"),
    _ = grunt.utils._;

exports.jade = {
  main: function(test) {
    var expectations = {
      "fixtures/output/jade.html": {
        expected: '<div id="test" class="test"><span id="data">data</span><div>testing</div></div>',
        message: "should compile jade templates to html"
      },
      "fixtures/output/jade2.html": {
        expected: '<div id="test" class="test"><span id="data">data</span><div>testing 2</div></div>',
        message: "should compile jade templates to html (multiple files support)"
      },
      "fixtures/output/jadeInclude.html": {
        expected: '<html><head><title>TEST</title></head><body></body></html><p>hello jade test</p>',
        message: "should compile jade templates to html with an include"
      },
      "fixtures/output/jadeTemplate.html": {
        expected: '<div>' + grunt.template.today("yyyy") + '</div>',
        message: "should compile jade templates to html with grunt template support"
      }
    };

    test.expect(_.size(expectations));

    _.each(expectations,function(properties, filename){
      test.equal(properties.expected, grunt.file.read(filename), properties.message);
    });

    test.done();
  }
};