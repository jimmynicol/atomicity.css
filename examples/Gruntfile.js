'use strict';

var atomicity = require('../');

module.exports = function(grunt){

  grunt.initConfig({
    atomicity: {
      dev: {
        options: {
          minify: false,
          autoprefixer: true,
          variables: './css/test_variables.scss',
        },
        dest: __dirname + '/' + atomicity.file
      },
      dist: {
        options: {
          minify: true,
          autoprefixer: true,
          variables: './css/test_variables.scss',
        },
        dest: __dirname + '/' + atomicity.fileMin
      }
    }
  });

  // register the atomicity task
  atomicity.grunt(grunt);

  grunt.registerTask('css', ['atomicity']);
};