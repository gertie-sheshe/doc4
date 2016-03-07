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

var paths = {
  public: 'public/**',
  images: 'app/images/**/*',
  scripts: 'app/**/*.+(jsx|js)',
  styles: 'app/styles/*.+(less|css)',
  jade: ['app/**/*.jade']
};
 gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js', './app/**/*.jsx', './server/**/*.js', 'app.js', './tests/**/*.js'])
   .pipe(lint())
   .pipe(lint.format());
 });

 gulp.task('font', function() {
    gulp.src('./app/fonts/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./public/fonts'));
});

 gulp.task('images', function() {
   gulp.src(paths.images)
     .pipe(imagemin({
       optimizationLevel: 3,
       progressive: true,
       interlaced: true
     }))
     .pipe(gulp.dest('./public/images/'));
 });

 gulp.task('bower', function() {
   return bower()
     .pipe(gulp.dest('public/lib/'));
 });

 gulp.task('jade', function() {
   gulp.src(paths.jade)
     .pipe(jade())
     .pipe(gulp.dest('./public/'));
 });

 gulp.task('less', function() {
   gulp.src(paths.styles)
     .pipe(less({
       paths: [path.join(__dirname, './app/styles')]
     }))
     .pipe(gulp.dest('./public/css'));
 });

 gulp.task('browserify', function() {
   var bundler = browserify({
     entries: ['./app/scripts/app.jsx'],
     debug: true,
     fullPaths: true,
     transform: [reactify, babelify]
   });

   bundler.bundle()
     .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
     .on('error', gutil.log.bind(gutil, 'Browserify ' +
       'Error: in browserify gulp task'))
     // vinyl-source-stream makes the bundle compatible with gulp
     .pipe(source('app.js')) // filename
     // Output the file
     .pipe(gulp.dest('./public/js/'));
   return bundler;
 });

 // gulp.task('server', function() {
 //  var server = new LiveServer('app.js');
 //  server.start();
 // });
 gulp.task('server', function() {
   nodemon({
       script: 'app.js',
       ext: 'js',
       // tasks: ['lint'],
       ignore: ['public/', 'node_modules/']
     })
     .on('restart', function() {
       console.log('>> node restart');
     });
 });

 gulp.task('watch', function() {
   gulp.watch(paths.jade, ['jade']);
   gulp.watch(paths.styles, ['less']);
   gulp.watch(paths.scripts, ['browserify']);
 });

 gulp.task('default', ['server','watch', 'build']);
 gulp.task('build', ['jade', 'less', 'font', 'images', 'browserify', 'bower']);
})();
