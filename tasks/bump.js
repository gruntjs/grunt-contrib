/**
 * Task: bump
 * Description: Increase version number.
 * Dependencies: none
 * Contributor: @vojtajina
 */

module.exports = function(grunt) {
  "use strict";

  grunt.registerTask("bump", "Increment version number", function(versionType) {
    var pkg = grunt.file.readJSON("package.json");

    pkg.version = grunt.helper("bump_version", pkg.version, versionType || "patch");

    grunt.file.write("package.json", JSON.stringify(pkg, null, "  "));
    grunt.log.ok("Version bumped to " + pkg.version);
  });


  grunt.registerHelper("bump_version", function(version, versionType) {
    var type = {
      patch: 2,
      minor: 1,
      major: 0
    };

    var parts = version.split(".");
    var idx = type[versionType || "patch"];

    parts[idx] = parseInt(parts[idx], 10) + 1;
    while(++idx < parts.length) {
      parts[idx] = 0;
    }
    return parts.join(".");
  });
};