var gulp = require('gulp');
var concat = require('gulp-concat');

//for processing styles
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

//for svg icon processing
var fs = require('fs');
var cheerio = require('cheerio');

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

//options
var uglify_options = {
    preserveComments: 'some'
};

var autoprefixer_options = {
    browsers: ['Explorer >= 9', 'last 2 versions'],
    cascade: false
};

gulp.task('default', ['style', 'icon', 'js', 'syntax']);

gulp.task('style', function() {

    gulp.src('./style/main.scss')
        .pipe(sass())
        .pipe(autoprefixer(autoprefixer_options))
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
                //console.log('<span class="w-icon" data-name="'+name+'" title="'+name+'"></span>');
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
                    var content = '/*!\n';
                    content += ' Webknife (c) 2014 The Webknife Project | http://mtmacdonald.github.io/webknife/LICENSE\n'
                    content += '*/\n';
                    content += "var w_icons = "+JSON.stringify(result, null, 4);
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

    gulp.src([
            './js/header.js',
            './js/framework.js', //framework must come first (in order to support old browser warnings)
            './js/jquery.min.js',
            './js/moment.min.js',
            './js/chosen.jquery.js',
            './js/pikaday.js',

            './js/modal.js',
        ])
        .pipe(uglify(uglify_options))
        .pipe(concat('framework.min.js'))
        .pipe(gulp.dest(config.build_directory));

    //for correct way to use browserify in gulp see https://www.npmjs.org/package/vinyl-source-stream
	//browserify('./js/app.js')
	//	.bundle()
	//	.pipe(source('./js/app.js'))
	//	.pipe(streamify(uglify(uglify_options)))
	//	.pipe(streamify(concat('app.min.js')))
	//	.pipe(gulp.dest(config.build_directory));
});

gulp.task('syntax', function() {
    gulp.src([
            './js/highlight.pack.js',
       ])
        .pipe(uglify(uglify_options))
        .pipe(concat('highlight.min.js'))
        .pipe(gulp.dest(config.build_directory));

    gulp.src('./style/highlight.scss')
        .pipe(sass())
        .pipe(autoprefixer(autoprefixer_options))
        .pipe(minifyCSS())
        .pipe(concat('highlight.min.css'))
        .pipe(gulp.dest(config.build_directory));

});

gulp.task('sniff', function() {
    return gulp.src('./js/*.js')
        .pipe(jscs({
            rc: '.jscsrc',
            standard: 'Idiomatic',
            reporters: ['default']
        }));
});