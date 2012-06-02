
module.exports = function(grunt) {

  var _ = grunt.utils._;

  // Helper for consistent options key access across contrib tasks.
  grunt.registerHelper("options", function(data) {
    var namespace = data.nameArgs.split(":"),
             task = grunt.config(_.flatten([namespace, "options"])),
   global_subtask = namespace.length > 1 ? grunt.config(_.flatten(["options", namespace])) : {},
           global = grunt.config(["options", namespace[0]]);

    return _.defaults({}, task, global_subtask, global);
  });

};
