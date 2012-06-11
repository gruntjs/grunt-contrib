/**
* Task: copy
* Description: Copy files into another directory
* Contributor(s): @ctalkington
*/
module.exports = function(grunt) {
  var _ = grunt.utils._,
      async = grunt.utils.async;

  grunt.registerMultiTask("copy", "Copy files into another directory.", function() {
    var files = this.data.files,
        options = grunt.helper("options", this),
        done = this.async();

    async.forEachSeries(_.keys(files),function(dest,next) {
      var src = files[dest],
          srcFiles = grunt.file.expandFiles(src),
          dest = grunt.template.process(dest);

      // Copy logic here, then next();
    },function() {
      done();
    });
  });
};