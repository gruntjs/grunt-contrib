/*
 *
 * Task: clean
 * Description: Clear files and folders.
 * Dependencies: rimraf
 * Contributor(s): @tbranyen / @tkellen / @ctalkington
 *
 */

module.exports = function(grunt) {
  var _ = grunt.utils._,
      async = grunt.utils.async;

  grunt.registerMultiTask("clean", "Clear files and folders", function() {
    var badPaths = ["*", "/", "\\"],
        config = grunt.config.get("clean"),
        paths = this.data,
        validPaths = [],
        done = this.async();

    // check if we have a valid config & an invalid target specific config
    if (_.isArray(config) === true && _.isArray(paths) === false) {
      paths = config;
    } else if (_.isArray(paths) === false){
      paths = [];
    }

    _.each(paths, function(path) {
      if (_.isString(path)) {
        path = grunt.template.process(path);

        if (_.isEmpty(path) === false && _.include(badPaths, path) === false) {
          validPaths.push(path);
        }
      }
    });

    if (_.isEmpty(validPaths)) {
      grunt.fatal("Clean should have an array of paths by now. Too dangerous to continue.");
    }

    async.forEachSeries(validPaths, function(path, next) {
      grunt.helper("clean", path, function(error) {
        if (error === null) {
          grunt.log.writeln('Cleaned "' + path + '"');
        } else if (error === undefined) {
          grunt.log.writeln('Cleaned "' + path + '" (already clean or missing)');
        } else {
          grunt.log.error(error);
          grunt.fail.warn("Clean operation failed.");
        }

        next();
      });
    }, function() {
      done();
    });
  });

  grunt.registerHelper("clean", function(path, callback) {
    grunt.verbose.writeln('Cleaning "' + path + '"');

    if (callback === undefined) {
      require("rimraf").sync(path);
      grunt.log.writeln('Cleaned "' + path + '"');
    } else {
      require("rimraf")(path, function(error) {
        callback(error);
      });
    }
  });
};