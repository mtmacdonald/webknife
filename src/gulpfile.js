var gulp = require('gulp');
var replace = require('gulp-replace');
var insert = require('gulp-insert');
var file = require('gulp-file');
var concat = require('gulp-concat');

var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');

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

var fs = require('fs');
var cheerio = require('cheerio');

//config
var config = {
    'build_directory' : '../framework/'
};

gulp.task('default', ['css', 'js', 'icon']);

gulp.task('css', function() {

    gulp.src('./style/main.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(concat('framework.min.css'))
        .pipe(gulp.dest(config.build_directory));

});

gulp.task('icon', function() {
    var svg_dir = 'images/svg/';
    var icons = [];

    fs.readdir(svg_dir, function (err, files) {
        if (err) throw err;
        var c=0;
        files.forEach( function(file) {
            fs.readFile(svg_dir+file,'utf-8', function (err, content) {
                c++;
                if (err) throw err;
                $ = cheerio.load(content, { xmlMode: true });
                var svg = $('svg');
                var viewBox = '';
                var image = svg.html().replace(/\r?\n|\r/g, '').replace(/\t/g, '') //remove line breaks and tabs
                var name = file.split('.')[0].replace(/-/g, '_'); //replace hyphens with underscores
                //console.log('<div class="w-svg-icon" data-name="'+name+'"></div>');
                var attributes = 'viewBox="'+svg.attr('viewBox')+'"';
                var svg = '<svg '+attributes+'>'+image+'</svg>';
                var item = {
                    name: name,
                    svg: svg
                };
                icons[c] = item;
                if (c >= files.length) { //finished all async file reads
                    var result = {};
                    icons.forEach( function(icon) {
                        result[icon.name] = icon.svg;
                    });
                    //prepare file
                    var content = "var w_icons = "+JSON.stringify(result, null, 4);
                    //write file
                    fs.writeFile("../framework/framework.icons.js", content, function(err) {
                        if (err) throw err;
                    }); 
                }
            });
        });
    });

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
    return gulp.src('./js/*.js')
        .pipe(jscs({
            rc: '.jscsrc',
            standard: 'Idiomatic',
            reporters: ['default']
        }));
});