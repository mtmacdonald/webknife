var fs = require('fs');
var cheerio = require('cheerio');

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
            var attributes = 'viewBox="0 0 512 512"';
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
