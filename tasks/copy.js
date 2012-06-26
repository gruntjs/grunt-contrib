/**
* Task: copy
* Description: Copy files into another directory
* Contributor(s): @ctalkington
*/

module.exports = function(grunt) {
  grunt.registerMultiTask("copy", "Copy files into another directory.", function() {
    var options = grunt.helper("options", this);
    var data = this.data;

    Object.keys(data.files).forEach(function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);
      var dest = grunt.template.process(dest);


    });
  });
};