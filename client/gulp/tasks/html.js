'use strict';

/**
 * Task: html
 *
 * Copy all markup files.
 */

var gulp = require('gulp');


// == Register task
gulp.task('html', function(){

  // Copy main app
  gulp.src('*.html').pipe(gulp.dest('build/'));

  // Copy all other templates markdown
  gulp.src('**/*.html')
    .pipe(gulp.dest('build/'));

});


