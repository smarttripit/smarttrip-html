var gulp = require('gulp');
var rev = require('gulp-rev');//增加MD5值
var minifycss = require('gulp-minify-css');//压缩css
var uglify = require('gulp-uglify');//压缩js
var autoprefixer = require('gulp-autoprefixer');//针对不同的浏览器给css样式增加前缀
var watchPath = require('gulp-watch-path');//针对改动的文件进行压缩

gulp.task('css', function () {
    return gulp.src('static/css/**/*.css')
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(rev())
        .pipe(minifycss())
        .pipe(gulp.dest('dist/static/css'))
        
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});

gulp.task('scripts', function () {
    return gulp.src('static/js/**/*.js')
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest('dist/static/js'))
        
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});

gulp.task('auto-css',function(){
     gulp.watch('static/css/**/*.css', function (event) {
        var paths = watchPath(event, 'static/', 'dist/')
        /*
        paths
            { srcPath: 'src/js/log.js',
              srcDir: 'src/js/',
              distPath: 'dist/js/log.js',
              distDir: 'dist/js/',
              srcFilename: 'log.js',
              distFilename: 'log.js' }
        */
        //gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        //gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
        .pipe(minifycss())
        .pipe(gulp.dest(paths.distDir))
    })
});

gulp.task('auto-js',function(){
     gulp.watch('static/js/**/*.js', function (event) {
        var paths = watchPath(event, 'static/', 'dist/')
        /*
        paths
            { srcPath: 'src/js/log.js',
              srcDir: 'src/js/',
              distPath: 'dist/js/log.js',
              distDir: 'dist/js/',
              srcFilename: 'log.js',
              distFilename: 'log.js' }
        */
        //gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        //gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
        .pipe(uglify())
        .pipe(gulp.dest(paths.distDir))
    })
});

var revCollector = require('gulp-rev-collector');//换掉html中的链接路径

gulp.task('rev', ['css','scripts'] ,function () {
    return gulp.src(['rev/**/*.json', 'page/**/*.html'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                '/static/css/': '/dist/static/css',
                '/static/js/': '/dist/static/js/'
            }
        }) )
        .pipe( gulp.dest('dist/page') );
});

gulp.task('default',['css','scripts','auto-css','auto-js','rev'] );