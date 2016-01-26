var gulp         = require('gulp');
var rev = require('gulp-rev');

gulp.task('css', function () {
    return gulp.src('static/css/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/static/css'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});

gulp.task('scripts', function () {
    return gulp.src('static/js/**/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/static/js'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});

var revCollector = require('gulp-rev-collector');

gulp.task('rev', ['css','scripts'] ,function () {
    return gulp.src(['rev/**/*.json', 'page/**/*.html'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                '/static/css/': '/dist/static/css/',
                '/static/js/': '/dist/static/js/'
            }
        }) )
        .pipe( gulp.dest('dist/page') );
});

gulp.task('default',['rev'] );