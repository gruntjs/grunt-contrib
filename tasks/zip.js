/**
* Task: zip
* Description: Zip files
* Dependencies: zipstream
* Contributor(s): @ctalkington
* Inspired by: @jzaefferer (jquery-validation)
*/
module.exports = function(grunt) {
  var _ = grunt.utils._,
      async = grunt.utils.async;

  grunt.registerMultiTask("zip", "Compress files into ZIP file.", function() {
    var files = this.data.files,
        options = grunt.helper("options", this, {level: 1}),
        done = this.async();

    async.forEachSeries(_.keys(files),function(dest,callback) {
      var src = files[dest],
          srcFiles = grunt.file.expandFiles(src),
          dest = grunt.template.process(dest);

      grunt.helper("zipstream", srcFiles, dest, options, function(err, written){
        grunt.log.writeln('File "' + dest + '" created (' + written + ' bytes written).');
        callback(err);
      });
    },function(err) {
      done(!err);
    });
  });

  grunt.registerHelper("zipstream", function(files, dest, options, callback) {
    var fs = require("fs"),
        zip = require("zipstream").createZip(options),
        destdir = _(dest).strLeftBack("/");

    if (require("path").existsSync(destdir) == false) {
      grunt.file.mkdir(destdir);
    }

    zip.pipe(fs.createWriteStream(dest));

    function addFile(){
      if (!files.length) {
        zip.finalize(function(written) {
          callback(false, written);
        })
        return;
      }

      var current = files.shift();
      grunt.verbose.writeln('Adding "' + current + '" to zip.');
      zip.addFile(fs.createReadStream(current), {name: current}, addFile);
    }

    addFile();
  });
};