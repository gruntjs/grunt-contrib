/**
* Task: copy
* Description: Copy files into another directory
* Contributor: @ctalkington
*/

module.exports = function(grunt) {
  var _ = grunt.utils._;

  grunt.registerMultiTask("copy", "Copy files into another directory.", function() {
    var options = grunt.helper("options", this, {basePath: null, stripString: null});
    var data = this.data;

    if (options.basePath !== null) {
      options.basePath = _(options.basePath).rtrim("/");
    }

    Object.keys(data.files).forEach(function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);
      dest = _(dest).rtrim("/");

      if (require("path").existsSync(dest) === false) {
        grunt.file.mkdir(dest);
      }

      srcFiles.forEach(function(srcFile) {
        var filename = _(srcFile).strRightBack("/");
        var relative = _(srcFile).strLeftBack("/");

        if (options.basePath !== null) {
          relative = _(relative).strRightBack(options.basePath);
        }

        if (options.stripString !== null) {
          if (_.isArray(options.stripString)) {
            options.stripString.forEach(function(stripString) {
              filename = filename.replace(stripString, "");
            });
          } else {
            filename = filename.replace(options.stripString, "");
          }
        }

        grunt.file.copy(srcFile, dest + "/" + relative + "/" + filename);
      });
    });
  });
};