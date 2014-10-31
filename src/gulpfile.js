var gulp = require('gulp');
var concat = require('gulp-concat');

//for processing styles
var sass = require('gulp-sass');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var sprite = require("css-sprite").stream;
var gulpif = require("gulp-if");

//for processing JavaScript
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream'); 
var uglify = require('gulp-uglify');

//for static analysis
var jscs = require('gulp-jscodesniffer');

//config
var config = {
    'build_directory' : '../framework/'
};

gulp.task('default', ['css', 'js']);

gulp.task('css', function() {

    gulp.src('./images/icons/*.png')
        .pipe(sprite({
          base64: true,
          style: 'sprite.scss',
          processor: 'css',
          prefix: 'w-icon'
        }))
        .pipe(gulp.dest('./style'));

    gulp.src('./style/main.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(concat('framework.min.css'))
        .pipe(gulp.dest(config.build_directory));

});

gulp.task('js', function() {

    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(concat('framework.min.js'))
        .pipe(gulp.dest(config.build_directory));

    //for correct way to use browserify in gulp see https://www.npmjs.org/package/vinyl-source-stream
	//browserify('./js/app.js')
	//	.bundle()
	//	.pipe(source('./js/app.js'))
	//	.pipe(streamify(uglify()))
	//	.pipe(streamify(concat('app.min.js')))
	//	.pipe(gulp.dest(config.build_directory));
});

gulp.task('sniff', function() {
	//for correct way to use browserify in gulp see https://www.npmjs.org/package/vinyl-source-stream
    return gulp.src('./js/*.js')
        .pipe(jscs({
            rc: '.jscsrc',
            standard: 'Idiomatic',
            reporters: ['default']
        }));
});