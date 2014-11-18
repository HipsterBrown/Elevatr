var gulp = require('gulp');
var git = require('gulp-git');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

gulp.task('serve', function(){
  'use strict';

  connect.server({
    root: ['demo'],
    livereload: true
  });
});

gulp.task('html', function(){
  'use strict';

  gulp.src('demo/index.html')
      .pipe(connect.reload());
});

gulp.task('sass', function() {
  'use strict';

  gulp.src('demo/*.scss')
      .pipe(sass())
      .pipe(autoprefix())
      .pipe(gulp.dest('demo'))
      .pipe(connect.reload());
});

gulp.task('hint', function(){
  'use strict';

  gulp.src(['src/elevatr.js', 'demo/demo.js'])
      .pipe(hint('.jshintrc'))
      .pipe(hint.reporter('default'));
});

gulp.task('js', function() {
  'use strict';

  gulp.src(['src/elevatr.js'])
      .pipe(uglify())
      .pipe(gulp.dest('demo'));
});

gulp.task('watch', function() {
  'use strict';

  gulp.watch(['demo/index.html'], ['html']);
  gulp.watch(['demo/*.scss'], ['sass']);
  gulp.watch(['dmeo/*.js', 'src/*.js'], ['hint', 'scripts']);
});

gulp.task('default', ['serve', 'watch']);
