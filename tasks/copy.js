/**
 * Task: copy
 * Description: Copy files into another directory
 * Contributor: @ctalkington
 */

module.exports = function(grunt) {
  var path = require("path");

  var _ = grunt.utils._;
  var kindOf = grunt.utils.kindOf;

  // TODO: ditch this when grunt v0.4 is released
  grunt.file.exists = grunt.file.exists || fs.existsSync || path.existsSync;

  grunt.registerMultiTask("copy", "Copy files into another directory.", function() {
    var options = grunt.helper("options", this, {
      basePath: null,
      flatten: false,
      processName: false,
      processContent: false,
      processContentExclude: []
    });

    var data = this.data;

    var copyOptions = {
      process: options.processContent,
      noProcess: options.processContentExclude
    };

    if (options.basePath !== null) {
      options.basePath = path.normalize(options.basePath);
      options.basePath = _(options.basePath).trim(path.sep);
    }

    grunt.verbose.writeflags(options, "Options");

    Object.keys(data.files).forEach(function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);

      if (grunt.file.exists(dest) === false) {
        grunt.file.mkdir(dest);
      }

      var filename = "";
      var relative = "";
      var destFile = "";

      grunt.log.write("Copying file(s)" + ' to "' + dest + '"...');

      srcFiles.forEach(function(srcFile) {
        filename = path.basename(srcFile);
        relative = path.dirname(srcFile);
        relative = path.normalize(relative);

        if (options.flatten) {
          relative = "";
        } else if (options.basePath !== null && options.basePath.length > 1) {
          relative = _(relative).chain().strRightBack(options.basePath).trim(path.sep).value();
        }

        if (options.processName && kindOf(options.processName) === "function") {
          filename = options.processName(filename);
        }

        // make paths outside grunts working dir relative
        relative = relative.replace(/\.\.(\/|\\)/g, "");

        destFile = path.join(dest, relative, filename);

        grunt.file.copy(srcFile, destFile, copyOptions);
      });

      grunt.log.ok();
    });
  });
};