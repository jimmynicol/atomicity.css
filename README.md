# Atomicity.css

Minimal CSS library using atomic css principles where a single class selector does one specific task.


## Build Tool Integration

This project includes integrations with both [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/).


### Gulp

    gulp.task('css', function () {
      atomicity
        .gulp({ minify: false, autoprefixer: true })
        .pipe(gulp.dest('.'))
        .pipe(rename(atomicity.fileMin))
        .pipe(minify())
        .pipe(gulp.dest('.'));
    });
    gulp.task('css:watch', ['css'], function(){
      gulp.watch(['css/**/*.css'], ['css']);
    });