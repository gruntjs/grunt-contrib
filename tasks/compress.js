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
        options = grunt.helper("options", this, {type: "zip", gzip: false, basePath: null, level: 1}),
        supported = ["zip", "tar"],
        done = this.async();

    if (options.basePath !== null) {
      options.basePath = _(options.basePath).rtrim("/");
    }

    async.forEachSeries(_.keys(files),function(dest, next) {
      var src = files[dest],
          srcFiles = grunt.file.expandFiles(src),
          dest = grunt.template.process(dest);


      if(!_.include(supported, options.type)) {
        grunt.log.error("Compression type " + options.type + " not supported.");
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

      var filepath = files.shift(),
          filename = _(filepath).strRightBack("/")
          zippath = _(filepath).strLeftBack("/");

      if (options.basePath !== null) {
        zippath = _(zippath).strRightBack(options.basePath);
      }

      zippath = zippath + "/" + filename;

      grunt.verbose.writeln("Adding " + filepath + " to zip.");
      zip.addFile(fs.createReadStream(filepath), {name: zippath}, addFile);
    }

    addFile();
  });

  grunt.registerHelper("tarHelper", function(files, dest, options, callback) {
    var fstream = require("fstream"),
        tar = require("tar"),
        zlib = require("zlib");

    var destdir = _(dest).strLeftBack("/"),
        destfile = _(dest).strRight("/"),
        tempdir = destdir + "/tar_temp/",
        tardir = _(destfile).strLeftBack(".");

    // support tar.gz naming when getting root folder for tar
    if (_(tardir).strRightBack(".") === "tar") {
      tardir = _(tardir).strLeftBack(".");
    }

    tardir = tempdir + tardir;

    if (require("path").existsSync(destdir) === false) {
      grunt.file.mkdir(destdir);
    }

    _.each(files, function(filepath) {
      var filename = _(filepath).strRightBack("/"),
          tarpath = _(filepath).strLeftBack("/");

      if (options.basePath !== null) {
        tarpath = _(tarpath).strRightBack(options.basePath);
      }

      tarpath = tarpath + "/" + filename;

      grunt.verbose.writeln("Adding " + filepath + " to tar.");
      grunt.file.copy(filepath, tardir + tarpath);
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
      //grunt.helper("clean", tempdir);
      callback(null, require("fs").statSync(dest).size);
    });
  });
};