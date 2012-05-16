/*
 *
 * Task: jade
 * Description: Compile Jade templates to HTML
 * Dependencies: jade, path
 * Contributor(s): @errcw / @conradz
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

    var files = this.file.src;
    var dest = this.file.dest;
    var options = config("options.jade") || {};
    // Data is specified per target so the same template
    // can generate multiple outputs depending on the data
    var data = this.data.data;

    file.expand(files).forEach(function (filename) {
      var opts = _.extend({filename: filename}, options);
      var html = grunt.helper("jade", file.read(filename), opts, data);

      var basename = path.basename(filename);
      var extname = path.extname(filename);
      var htmlname = basename.substring(0, basename.length - extname.length) + ".html";
      var outpath = path.join(dest, htmlname);
      file.write(outpath, html);

      log.writeln("File '" + outpath + "' created.");
    });
  });

  grunt.registerHelper("jade", function(src, options, data) {
    var jade = require("jade");
    var jadeFn = jade.compile(src, options);
    return jadeFn(data);
  });

};
