/*
 Script to minify and package the webknife framework from source
 
 Instructions:
 
	1. Download and install node.js: http://nodejs.org/

	2. Install: 

		npm install less
		npm install fs-extra
		npm install uglify-js

	3. Run: node compile
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

//compile LESS into a single compressed CSS file
var less_exec = 'lessc --yui-compress less/main.less > "'+output_directory+'/framework.min.css"';
exec(less_exec, function callback(error, stdout, stderr){
    if(error !== null) {
		console.log(stderr);
	}
	console.log(stdout);
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
	// base64-encode and embed images
	// headers
	// feature selector / configurator