/*
 *
 * Task: jst
 * Description: Compile underscore templates to JST file
 * Dependencies: underscore
 * Contributor(s): @tbranyen / @ctalkington
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._;
  var async = grunt.utils.async;

  grunt.registerMultiTask("jst", "Compile underscore templates to JST file", function() {
    var options = grunt.helper("options", this, {namespace: "JST", templateSettings: {}});
    var data = this.data;
    var done = this.async();

    async.forEachSeries(_.keys(data.files), function(dest, next) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);
      var dest = grunt.template.process(dest);

      grunt.helper("jst", srcFiles, options.namespace, options.templateSettings, function(error, script) {
        if (error === null) {
          grunt.file.write(dest, script);
          grunt.log.writeln("File '" + dest + "' created.");
        } else {
          grunt.log.error(error);
          grunt.fail.warn("Underscore template failed to compile.");
        }

        next();
      });
    }, function() {
      done();
    });
  });

  grunt.registerHelper("jst", function(files, namespace, templateSettings, callback) {
    // Pulled from underscore 1.2.4
    function underscoreTemplating(str) {
        // Merge in the templateSettings that may be passed
        var c  = _.extend({}, _.templateSettings, templateSettings) || _.templateSettings;

        var tmpl = '' +
          'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
          'with(obj||{}){__p.push(\'' +
          str.replace(/\\/g, '\\\\')
             .replace(/'/g, "\\'")
             .replace(c.escape || noMatch, function(match, code) {
               return "',_.escape(" + code.replace(/\\'/g, "'") + "),'";
             })
             .replace(c.interpolate || noMatch, function(match, code) {
               return "'," + code.replace(/\\'/g, "'") + ",'";
             })
             .replace(c.evaluate || noMatch, function(match, code) {
               return "');" + code.replace(/\\'/g, "'")
                                  .replace(/[\r\n\t]/g, ' ')
                                  .replace(/\\\\/g, '\\') + ";__p.push('";
             })
             .replace(/\r/g, '\\r')
             .replace(/\n/g, '\\n')
             .replace(/\t/g, '\\t')
             + "');}return __p.join('');";

        return new Function('obj', '_', tmpl).toString();
    };

    namespace = "this['" + namespace + "']";

    var results = [];
    results.push(namespace + " = " + namespace + " || {};")

    try {
      _.each(files, function(filepath) {
        var handleSource = grunt.file.read(filepath);
        var handleOutput = "function(data) { return " + underscoreTemplating(handleSource).replace("anonymous", "") + "(data, _)" + "};";
        results.push(namespace + "['" + filepath + "'] = " + handleOutput);
      });
      var result = results.join("\n\n");
      callback(null, result);
    } catch (e) {
      callback(e, null);
    }
  });
};