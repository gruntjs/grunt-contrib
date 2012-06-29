/**
* Task: copy
* Description: Copy files into another directory
* Contributor: @ctalkington
*/

module.exports = function(grunt) {
  var _ = grunt.utils._;
  var kindOf = grunt.utils.kindOf;

  grunt.registerMultiTask("copy", "Copy files into another directory.", function() {
    var options = grunt.helper("options", this, {basePath: null, stripString: null});
    var data = this.data;

    var basePaths = [];
    var stripStrings = [];

    if (options.basePath !== null) {
      if (kindOf(options.basePath) === "array") {
        options.basePath.forEach(function(path) {
          basePaths.push(_(path).trim("/"));
        });
      } else {
        basePaths.push(_(options.basePath).trim("/"));
      }
    }

    if (options.stripString !== null) {
      if (kindOf(options.stripString) === "array") {
        options.stripString.forEach(function(string) {
          stripStrings.push(string);
        });
      } else {
        stripStrings.push(options.stripString);
      }
    }

    Object.keys(data.files).forEach(function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);
      dest = _(dest).trim("/");

      if (require("path").existsSync(dest) === false) {
        grunt.file.mkdir(dest);
      }

      var count = 0;

      srcFiles.forEach(function(srcFile) {
        var filename = _(srcFile).strRightBack("/");
        var relative = _(srcFile).strLeftBack("/");

        if (relative === filename) {
          relative = "";
        }

        basePaths.forEach(function(path) {
          if (path.length > 1) {
            relative = _(relative).strRightBack(path);
            relative = _(relative).trim("/");
          }
        });

        stripStrings.forEach(function(string) {
          filename = filename.replace(string, "");
        });

        // handle paths outside of grunts working dir
        relative = relative.replace(/\.\.\//g, "");

        if (relative.length > 0 ) {
          relative = relative + "/";
        }

        grunt.file.copy(srcFile, dest + "/" + relative + filename);

        count++;
      });

      grunt.log.writeln("Copied " + count + ' file(s) to "'  + dest + '".');
    });
  });
};