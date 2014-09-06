# Atomicity.css

A WORK IN PROGRESS


Minimal CSS library using atomic css principles where a single class selector does one specific task.


## Build Tool Integration

This project includes integrations with both [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/).


### Gulp

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