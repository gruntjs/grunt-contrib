/*
 *
 * Task: clean
 * Description: Clear files and folders.
 * Dependencies: rimraf
 * Contributor(s): @tbranyen / @tkellen
 *
 */

module.exports = function(grunt) {

  var rimraf = require("rimraf");
  var log = grunt.log;

  grunt.registerTask("clean",
    "Clear files and folders", function() {

    var files = grunt.config("clean");

    files.forEach(function(file) {
      grunt.helper("clean", file);
    });

    return grunt.errors ? false : true;
  });

  grunt.registerHelper("clean", function(path) {
    log.writeln("Removing: " + path);
    rimraf.sync(path);
  });

};
