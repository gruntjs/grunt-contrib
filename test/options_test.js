var grunt = require("grunt");

exports.options = {
  main: function(test) {
    var options = grunt.helper("options", { nameArgs: 'task:subtask' });

    test.expect(3);
    test.equal('set', options.global, "should get params from global options.task key");
    test.equal('subtask', options.setting, "should let params from global options.task.subtask override options.task");
    test.equal('override all', options.param, "should allow task options key to override all others");
    test.done();
  }
};