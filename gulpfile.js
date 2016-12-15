var gulp         = require('gulp');
var browserify   = require('browserify');
var vueify       = require('vueify');
var source       = require('vinyl-source-stream');
var stylus       = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var uglify       = require('gulp-uglify');
var streamify    = require('gulp-streamify');
var rename       = require('gulp-rename');

var autoprefixer_config = {
  browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
  cascade: false
};


gulp.task('build-vue', function() {
  // js files & vue
  browserify({
    'entries': ['./src/app.js']
  })
  .transform(vueify/*, {
    postcss: [autoprefixer(autoprefixer_config), cssnano()]
  }*/)
  .bundle()
  .pipe(source('bundle.js'))
/*  .pipe(streamify(uglify({
    preserveComments: 'some'
  })))
*/  .pipe(rename({
    extname: '.min.js'
  }))
  .pipe(gulp.dest('./build/js/'))
});

gulp.task('build-html', function() {
  // index.html
   gulp.src(['./src/index.html'])
       .pipe(gulp.dest('./build/'))
});

gulp.task('build-css', function() {
  // css
  gulp.src(['./src/main.styl'])
      .pipe(stylus())
      .pipe(autoprefixer(autoprefixer_config))
      .pipe(cssnano())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest('./build/css/'))
});

gulp.task('build', ['build-vue', 'build-css', 'build-html'])
gulp.task('default', ['build'])
