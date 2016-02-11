(function() {
 'use strict';
 var gulp = require('gulp'),
  LiveServer = require('gulp-live-server'),
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
