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
        options = grunt.helper("options", this, {archiver: null, gzip: false, basePath: null, level: 1}),
        supported = ["zip", "tar"],
        helper = options.archiver + "Helper",
        gzipOnly = false,
        done = this.async();

    if (options.basePath !== null) {
      options.basePath = _(options.basePath).rtrim("/");
    }

    if (options.archiver === null && options.gzip === true) {
      gzipOnly = true;
      helper = "gzipHelper";
    } else if (_.include(supported, options.archiver) === false) {
      grunt.log.error("Archiver " + options.archiver + " not supported.");
      done();
      return;
    }

    async.forEachSeries(_.keys(files),function(dest, next) {
      var src = files[dest],
          srcFiles = grunt.file.expandFiles(src),
          dest = grunt.template.process(dest);

      if (gzipOnly && _.size(srcFiles) > 1) {
        grunt.warn("Cannot specify multiple input files for gzip compression.");
        srcFiles = srcFiles[0];
      }

      grunt.helper(helper, srcFiles, dest, options, function(error, written) {
        if (error === null) {
          grunt.log.writeln('File "' + dest + '" created (' + written + ' bytes written).');
        } else {
          grunt.log.error(error);
          grunt.fail.warn("Archiver " + options.archiver + " failed.");
        }

        next();
      });

    }, function() {
      done();
    });
  });

  grunt.registerHelper("zipHelper", function(files, dest, options, callback) {
    var fs = require("fs"),
        zip = require("zipstream").createZip(options);

    var destdir = _(dest).strLeftBack("/");

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

      var filepath = files.shift(),
          filename = _(filepath).strRightBack("/"),
          internal = _(filepath).strLeftBack("/");

      if (options.basePath !== null) {
        internal = _(internal).strRightBack(options.basePath);
      }

      internal = internal + "/" + filename;

      grunt.verbose.writeln("Adding " + filepath + " to zip.");
      zip.addFile(fs.createReadStream(filepath), {name: internal}, addFile);
    }

    addFile();
  });

  grunt.registerHelper("tarHelper", function(files, dest, options, callback) {
    var fstream = require("fstream"),
        tar = require("tar"),
        zlib = require("zlib");

    var destdir = _(dest).strLeftBack("/"),
        destfile = _(dest).strRight("/"),
        tempdir = destdir + "/tar_temp",
        tardir = _(destfile).strLeftBack(".");

    // support tar.gz naming when getting root folder for tar
    if (_(tardir).strRightBack(".") === "tar") {
      tardir = _(tardir).strLeftBack(".");
    }

    tardir = tempdir + "/" + tardir;

    if (require("path").existsSync(destdir) === false) {
      grunt.file.mkdir(destdir);
    }

    _.each(files, function(filepath) {
      var filename = _(filepath).strRightBack("/"),
          internal = _(filepath).strLeftBack("/");

      if (options.basePath !== null) {
        internal = _(internal).strRightBack(options.basePath);
      }

      internal = internal + "/" + filename;

      grunt.verbose.writeln("Adding " + filepath + " to tar.");
      grunt.file.copy(filepath, tardir + internal);
    })

    var reader = fstream.Reader({path: tardir, type: "Directory"}),
        packer = tar.Pack(),
        gzipper = zlib.createGzip(),
        writer = fstream.Writer(dest);

    if (options.gzip) {
      var tard = reader.pipe(packer).pipe(gzipper).pipe(writer);
    } else {
      var tard = reader.pipe(packer).pipe(writer);
    }

    tard.on("error", function(e) {
      callback(e, null);
    });

    tard.on("close", function() {
      grunt.helper("clean", tempdir);
      callback(null, require("fs").statSync(dest).size);
    });
  });

  grunt.registerHelper("gzipHelper", function(file, dest, options, callback) {
    var zlib = require("zlib"),
        destdir = _(dest).strLeftBack("/");

    if (require("path").existsSync(destdir) === false) {
      grunt.file.mkdir(destdir);
    }

    zlib.gzip(grunt.file.read(file), function(error, result) {
      if (!error) {
        grunt.file.write(dest, result);
        callback(null, result.length);
      } else {
        callback(error, null);
      }
    });
  });
};