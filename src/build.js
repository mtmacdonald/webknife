var fs = require('fs');
var cheerio = require('cheerio');

var svg_dir = 'images/svg/';
var result = [];

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
            var image = svg.html().replace(/\r?\n|\r/g, ''); //remove line breaks
            var name = file.split('.')[0].replace(/-/g, '_');
            var attributes = 'viewBox="0 0 512 512"';
            var item = "var w_icon_"+name+" = '<svg "+attributes+">"+image+"</svg>';";
            result[c] = item;
            if (c >= files.length) {
                //write file when completed all async file reads
                fs.writeFile("../framework/framework.icons.js", result.join('\n'), function(err) {
                    if (err) throw err;
                }); 
            }
        });
    });
});
