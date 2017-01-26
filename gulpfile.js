
var path = require('path'),
    gulp = require('gulp'),
    notify = require('gulp-notify'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer')
    browserSync = require('browser-sync').create();

var config = {
    nodeModules: path.join(__dirname, 'node_modules'),
    srcPath: path.join(__dirname, 'src'),
    distPath: path.join(__dirname, 'dist')
};

gulp.task('css', function() {
    var sassSrcPath = path.join(config.srcPath, 'scss')
    return gulp.src(path.join(sassSrcPath, 'style.scss'))
        .pipe(
            sass({
                outputStyle: 'expanded',
                includePaths: [
                    sassSrcPath,
                    path.join(config.nodeModules, 'bootstrap/scss'),
                    path.join(config.nodeModules, 'font-awesome/scss')
                ]
            })
            .on('error', notify.onError(function(error) {
                return 'Error: ' + error.message;
            }))
        )
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.join(config.distPath, 'css')));
});

gulp.task('js', function() {
    return browserify({
        entries: path.join(config.srcPath, 'js/script.js')
    })
    .transform(babelify, {
        presets: ['es2015']
    })
    .bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest(path.join(config.distPath, 'js')));
});

gulp.task('copy-static', function () {
    return gulp
        .src(path.join(config.srcPath, 'fonts/*'))
        .pipe(gulp.dest(path.join(config.distPath, 'fonts')))
    && gulp
        .src(path.join(config.srcPath, 'img/*'))
        .pipe(gulp.dest(path.join(config.distPath, 'img')))
    && gulp
        .src(path.join(config.srcPath, 'index.html'))
        .pipe(gulp.dest(config.distPath));
});

gulp.task('build', ['css', 'js', 'copy-static']);

gulp.task('watch', ['build'], function () {
    gulp.watch(config.srcPath + '/**/*', ['build']);
})

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.distPath
        }
    });
    gulp
        .watch(config.srcPath + '/**/*', ['build'])
        .on('change', browserSync.reload);
});

gulp.task('default', ['build']);
