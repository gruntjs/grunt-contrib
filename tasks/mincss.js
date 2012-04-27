/*
 *
 * Task: mincss
 * Description: Minify CSS files
 * Dependencies: clean-css
 * Contributor(s): @tbranyen, @thomasaboyt
 *
 */

module.exports = function(grunt) {

  var log = grunt.log;
  var file = grunt.file;

  grunt.registerMultiTask("mincss",
    "Minify CSS files", function() {

    // Minify CSS.
    var files = file.expand(this.data);

    var max = grunt.helper('concat', files);
    var min = grunt.helper('mincss', max);
    file.write(this.target, min);

    // Fail task if errors were logged.
    if (grunt.errors) { return false; }

    // Otherwise, print a success message.
    log.writeln("File \"" + this.target + "\" created.");
    grunt.helper('min_max_info', min, max);
  });

  //grunt.registerHelper('')

  grunt.registerHelper("mincss", function(css_string) {
    var cleanCSS = require("clean-css");

    // Minify and combine all CSS
    return cleanCSS.process(css_string);
  });

};
