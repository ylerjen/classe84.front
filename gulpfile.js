var gulp = require('gulp'),
	compass = require('gulp-compass');
 
gulp.task('compass', function() {
  gulp.src('./sass/*.scss')
    .pipe(compass({
      css: 'css',
      sass: 'sass',
      style: 'compressed',
      logging: true
    }));
});

gulp.task('default', function() {
  // Whenever a stylesheet is changed, recompile
  gulp.watch('./sass/**/*.scss', ['compass']);
});