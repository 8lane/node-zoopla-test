const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
  gulp.src('./public/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
  }))
  .pipe(gulp.dest('./public/css/'));
});

gulp.task('default', function() {
  gulp.watch('./**/*.scss', ['styles']);
});
