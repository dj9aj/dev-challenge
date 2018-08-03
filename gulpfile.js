const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('sass', () => {
    return gulp.src('src/sass/**/*.scss') // Sass file directory
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('src/css')) // Output directory
        .pipe(browserSync.reload({
            stream: true
          }))
});

// Gulp watch
gulp.task('watch', ['browserSync', 'sass'], () => {
    gulp.watch('src/sass/**/*.scss', ['sass']); // Watch for sass file changes
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('src/*.html', browserSync.reload); 
    gulp.watch('src/js/**/*.js', browserSync.reload); 
});

// Let browserSync know where the root folder should be
gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'src'
      },
    })
  })