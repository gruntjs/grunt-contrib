/*
 * grunt-contrib
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerTask('build', function () {
    var done = this.async();
    var when = require('when');
    var request = require('request');
    var _ = require('lodash');
    var deps = require('matchdep').filterPeer('grunt-contrib-*');
    var baseurl = 'http://raw.github.com/gruntjs/'

    // make http request for author file in a repo
    var authorFile = function (dep) {
      var deferred = when.defer();
      var url = baseurl+dep+'/master/AUTHORS';
      request.get({url: url}, function(err, res, body) {
        if (res.statusCode != 200) {
          grunt.fail.fatal('Failed to retrieve '+url);
        } else {
          deferred.resolve(body.split('\n'));
        }
      });
      return deferred.promise
    };

    // make http request for package.json in a repo
    var packageJSON = function (dep) {
      var deferred = when.defer();
      var url = baseurl+dep+'/master/package.json';
      request.get({url: url, json: true}, function(err, res, body) {
        if (res.statusCode != 200) {
          grunt.fail.fatal('Failed to retrieve '+url);
        } else {
          deferred.resolve(body);
        }
      });
      return deferred.promise
    };

    // write combined author file for all contrib repos
    var writeAuthors = function (authors) {
      var output =
        'Tyler Kellen (http://goingslowly.com)\n' +
        _.chain(authors)
        .flatten()
        .map(function(author) {
          return author.trim();
        })
        .filter(function(author) {
          return !(author.indexOf('Tyler Kellen') !== -1);
        })
        .sort()
        .uniq(true, function(author) {
          if (author.indexOf('(') !== -1) {
            author = author.slice(0, author.indexOf('('));
          }
          return author;
        })
        .compact()
        .value()
        .join('\n');

      grunt.file.write('AUTHORS', output);
    };

    // write combined readme for all contrib repos
    var writeReadme = function (packages) {
      var tmpl = grunt.file.read('docs/overview.tmpl');
      var readme = grunt.template.process(tmpl, {data:{plugins:packages}});
      grunt.file.write('docs/overview.md', readme);
    };

    // read all contrib author files
    var authors = when.all(deps.map(authorFile));

    // read all contrib package.json files
    var packages = when.all(deps.map(packageJSON));

    // write author/readme and flag completed
    when.join(authors, packages).then(function (results) {
      writeAuthors(results[0]);
      writeReadme(results[1]);
      done();
    })

  });

  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.registerTask('default', ['build', 'build-contrib']);

};
