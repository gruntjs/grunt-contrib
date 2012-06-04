/*
 *
 * Task: jade
 * Description: Compile Jade templates to HTML
 * Dependencies: jade, path
 * Contributor(s): @errcw / @conradz
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._;

  grunt.registerMultiTask("jade", "Compile Jade templates into HTML.", function() {
    var options = grunt.helper("options", this),
        path = require("path"),
        files = grunt.file.expand(this.file.src),
        dest = this.file.dest,
        data = options.data;

    // add template process for grunt templates
    if (_.isEmpty(data) == false) {
      _.each(data,function(value,key) {
        if (_.isString(value)) {
          data[key] = grunt.template.process(value);
        }
      });
    }

    files.forEach(function (filename) {
      var opts = _.extend({filename: filename}, options),
          html = grunt.helper("jade", grunt.file.read(filename), opts, data),
          basename = path.basename(filename),
          extname = path.extname(filename),
          htmlname = basename.substring(0, basename.length - extname.length) + ".html",
          outpath = path.join(dest, htmlname);

      grunt.file.write(outpath, html);
      grunt.log.writeln("File '" + outpath + "' created.");
    });
  });

  grunt.registerHelper("jade", function(src, options, data) {
    return require("jade").compile(src, options)(data);
  });
};