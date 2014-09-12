'use strict';

var gulp      = require('gulp'),
    atomicity = require('../'),
    opts      = { autoprefixer: true };


// Simple rendering of the Atomicity CSS as the source stream
gulp.task('simple', function(){
  atomicity
    .gulp.src(opts)
    .pipe(gulp.dest('.'));
});


// Simple rendering of the Atomicity CSS with custom variables
gulp.task('variables', function(){
  opts.variables = './css/test_variables.scss';
  atomicity
    .gulp.src(opts)
    .pipe(gulp.dest('.'));
});


// Pipe an existing stream of CSS through Atomicity
gulp.task('pipe', function(){
  gulp.src(['./css/sample1.css'])
    .pipe(atomicity.gulp.through(opts))
    .pipe(gulp.dest('.'));
});