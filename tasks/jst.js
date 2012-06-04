/*
 *
 * Task: jst
 * Description: Compile underscore templates to JST file
 * Dependencies: underscore
 * Contributor(s): @tbranyen
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._;

  grunt.registerMultiTask("jst", "Compile underscore templates to JST file", function() {
    var options = grunt.helper("options", this),
        namespace = options.namespace || "JST",
        settings = options.templateSettings || null,
        files = grunt.file.expand(this.data);

    // Create JST file.
    grunt.file.write(this.target, grunt.helper("jst", files, namespace, settings));

    // Fail task if errors were logged.
    if (grunt.errors) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln("File \"" + this.target + "\" created.");
  });

  grunt.registerHelper("jst", function(files, namespace, templateSettings) {
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

    // Comes out looking like this["JST"] = this["JST"] || {};
    var contents = namespace + " = " + namespace + " || {};\n\n";

    // Compile the template and get the function source
    contents += files ? files.map(function(filepath) {
      var templateFunction = [
        "function(data) { ",

          "return ",
          underscoreTemplating(grunt.file.read(filepath)).replace("anonymous", ""),
          "(data, _)",

        "};"].join("");

      return namespace + "['" + filepath + "'] = " + templateFunction;
    }).join("\n\n") : "";

    return contents;
  });
};