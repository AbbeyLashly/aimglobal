var gulp 		     = require('gulp');
var sass 		     = require('gulp-sass');
var watch 		     = require('gulp-watch');
var concat				 = require('gulp-concat');
var uglify				 = require('gulp-uglify');
var minifyJS 		 = require('gulp-minify');


//**  concatenate sass files  **//

gulp.task('concat', function() {
  //helpers
    gulp.src('scss/bootstrap/helpers/*.scss')
      .pipe(concat('_helpers.scss'))
      .pipe(gulp.dest('scss/bootstrap'));

  //components
    gulp.src('scss/bootstrap/components/*.scss')
      .pipe(concat('_components.scss'))
      .pipe(gulp.dest('scss/bootstrap'));

  //core
    gulp.src('scss/bootstrap/core/*.scss')
      .pipe(concat('_core.scss'))
      .pipe(gulp.dest('scss/bootstrap'));

  //mixins
    gulp.src('scss/bootstrap/mixins/*.scss')
      .pipe(concat('_mixins.scss'))
      .pipe(gulp.dest('scss/bootstrap'));

  //core
    gulp.src('scss/bootstrap/reset/*.scss')
      .pipe(concat('_reset.scss'))
      .pipe(gulp.dest('scss/bootstrap'));

  //utilities
    gulp.src('scss/bootstrap/utilities/*.scss')
      .pipe(concat('_utilities.scss'))
      .pipe(gulp.dest('scss/bootstrap'));

});




// watch my sass
gulp.task('scss', function () {
 return gulp.src('./scss/style.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(sass({
              sourceComments: 'map',
              sourceMap: 'sass',
              outputStyle: 'nested' // nested, expanded, compressed
            }))
          .pipe(gulp.dest('./'));
});







// Concatenate javascript libraries
gulp.task('scripts', function() {
  return gulp.src('./js/src/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js'));

});


gulp.task('watch', function () {
  gulp.watch('**/*.scss', ['scss']);
});







gulp.task('default', ['concat','scripts', 'scss','watch']);
