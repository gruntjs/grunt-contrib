/**
* Task: compress
* Description: Compress files
* Dependencies: zipstream / tar / fstream
* Contributor(s): @ctalkington / @tkellen
* Inspired by: @jzaefferer (jquery-validation)
*/
module.exports = function(grunt) {
  var _ = grunt.utils._,
      async = grunt.utils.async;

  grunt.registerMultiTask("compress", "Compress files.", function() {
    var files = this.data.files,
        options = grunt.helper("options", this, {type: 'zip', gzip: false, level: 1}),
        supported = ['zip', 'tar'],
        done = this.async();


    async.forEachSeries(_.keys(files),function(dest, next) {
      var src = files[dest],
          srcFiles = grunt.file.expandFiles(src),
          dest = grunt.template.process(dest);


      if(!_.include(supported, options.type)) {
        grunt.log.error('Compression type ' + options.type + ' not supported.');
        done();
        return;
      }

      // these are suffixed with helper because grunt has a conflicting, built-in "gzip" helper
      grunt.helper(options.type + "Helper", srcFiles, dest, options, function(error, written) {
        if (error === null) {
          grunt.log.writeln('File "' + dest + '" created (' + written + ' bytes written).');
        } else {
          grunt.log.error(error);
          grunt.fail.warn(options.type + " compressor failed.");
        }

        next();
      });

    }, function() {
      done();
    });
  });

  grunt.registerHelper("zipHelper", function(files, dest, options, callback) {
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
          callback(null, written);
        });
        return;
      }

      var current = files.shift();
      grunt.verbose.writeln('Adding "' + current + '" to zip.');
      zip.addFile(fs.createReadStream(current), {name: current}, addFile);
    }

    addFile();
  });

  grunt.registerHelper("tarHelper", function(files, dest, options, callback) {
    var fs = require("fs"),
        path = require("path"),
        fstream = require("fstream"),
        tar = require("tar"),
        zlib = require("zlib");

    var destdir = _(dest).strLeftBack("/"),
        tempdir = destdir + "/tar" + new Date().getTime() + "/";

    if (require("path").existsSync(destdir) === false) {
      grunt.file.mkdir(destdir);
    }

    _.each(files, function(filepath) {
      var filename = _(filepath).strRightBack("/");

      grunt.file.copy(filepath, tempdir + "/" + filename)
    })

    var reader = fstream.Reader({path: tempdir, type: "Directory"}),
        packer = tar.Pack(),
        gzipper = zlib.createGzip(),
        writer = fstream.Writer(dest);

    reader.pipe(packer);

    if (options.gzip) {
      packer.pipe(gzipper);
      gzipper.pipe(writer);
    } else {
      packer.pipe(writer);
    }

    reader.on("error", function(e) {
      callback(e, null);
    });

    packer.on("error", function(e) {
      callback(e, null);
    });

    gzipper.on("error", function(e) {
      callback(e, null);
    });

    writer.on("error", function(e) {
      callback(e, null);
    });

    writer.on("close", function() {
      grunt.helper("clean", tempdir);
      callback(null, fs.statSync(dest).size);
    });
  });
};