/*
 Script to minify and package the webknife framework from source
 
 Instructions:
 
	1. Download and install node.js: http://nodejs.org/
	
	2. Install:

		npm install -g less
		npm install fs-extra
		npm install -g uglify-js
	
	3. Install Ruby http://www.ruby-lang.org/en/
	
	4. Install:
	
		gem install sprite-factory
		gem install chunky_png

	5. Run: node compile (this script)
*/

/*
 User configurable options
*/

var output_directory = "framework"; /*the path to the directory where the generated framework package should be installed*/

/*
 End of user configurable options
*/

var fs = require('fs-extra');
var exec = require('child_process').exec;

//copy required files (except CSS and JavaScript)
function copy(source, destination) {
	fs.copy(source, destination, function(err){
	  if (err) {
		console.error(err);
	  }
	});
}

copy('license.txt', output_directory+'/license.txt');
copy('html/template.html', output_directory+'/template.html');
copy('images', output_directory+'/images');

//generate sprite image and CSS
var sprite_exec = 'sf --nocomments --library chunkypng --layout packed --output-image images/sprite.png --output-style less/sprite.less images/icons';
exec(sprite_exec, function callback(error, stdout, stderr){
    if(error !== null) {
		console.log(stderr);
	}
	else {
		//turn sprite image into base64-encoded LESS files
		fs.readFile('images/sprite.png', function(err, data) {
			if(err != null) {
				console.log(err);
			}
			else {
				var fileData = '.w-icon{background-image: url(data:image/png;base64,';
				fileData += new Buffer(data).toString('base64');
				fileData += ');}';
				fs.writeFile("less/sprite-images.less", fileData, function(err) {
					if(err != null) {
						console.log(err);
					}
					else {
						//compile LESS into a single compressed CSS file
						var less_exec = 'lessc --yui-compress less/main.less > "'+output_directory+'/framework.min.css"';
						exec(less_exec, function callback(error, stdout, stderr){
							if(error != null) {
								console.log(stderr);
							}
						});	
					}
				});
			}
		});
	}
});

//concat JavaScript into a single file and minify
var uglify_exec = 'cat js/* | uglifyjs -o "'+output_directory+'/framework.min.js"';
exec(uglify_exec, function callback(error, stdout, stderr){
	if(error !== null) {
		console.log(stderr);
	}
	console.log(stdout);
});

//TODO
	// headers
	// feature selector / configurator