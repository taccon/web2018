var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    g = require('auto-plug')('gulp');


gulp.task('styles', function () {
    gulp.src(['assets-dev/stylus/*.styl'])
        .pipe(g.plumber({
            errorHandler: function (error) {
                console.log(error.message);
            }
        }))
        .pipe(g.stylus())
        .pipe(g.sourcemaps.init())
        .pipe(g.postcss([autoprefixer({ browsers: ['last 3 versions'] })]))
        .pipe(g.cleanCss())
        .pipe(g.sourcemaps.write('.'))
        .pipe(gulp.dest('site/assets/css/'))
});

gulp.task('cachebust', function () {
    gulp.src('site/*.html')
        .pipe(g.cacheBust({
            type: 'MD5'
        }))
        .pipe(gulp.dest('site/busted'));
});

gulp.task('copy-images', function () {
    gulp.src('assets-dev/images/**/*')
        .pipe(gulp.dest('site/assets/images/'));
});

gulp.task('copy-fonts', function () {
    gulp.src('assets-dev/stylus/webfonts/**/*')
        .pipe(gulp.dest('site/assets/css/webfonts/'))
})

gulp.task('copy-vendor', function () {
    gulp.src('assets-dev/vendor/**/*')
        .pipe(gulp.dest('site/assets/vendor/'));
});

gulp.task('scripts', function () {
    return gulp.src('assets-dev/js/**/*.js')
        .pipe(g.plumber({
            errorHandler: function (error) {
                console.log(error.message);
            }
        }))
        .pipe(g.concat('taccon.js'))
        .pipe(gulp.dest('site/assets/js/'))
        .pipe(g.rename({ suffix: '.min' }))
        .pipe(g.uglify())
        .pipe(gulp.dest('site/assets/js/'))
});

gulp.task('default', ['styles', 'scripts', 'copy-images', 'copy-fonts', 'copy-vendor', 'scripts']);
gulp.task('prod', ['styles', 'scripts', 'cachebust', 'copy-images', 'copy-fonts', 'copy-vendor', 'scripts']);

gulp.task('dev', function () {
    gulp.watch("assets-dev/stylus/**/*.styl", ['styles', 'copy-images']);
    gulp.watch("assets-dev/js/**/*.js", ['scripts']);
});

