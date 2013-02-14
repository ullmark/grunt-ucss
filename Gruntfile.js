/*
 * grunt-ucss
 * https://github.com/ullmark/grunt-ucss
 *
 * Copyright (c) 2013 Markus Ullmark
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    ucss: {
      
      local: {
        options: {
          whitelist: [],
          auth: false
        },
        html: 'test/fixtures/foo.html',
        css: ['test/fixtures/foo.css'],
        dest: 'tmp'
      }

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

    server: {
      port: 3000,
      base: 'test/fixtures'
    },

    watch: {
      files: ['tasks/**/*.js', 'test/**/*.*'],
      tasks: ['jshint', 'test']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'ucss', 'nodeunit']);

  grunt.registerTask('dev', ['jshint', 'server', 'test', 'watch']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
