'use strict';
 
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
//var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');
 
gulp.task('serve', ['sass'], function() {

  browserSync.init({
      server: "./www"
  });

  gulp.watch("./www/css/sass/**/*.scss", ['sass']);
  gulp.watch("./www/js/*.js").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);

});


gulp.task('sass', function () {
	return gulp.src('./www/css/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/css'))
    .pipe(browserSync.stream());
});

// gulp.task('compress', function() {
//   return gulp.src('./js/*.js')
//     .pipe(sourcemaps.init())
//     .pipe(uglify())
//     .pipe(rename('game.min.js'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('./js'))
//     .pipe(browserSync.stream());
// });

gulp.task('default', ['serve']);