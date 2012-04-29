/*
 *
 * Task: jade
 * Description: Compile Jade templates to HTML
 * Dependencies: jade, path
 * Contributor(s): @errcw
 *
 */

module.exports = function(grunt) {

  var file = grunt.file;
  var log = grunt.log;
  var config = grunt.config;

  var _ = grunt.utils._;

  grunt.registerMultiTask("jade",
    "Compile Jade templates into HTML.", function() {
    var path = require("path");

    var files = this.data;
    var dest = this.target;
    var options = config("options.jade") || {};

    file.expand(files).forEach(function (filename) {
      var opts = _.extend(options, {filename: filename});
      var html = grunt.helper("jade", file.read(filename), opts);

      var basename = path.basename(filename);
      var extname = path.extname(filename);
      var htmlname = basename.substring(0, basename.length - extname.length) + ".html";
      var outpath = path.join(dest, htmlname);
      file.write(outpath, html);

      log.writeln("File '" + outpath + "' created.");
    });
  });

  grunt.registerHelper("jade", function(src, options) {
    var jade = require("jade");
    var jadeFn = jade.compile(src, options);
    return jadeFn();
  });

};
