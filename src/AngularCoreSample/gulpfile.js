/// <binding Clean='clean' AfterBuild='compile-scripts' />
'use strict';

var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rimraf = require('rimraf');

var webroot = './wwwroot/';

var tsProject = ts.createProject('tsconfig.json');

var paths = {
    js: webroot + 'app/**/*.js',
    minJs: webroot + 'app/**/*.min.js',
    css: webroot + 'app/**/*.css',
    minCss: webroot + 'app/**/*.min.css',
    concatJsDest: webroot + 'app/app.min.js',
    concatCssDest: webroot + 'app/app.min.css',
    npmSrc: './node_modules',
    npmLibs: webroot + 'lib/npm/',
    tsInput: './scripts/app/**/*.ts',
    tsOutput: webroot + 'app/',
    sassInput: './scripts/app/**/*.scss',
    sassOutput: webroot + 'app/',
    htmlInput: './scripts/app/**/*.html',
    htmlOutput: webroot + 'app/',
    themes: './themes'
};

gulp.task('clean:js', function (cb) {
    rimraf(paths.tsOutput, cb);
});

gulp.task('clean:html', function (cb) {
    rimraf(paths.htmlOutput, cb);
});

gulp.task('clean:css', function (cb) {
    rimraf(paths.sassOutput, cb);
});

gulp.task('remove-deps', function (cb) {
    rimraf(paths.npmLibs, cb);
});

gulp.task('clean', ['clean:js', 'clean:html', 'clean:css']);

gulp.task('min:js', function () {
    return gulp.src([paths.js, '!' + paths.minJs], { base: '.' })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('min:css', function () {
    return gulp.src([paths.css, '!' + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest('.'));
});

gulp.task('min', ['min:js', 'min:css']);

gulp.task('copy-deps:@angular', function () {
    return gulp.src(paths.npmSrc + '/@angular/**/*.{js,js.map,min.js,min.js.map}', { base: paths.npmSrc + '/@angular/' })
         .pipe(gulp.dest(paths.npmLibs + '/@angular/'));
});

gulp.task('copy-deps:systemjs', function () {
    return gulp.src(paths.npmSrc + '/systemjs/dist/**/*.{js,js.map,min.js,min.js.map}', { base: paths.npmSrc + '/systemjs/dist/' })
         .pipe(gulp.dest(paths.npmLibs + '/systemjs/'));
});

gulp.task('copy-deps:core-js', function () {
    return gulp.src(paths.npmSrc + '/core-js/client/**/*.{js,js.map,min.js,min.js.map}', { base: paths.npmSrc + '/core-js/client/' })
         .pipe(gulp.dest(paths.npmLibs + '/core-js/'));
});

gulp.task('copy-deps:reflect-metadata', function () {
    return gulp.src(paths.npmSrc + '/reflect-metadata/**/*.{js,js.map,min.js,min.js.map}', { base: paths.npmSrc + '/reflect-metadata/' })
         .pipe(gulp.dest(paths.npmLibs + '/reflect-metadata/'));
});

gulp.task('copy-deps:rxjs', function () {
    return gulp.src(paths.npmSrc + '/rxjs/**/*.{js,js.map,min.js,min.js.map}', { base: paths.npmSrc + '/rxjs/' })
         .pipe(gulp.dest(paths.npmLibs + '/rxjs/'));
});

gulp.task('copy-deps:zone.js', function () {
    return gulp.src(paths.npmSrc + '/zone.js/dist/**/*.{js,js.map,min.js,min.js.map}', { base: paths.npmSrc + '/zone.js/dist/' })
         .pipe(gulp.dest(paths.npmLibs + '/zone.js/'));
});

gulp.task('copy-deps:jquery', function () {
    return gulp.src(paths.npmSrc + '/jquery/dist/jquery.{js,js.map,min.js,min.js.map}', { base: paths.npmSrc + '/jquery/dist/' })
         .pipe(gulp.dest(paths.npmLibs + '/jquery/'));
});

gulp.task('copy-deps:bootstrap-js', function () {
    return gulp.src(paths.npmSrc + '/bootstrap/dist/js/bootstrap.{js,js.map,min.js,min.js.map}', { base: paths.npmSrc + '/bootstrap/dist/js/' })
         .pipe(gulp.dest(paths.npmLibs + '/bootstrap/'));
});

gulp.task('copy-deps:bootstrap-css', function () {
    return gulp.src(paths.npmSrc + '/bootstrap/dist/css/*.{css,css.map,min.css,min.css.map}', { base: paths.npmSrc + '/bootstrap/dist/css/' })
         .pipe(gulp.dest(paths.npmLibs + '/bootstrap/'));
});

gulp.task('copy-deps:bootstrap-fonts', function () {
    return gulp.src(paths.npmSrc + '/bootstrap/fonts/*', { base: paths.npmSrc + '/bootstrap/fonts/' })
         .pipe(gulp.dest(paths.npmLibs + '/fonts/'));
});

gulp.task('copy-deps:bootstrap-themes', function () {
    return gulp.src(paths.themes + '/*.{css,css.map,min.css,min.css.map}', { base: paths.themes + '/' })
         .pipe(gulp.dest(paths.npmLibs + '/bootstrap/'));
});

gulp.task('copy-deps', ['copy-deps:@angular', 'copy-deps:systemjs', 'copy-deps:core-js', 'copy-deps:reflect-metadata', 'copy-deps:rxjs', 'copy-deps:zone.js', 'copy-deps:jquery', 'copy-deps:bootstrap-js', 'copy-deps:bootstrap-css', 'copy-deps:bootstrap-fonts', 'copy-deps:bootstrap-themes']);

gulp.task('typescript', function () {
    var tsResult = gulp.src([paths.tsInput])
    .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest(paths.tsOutput));
});

gulp.task('watch:typescript', ['typescript'], function () {
    return gulp.watch(paths.tsInput, ['typescript']);
});

gulp.task('sass', function () {
    return gulp.src(paths.sassInput)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.sassOutput));
});

gulp.task('watch:sass', function () {
    gulp.watch(paths.sassInput, ['sass']);
});

gulp.task('html', function () {
    return gulp.src([paths.htmlInput])
         .pipe(gulp.dest(paths.htmlOutput));
});

gulp.task('watch:html', ['html'], function () {
    return gulp.watch(paths.htmlInput, ['html']);
});

gulp.task('watch', ['watch:typescript', 'watch:html', 'watch:sass']);

gulp.task('compile-scripts', ['typescript', 'html', 'sass']);

gulp.task('default', ['copy-deps', 'watch']);