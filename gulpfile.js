var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    shell = require('gulp-shell'),
    stylish = require('jshint-stylish');
    deploy = require("gulp-gh-pages");


// JS task
gulp.task('scripts', function() {
  gulp.src('../tedxlausanne-styleguide/assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./static/js'))
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('browser-sync', function() {
    browserSync.init({
      open: false,
      reloadDelay: 2000,
      server: {
          baseDir: "./static"
      }
    });
});

gulp.task('deploy', function () {
    gulp.src("./static/**/*")
        .pipe(deploy());
});

gulp.task('build-images', function() {
  return gulp.src(['../tedxlausanne-styleguide/assets/img/**'])
          .pipe(gulp.dest('static/img'));
});

// SASS compile, autoprefix and minify task
gulp.task('styles', function() {
  return gulp.src('../tedxlausanne-styleguide/assets/sass/style.scss')
    .pipe(sass())
      .on('error', gutil.beep)
      .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(minifycss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('watch',['styles', 'scripts'], function() {
  gulp.watch("./static/**/*", ['bs-reload']);
});

gulp.task('default', ['styles', 'browser-sync', 'watch', 'scripts', 'build-images']);
gulp.task('build', ['styles', 'scripts', 'build-images']);

