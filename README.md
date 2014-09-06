# Atomicity.css

A WORK IN PROGRESS


Minimal CSS library using atomic css principles where a single class selector does one specific task.


## Build Tool Integration

This project includes integrations with both [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/).


### Gulp
[Gulp](http://gulpjs.com/) the streaming build tool is a very fast and efficient way to build your assets. Atomicity provides an integration that serves as a read stream starting your process. You can pipe the atomicity stream into any further transforms you need. The example below pipes into minify to compress the rendered CSS.

    var gulp = require('gulp'),
        atomicity = require('atomicity.css'),
        rename = require('gulp-rename'),
        minify = require('gulp-minify');

    gulp.task('css', function () {
      atomicity
        .gulp({
          minify: false,
          autoprefixer: true,
          variables: '/path/to/my_variables.scss'
        })
        .pipe(gulp.dest('.'))
        .pipe(rename(atomicity.fileMin))
        .pipe(minify())
        .pipe(gulp.dest('.'));
    });
    gulp.task('css:watch', ['css'], function(){
      gulp.watch(['css/**/*.scss'], ['css']);
    });


### Grunt
[Grunt](http://gruntjs.com/) is a task runner that allows you to build up config files to build out your assets. Atomicity creates a multiTask so you can configure any number of different permutations. Below are two tasks one for development and one for a production distribution.

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
            dest: __dirname + '/' + atomicity.file
          },
          dist: {
            options: {
              minify: true,
              autoprefixer: true,
              variables: './test/test_variables.scss',
            },
            dest: __dirname + '/' + atomicity.fileMin
          }
        }
      });

      // register the atomicity task
      atomicity.grunt(grunt);

      grunt.registerTask('css', ['atomicity']);
    };