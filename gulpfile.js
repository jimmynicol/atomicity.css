'use strict';

var gulp      = require('gulp'),
    // mocha     = require('gulp-mocha'),
    jshint    = require('gulp-jshint'),
    stylish   = require('jshint-stylish'),
    util      = require('gulp-util'),
    minify    = require('gulp-minify-css'),
    rename    = require('gulp-rename'),
    atomicity = require('./');


gulp.task('lint', function() {
  gulp.src(['js/**/*.js', './*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});
gulp.task('lint:watch', ['lint'], function(){
  gulp.watch(
    ['js/**/*.js', './*.js'],
    function(event){
      util.log('file changed:', util.colors.green(event.path));
      gulp.src(event.path)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
    }
  );
});


gulp.task('css', function() {
  atomicity
    .gulp({
      minify: false,
      autoprefixer: true,
      variables: './test/test_variables.scss'
    })
    .pipe(gulp.dest('.'))
    .pipe(rename(atomicity.fileMin))
    .pipe(minify())
    .pipe(gulp.dest('.'));
});
gulp.task('css:watch', ['css'], function(){
  gulp.watch(['css/**/*.scss'], ['css']);
});