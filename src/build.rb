#  
# Script to minify and package the webknife framework from source
# 
# Instructions:
# 
#	1. Download and install node.js: http://nodejs.org/
#	
#	2. Install:
#
#		npm install -g less
#		npm install -g uglify-js
#	
#	3. Install Ruby http://www.ruby-lang.org/en/
#	
#	4. Install:
#	
#		gem install sprite-factory
#		gem install chunky_png
#
#	5. Run: ruby build.rb (this script)

#
# User configurable options
#

output_directory = "release/framework"; #the path to the directory where the generated framework package should be written

#
# End of user configurable options
#

require 'fileutils'
require 'sprite_factory'
require 'base64'

#copy the license and template html
FileUtils.cp('license.txt', output_directory+'/license.txt')
FileUtils.cp('html/template.html', output_directory+'/template.html')

#concat JavaScript into a single file and minify
uglify = 'cat js/* | uglifyjs -o "'+output_directory+'/framework.min.js"'
IO.popen(uglify)

#generate the image sprite
SpriteFactory.run!('images/icons',
	:library => :chunkypng,
	:layout => :packed,
	:output_image => 'images/sprite.png',
	:selector => '.w-icon.w-',
	:cssurl => '',	
	:output_style => 'less/sprite.less',
	:margin => 1,
	:nocomments => true,
	:pngcrush => true,
)

#convert the image sprite into a base64 encoded CSS (LESS) file
File.open('images/sprite.png', 'rb') do |image_file|
	fileData = '.w-icon{background-image: url(data:image/png;base64,'
	fileData += Base64.strict_encode64(image_file.read)
	fileData += ');}'
	File.open('less/sprite-images.less', 'w') {|f| f.write fileData}
end

#post-process the sprite CSS to transform "background: url(none/sprite.png) 0px 0px no-repeat; }" into "background-position: 0px 0px;"
sprite_css = File.read('less/sprite.less');
sprite_css.gsub!(/ no-repeat/, '')
sprite_css.gsub!(/ url\(\/sprite\.png\)/, "")
sprite_css.gsub!(/background:/, "background-position:")
File.open('less/sprite.less', "w") do |f| f.write sprite_css end

#run LESS to concat and minify the CSS
less = 'lessc --compress less/main.less > "'+output_directory+'/framework.min.css"'
IO.popen(less)