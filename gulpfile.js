var gulp = require('gulp');
var inlineNg2Template = require('gulp-inline-ng2-template');


gulp.task('inline', function() {
  // place code for your default task here
    var result = gulp.src('./src/**/*.ts')
    .pipe(inlineNg2Template({ useRelativePaths: true, removeLineBreaks: true }))
    .pipe(gulp.dest('./.tmp/inline-src/'));  
});