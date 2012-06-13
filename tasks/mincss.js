/*
 *
 * Task: mincss
 * Description: Minify CSS files
 * Dependencies: clean-css
 * Contributor(s): @tbranyen, @thomasaboyt
 *
 */

module.exports = function(grunt) {
  grunt.registerMultiTask("mincss", "Minify CSS files", function() {
    var files = grunt.file.expand(this.data),
          max = grunt.helper('concat', files),
          min = grunt.helper('mincss', max);

    grunt.file.write(this.target, min);

    // Fail task if errors were logged.
    if (grunt.errors) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln("File \"" + this.target + "\" created.");
    grunt.helper('min_max_info', min, max);
  });

  grunt.registerHelper("mincss", function(css_string) {
    // Minify and combine all CSS
    return require("clean-css").process(css_string);
  });
};
