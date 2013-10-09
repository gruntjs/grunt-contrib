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
  require('matchdep').filterPeer('grunt-contrib-*').forEach(grunt.loadNpmTasks);

};
