/**
* Task: compress
* Description: Compress files
* Dependencies: zipstream
* Contributor(s): @ctalkington / @tkellen
* Inspired by: @jzaefferer (jquery-validation)
*/
module.exports = function(grunt) {
  var _ = grunt.utils._,
      async = grunt.utils.async;

  grunt.registerMultiTask("compress", "Compress files.", function() {
    var files = this.data.files,
        options = grunt.helper("options", this, {level: 1}),
        supported = ['zip', 'gzip'],
        done = this.async();


    async.forEachSeries(_.keys(files),function(dest, callback) {
      var src = files[dest],
          srcFiles = grunt.file.expandFiles(src),
          dest = grunt.template.process(dest);

      if(!_.include(supported,options.type)) {
        grunt.log.error('Compression type '+options.type+' not supported.');
        done();
        return;
      }

      if(options.type === 'gzip') {
        if(srcFiles.length > 1) {
          // eventually it'd be nice to support tar files so we can do this
          grunt.log.error('Cannot specify multiple input files for gzip compression, aborting.');
          done();
          return;
        }
        srcFiles = srcFiles[0];
      }

      grunt.helper(options.type, srcFiles, dest, options, function(err, written) {
        grunt.log.writeln('File "' + dest + '" created (' + written + ' bytes written).');
        callback(err);
      });

    },function(err) {
      done(!err);
    });
  });

  grunt.registerHelper("zip", function(files, dest, options, callback) {
    var fs = require("fs"),
        zip = require("zipstream").createZip(options),
        destdir = _(dest).strLeftBack("/");

    if (require("path").existsSync(destdir) === false) {
      grunt.file.mkdir(destdir);
    }

    zip.pipe(fs.createWriteStream(dest));

    function addFile(){
      if (!files.length) {
        zip.finalize(function(written) {
          callback(false, written);
        });
        return;
      }

      var current = files.shift();
      grunt.verbose.writeln('Adding "' + current + '" to zip.');
      zip.addFile(fs.createReadStream(current), {name: current}, addFile);
    }

    addFile();
  });

  grunt.registerHelper("gzip", function(file, dest, options, callback) {
    var fs = require("fs"),
        zlib = require("zlib"),
        destdir = _(dest).strLeftBack("/");

    if (require("path").existsSync(destdir) === false) {
      grunt.file.mkdir(destdir);
    }

    zlib.gzip(grunt.file.read(file), function(err, result) {
      grunt.file.write(dest, result);
      callback(false, result.length);
    });

  });

};
