(function() {
 'use strict';
 var gulp = require('gulp'),
  LiveServer = require('gulp-live-server'),
  less = require('gulp-less'),
  source = require('vinyl-source-stream'),
  jade = require('gulp-jade'),
  gutil = require('gulp-util'),
  bower = require('gulp-bower'),
  reactify = require('reactify'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  imagemin = require('gulp-imagemin'),
  nodemon = require('gulp-nodemon'),
  path = require('path'),
  lint = require('gulp-eslint');

 gulp.task('lint', function() {
  return gulp.src(['./routes/*.js', './server/schema/*.js', 'app.js'])
   .pipe(lint())
   .pipe(lint.format());
 });


 gulp.task('watch', function() {

 });

 gulp.task('server', function() {
  var server = new LiveServer('app.js');
  server.start();
 });

 gulp.watch();

 gulp.task('default', ['lint', 'server']);
})();
