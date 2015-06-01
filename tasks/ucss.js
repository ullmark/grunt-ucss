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

  // ucss task
  // ---------

  grunt.registerMultiTask('ucss', 'Your task description goes here.', function() {

    // this task runs async
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      auth: null,
      whitelist: []
    });

    var css   = grunt.file.expand(this.data.css),
        pages = grunt.file.expand(this.data.pages),
        data  = this.data;

    // use the ucss package to analyze our stuff.
    ucss.analyze(data.pages, css, options, null, function(result) {

      if (result.total_unused) {
        grunt.log.subhead(result.total_unused + ' unused CSS selectors found!');
        _.each(result.selectors, function(data, selector) {
          if (!data.ignored && !data.whitelisted && !data.matches_html) {
            grunt.log.write(selector, ' => ');
            var filespecs = grunt.log.wordlist(_.map(data.pos_css, function(positions, filename) {
              return filename + '[' + positions.join(',') + ']';
            }));
            grunt.log.writeln(filespecs);
          }
        });
      }

      else {
        grunt.log.oklns('You have no unused CSS. Congratulations!');
      }

      done();

    });
  });
};
