const gulp = require('gulp');
const inline = require('gulp-inline');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const gzip = require('gulp-gzip');

gulp.task('inline', function() {
    return gulp.src('build/index.html')
        .pipe(inline({
            base: 'build/',
            js: function() {
                return uglify({
                    mangle: false
                });
            },
            css: [minifyCss({level: {1: {specialComments: 0}}}), autoprefixer],
        }))
        .pipe(gulp.dest('build/')
    );
});

gulp.task('compress', async function() {
    gulp.src('build/index.html')
    .pipe(gzip())
    .pipe(gulp.dest('build'));
});

gulp.task('default', gulp.series(
    'inline', 'compress'
));