var gulp       = require('gulp')
var browserify = require('browserify')
var source     = require('vinyl-source-stream')

gulp.task('build', function() {
  browserify({
    'entries': ['./src/main.js']
  })
  .bundle()
  .pipe(source('bandle.js'))
  .pipe(gulp.dest('./'))
})

gulp.task('default', ['build']) // デフォルトの gulp タスクは build です。
