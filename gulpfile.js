var gulp       = require('gulp')
var browserify = require('browserify')
var vueify     = require('vueify')
var source     = require('vinyl-source-stream')

gulp.task('build', function() {
  browserify({
    'entries': ['./src/main.js']
  })
  .transform(vueify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./'))
})

gulp.task('default', ['build'])