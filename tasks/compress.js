/**
 * Task: compress
 * Description: Compress files
 * Dependencies: zipstream / tar / fstream
 * Contributor: @ctalkington
 * Inspired by: @jzaefferer (jquery-validation)
 */

module.exports = function(grunt) {
  var fs = require("fs");
  var path = require("path");

  var _ = grunt.utils._;
  var async = grunt.utils.async;

  grunt.registerMultiTask("compress", "Compress files.", function() {
    var options = grunt.helper("options", this, {
      mode: null,
      basePath: null,
      flatten: false,
      level: 1
    });

    var supported = ["zip", "tar", "tgz", "gzip"];
    var helper = options.mode + "Helper";
    var data = this.data;
    var done = this.async();

    if (options.basePath !== null) {
      options.basePath = _(options.basePath).trim("/");
    }

    grunt.verbose.writeflags(options, "Options");

    if (options.mode == 'tgz') {
      helper = "tarHelper";
    }

    if (_.include(supported, options.mode) === false) {
      grunt.log.error("Mode " + options.mode + " not supported.");
      done();
      return;
    }

    var src;
    var srcFiles;

    async.forEachSeries(Object.keys(data.files), function(dest, next) {
      src = data.files[dest];
      srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);

      if (options.mode == "gzip" && srcFiles.length > 1) {
        grunt.warn("Cannot specify multiple input files for gzip compression.");
        srcFiles = srcFiles[0];
      }

      grunt.helper(helper, srcFiles, dest, options, function(written) {
        grunt.log.writeln('File "' + dest + '" created (' + written + ' bytes written).');
        next();
      });

    }, function() {
      done();
    });
  });

  grunt.registerHelper("zipHelper", function(files, dest, options, callback) {
    var zip = require("zipstream").createZip(options);

    var destDir = path.dirname(dest);

    if (path.existsSync(destDir) === false) {
      grunt.file.mkdir(destDir);
    }

    zip.on("error", function(e) {
      grunt.log.error(e);
      grunt.fail.warn("zipHelper failed.");
    });

    zip.pipe(fs.createWriteStream(dest));

    var srcFile;
    var filename;
    var relative;
    var destPath;

    function addFile() {
      if (!files.length) {
        zip.finalize(function(written) {
          callback(written);
        });
        return;
      }

      srcFile = files.shift();
      filename = path.basename(srcFile);
      relative = path.dirname(srcFile);

      if (options.flatten) {
        relative = "";
      } else if (options.basePath !== null && options.basePath.length > 1) {
        relative = _(relative).strRightBack(options.basePath);
      }

      destPath = path.join(relative, filename);

      grunt.verbose.writeln("Adding " + srcFile + " to zip.");
      zip.addFile(fs.createReadStream(srcFile), {name: destPath}, addFile);
    }

    addFile();
  });

  grunt.registerHelper("tarHelper", function(srcFiles, dest, options, callback) {
    var fstream = require("fstream");
    var tar = require("tar");
    var zlib = require("zlib");

    var destDir = path.dirname(dest);
    var destFile = path.basename(dest);
    var destFileExt = path.extname(destFile);
    var tempDir = path.join(destDir, "tar_" + (new Date()).getTime());
    var tarDir = _(destFile).strLeftBack(destFileExt);

    var tarProcess;

    tarDir = path.join(tempDir, tarDir);

    function getSize(filename) {
      try {
        return fs.statSync(filename).size;
      } catch (e) {
        return 0;
      }
    }

    if (path.existsSync(destDir) === false) {
      grunt.file.mkdir(destDir);
    }

    var filename;
    var relative;
    var destPath;

    srcFiles.forEach(function(srcFile) {
      filename = path.basename(srcFile);
      relative = path.dirname(srcFile);

      if (options.flatten) {
        relative = "";
      } else if (options.basePath !== null && options.basePath.length > 1) {
        relative = _(relative).strRightBack(options.basePath).trim("/");
      }

      destPath = path.join(tarDir, relative, filename);

      grunt.verbose.writeln("Adding " + srcFile + " to tar.");
      grunt.file.copy(srcFile, destPath);
    });

    var reader = fstream.Reader({path: tarDir, type: "Directory"});
    var packer = tar.Pack();
    var gzipper = zlib.createGzip();
    var writer = fstream.Writer(dest);

    if (options.mode == "tgz") {
      tarProcess = reader.pipe(packer).pipe(gzipper).pipe(writer);
    } else {
      tarProcess = reader.pipe(packer).pipe(writer);
    }

    tarProcess.on("error", function(e) {
      grunt.log.error(e);
      grunt.fail.warn("tarHelper failed.");
    });

    tarProcess.on("close", function() {
      grunt.helper("clean", tempDir);
      callback(getSize(dest));
    });
  });

  grunt.registerHelper("gzipHelper", function(file, dest, options, callback) {
    var zlib = require("zlib");

    var destDir = path.dirname(dest);

    if (path.existsSync(destDir) === false) {
      grunt.file.mkdir(destDir);
    }

    zlib.gzip(grunt.file.read(file), function(e, result) {
      if (!e) {
        grunt.file.write(dest, result);
        callback(result.length);
      } else {
        grunt.log.error(e);
        grunt.fail.warn("tarHelper failed.");
      }
    });
  });
};