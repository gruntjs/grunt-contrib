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

  // Load all grunt-contrib peerDependencies.
  var pkg = __dirname + '/../package.json';
  require('matchdep').filterPeer('grunt-contrib-*', pkg).forEach(grunt.loadNpmTasks);

};
