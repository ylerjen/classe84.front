var gulp = require('gulp'),
	compass = require('gulp-compass'),
  plumber = require('gulp-plumber');;
 
gulp.task('compass', function() {
  gulp.src('./sass/*.scss')
    .pipe(plumber())
    .pipe(compass({
      css: 'distr/css',
      sass: 'sass',
      style: 'compressed',
      logging: true,
      sourcemap: true
    }));
});

gulp.task('default', function() {
  // Whenever a stylesheet is changed, recompile
  gulp.watch('./sass/**/*.scss', ['compass']);
});