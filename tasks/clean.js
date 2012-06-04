/*
 *
 * Task: clean
 * Description: Clear files and folders.
 * Dependencies: rimraf
 * Contributor(s): @tbranyen / @tkellen
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._,
      rimraf = require("rimraf");

  grunt.registerMultiTask("clean","Clear files and folders",function() {
    var config = grunt.config.get('clean'),
        files = this.data;

    // check if we have a valid config & an invalid target specific config
    if (_.isArray(config) === true && _.isArray(this.data) === false) {
      files = config;
    }

    files.forEach(function(file) {
      grunt.helper("clean", file);
    });

    return grunt.errors ? false : true;
  });

  grunt.registerHelper("clean", function(path) {
    grunt.log.writeln("Removing: " + path);
    rimraf.sync(path);
  });
};