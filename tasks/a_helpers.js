/*
 *
 * Grunt Contrib Helpers
 * Description: helps make things consistent across tasks.
 * Contributor(s): @tkellen / @ctalkington
 *
 * This file must be loaded before other tasks to bridge support between grunt v0.3.9 and v0.4.0
 */

module.exports = function(grunt) {
  // Helper for util -> utils change in grunt v0.4.0
  grunt.registerHelper("utils", function(utility) {
    var utils = typeof grunt.utils !== 'undefined' ? grunt.utils : grunt.util;

    if (typeof utility !== "undefined") {
      return typeof utils[utility] !== "undefined" ? utils[utility] : false;
    } else {
      return utils;
    }
  });

  // Helper for consistent options key access across contrib tasks.
  grunt.registerHelper("options", function(data) {
    var _ = grunt.helper("utils","_"),
        namespace = data.nameArgs.split(":"),
        task = grunt.config(_.flatten([namespace, "options"])),
        global_subtask = namespace.length > 1 ? grunt.config(_.flatten(["options", namespace])) : {},
        global = grunt.config(["options", namespace[0]]);

    return _.defaults({}, task, global_subtask, global);
  });
};