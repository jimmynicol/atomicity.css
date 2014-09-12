'use strict';

var gulp      = require('gulp'),
    atomicity = require('../'),
    opts      = { minify: false, autoprefixer: true };


// Simple rendering of the Atomicity CSS as the initiating stream
gulp.task('simple', function(){
  atomicity
    .gulp.read(opts)
    .pipe(gulp.dest('.'));
});

// Pipe an existing stream of CSS through Atomicity
gulp.task('pipe', function(){
  gulp.src(['./css/sample1.css'])
    .pipe(atomicity.gulp.through(opts))
    .pipe(gulp.dest('.'));
});