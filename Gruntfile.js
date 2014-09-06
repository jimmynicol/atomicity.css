'use strict';

var atomicity = require('./');

module.exports = function(grunt){

  grunt.initConfig({
    atomicity: {
      dev: {
        options: {
          minify: false,
          autoprefixer: true,
          variables: './test/test_variables.scss',
        },
        dest: './'
      },
      dist: {
        options: {
          minify: true,
          autoprefixer: true,
          variables: './test/test_variables.scss',
        },
        dest: './'
      }
    }
  });

  // register the atomicity task
  atomicity.grunt(grunt);

  grunt.registerTask('css', ['atomicity']);
};