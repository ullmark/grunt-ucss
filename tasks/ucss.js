/*
 * grunt-ucss
 * https://github.com/ullmark/grunt-ucss
 *
 * Copyright (c) 2013 Markus Ullmark
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {
  
  'use strict';

  // our requires..
  var _     = require('underscore'),
      ucss  = require('ucss'),
      path  = require('path');

  // ### removeSelectorsFromCss
  // this function removes css selectors from the provided css string
  // using a regex.
  var removeSelectorsFromCss = function(css, selectors) {
    var clean = css;
    _.each(selectors, function(selector) {
      // escape any valid css selector character that might conflict with the regex.
      var escaped = selector.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      var cleaner = new RegExp(escaped + '[\\s\\r\\n]*\\{{1}[^\\}]*\\}{1}[\\s\\r\\n]*', 'gm');
      clean = clean.replace(cleaner, '');
    });
    return clean;
  };

  // ucss task
  // ---------

  grunt.registerMultiTask('ucss', 'Your task description goes here.', function() {

    // this task runs async
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      whitelist: [],
      auth: null
    });

    var css   = grunt.file.expand(this.data.css),
        html  = grunt.file.expand(this.data.html),
        data  = this.data;

    // use the ucss package to analyze our stuff.
    ucss.analyze(css, html, options.whitelist, options.auth, function(result) {
      var neverUsed = [];

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
        grunt.log.errorlns("I think I've found unnecessary css, the following selectors we're never used:");
        grunt.log.writeln(neverUsed.join(', '));

        // we have a destination, 
        // the user want's us to create cleaned versions.
        if (data.dest) {
          grunt.log.subhead('Creating clean versions');

          _.each(css, function(cssFile) {
            // read the file, that should be parsed. 
            var content = grunt.file.read(cssFile);
            var cleanedCss = removeSelectorsFromCss(content, neverUsed);

            var basename = path.basename(cssFile, '.css');
            var cleanedCssTarget = path.join(data.dest, basename + '.clean' + '.css');
            grunt.file.write(cleanedCssTarget, cleanedCss);
            grunt.log.ok('"' + cleanedCssTarget + '" created.');
          });
        }
      }
    });
  });
};
