var grunt = require("grunt");

grunt.initConfig({
  options: {
    task: {
      param: 'default',
      setting: 'set',
      global: 'set',
      subtask: {
        setting: 'subtask'
      }
    }
  },
  task: {
    subtask: {
      options: {
        param: 'override all'
      }
    }
  }
});

grunt.loadTasks("../tasks");

exports.options = {

  helper: function(test) {
    var options = grunt.helper("options", { nameArgs: 'task:subtask' });

    test.expect(3);
    test.equal('set', options.global, "should get params from global options.task key");
    test.equal('subtask', options.setting, "should let params from global options.task.subtask override options.task");
    test.equal('override all', options.param, "should allow task options key to override all others");
    test.done();
  }

};