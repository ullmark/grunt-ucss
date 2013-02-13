/*
 * grunt-ucss
 * https://github.com/ullmark/grunt-ucss
 *
 * Copyright (c) 2013 Markus Ullmark
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {
  
  'use strict';

  var _     = require('underscore'),
      ucss  = require('ucss');

  // Please see the grunt documentation for more information regarding task
  // creation: https://github.com/gruntjs/grunt/blob/devel/docs/toc.md

  grunt.registerMultiTask('ucss', 'Your task description goes here.', function() {

    // this task runs async
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      optimize: false,
      whitelist: [],
      auth: false
    });

    var css   = grunt.file.expand(this.data.css),
        html  = grunt.file.expand(this.data.html),
        data  = this.data;

    // use the ucss package to analyze our stuff.
    ucss.analyze(css, html, options.whitelist, options.auth, function(result) {

      // if the user wants optimization but haven't specified
      // an output.
      if (options.optimize && !data.dest) {
        grunt.log.error('You must specify a destination ("dest") when optimization is enabled');
      }

      // enumerate the used selectors.
      for (var key in result.used) {
        var usedAmount = result.used[key];

        // if the selector wasn't used.
        // we need to log it, AND clean it away it 
        // it's specified.
        if (!usedAmount) {


          grunt.log.writeln(key + " wasn't used");
        }
      }

      done();
    });

  });

};
