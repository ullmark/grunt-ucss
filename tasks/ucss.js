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
      var neverUsed = [];

      grunt.log.subhead("Analyzing...");

      // enumerate the used selectors.
      for (var key in result.used) {
        var usedAmount = result.used[key];

        // if the selector wasn't used.
        // we need to log it, AND clean it away it 
        // it's specified.
        if (!usedAmount) {
          neverUsed.push(key);
        }
      }

      // if we didn't find any selectors that wasn't used.
      // report it.
      if (!neverUsed.length) {
        grunt.log.ok("Congratulations, you have no unnecessary css");
        done();
      }

      // we've found unused CSS
      else {
        grunt.log.errorlns("I think I've found unnecessary css, the following selectors we're never used.");
        grunt.log.writeln();
        grunt.log.writeln(neverUsed.join(', '));

        // we have a destination, 
        // the user want's us to create cleaned versions.
        if (data.dest) {
          _.each(css, function(cssFile) {
            
            // read the file
            var content = grunt.file.read(cssFile);
            var optimized = '';

            // enumerate each selector that wasn't used...
            _.each(neverUsed, function(selector) {
              // ... and clean it away.
              var regex = new RegExp(selector + '[\\s\\r\\n]*\\{.*\\}', 'gi');
              console.log(regex.toString());
              optimized = content.replace(regex, '');
              console.log(optimized);
            });
          
          });

        }
      }

    });

  });

};
