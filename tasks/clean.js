/*
 *
 * Task: clean
 * Description: Clear files and folders.
 * Dependencies: rimraf
 * Contributor(s): @tbranyen / @tkellen
 *
 */

module.exports = function(grunt) {

  var rimraf = require("rimraf"),
         log = grunt.log;

  grunt.registerMultiTask("clean",
    "Clear files and folders", function() {

    var config = grunt.config.get('clean'),
         files = this.data,
       isArray = typeof grunt.utils !== 'undefined' ? grunt.utils._.isArray : grunt.util._.isArray;

    // check if we have a valid config & an invalid target specific config
    if (isArray(config) === true && isArray(this.data) === false) {
      files = config;
    }

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
