/*
 *
 * Task: jade
 * Description: Compile Jade templates to HTML
 * Dependencies: jade, path
 * Contributor(s): @errcw / @conradz
 *
 */

module.exports = function(grunt) {

  var file = grunt.file,
       log = grunt.log,
         _ = grunt.utils._;

  grunt.registerMultiTask("jade",
    "Compile Jade templates into HTML.", function() {

    var options = grunt.helper("options", this),
           path = require("path"),
          files = this.file.src,
           dest = this.file.dest,
           data = options.data;

    file.expand(files).forEach(function (filename) {

      var opts = _.extend(options, {filename: filename}),
          html = grunt.helper("jade", file.read(filename), opts, data),
      basename = path.basename(filename),
       extname = path.extname(filename),
      htmlname = basename.substring(0, basename.length - extname.length) + ".html",
       outpath = path.join(dest, htmlname);

      file.write(outpath, html);

      log.writeln("File '" + outpath + "' created.");
    });
  });

  grunt.registerHelper("jade", function(src, options, data) {

    var jade = require("jade"),
      jadeFn = jade.compile(src, options);

    return jadeFn(data);
  });

};
