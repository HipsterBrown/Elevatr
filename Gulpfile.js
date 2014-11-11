var gulp = require('gulp');
var git = require('gulp-git');
var autoprefix = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var server = require('gulp-server-livereload');


gulp.task('sass', function() {
  'use strict';

  return gulp.src('./demo/*.scss')
  .pipe(sass())
  .pipe(autoprefix())
  .pipe(gulp.dest('./demo'));
});

gulp.task('js', function() {
  'use strict';

  return gulp.src('./src/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(uglify())
  .pipe(gulp.dest('./demo'));
});

gulp.task('serve', ['sass', 'js'], function() {
  'use strict';

  gulp.src('demo')
  .pipe(server({
    livereload: true,
    port: 4200
  }));
});
