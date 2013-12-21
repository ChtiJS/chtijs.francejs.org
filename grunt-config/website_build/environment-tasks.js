module.exports = function(grunt) {

	grunt.registerMultiTask('init_env', 'create directories for dev and build', function() {
		var options = this.options();
		
		grunt.log.writeln("directory creation...");

		grunt.log.writeln(options.targetImages);
		grunt.file.mkdir(options.targetImages);

		grunt.log.writeln(options.targetFonts);
		grunt.file.mkdir(options.targetFonts);

		grunt.log.writeln(options.targetCSS);
		grunt.file.mkdir(options.targetCSS);

		grunt.log.writeln(options.targetScripts);
		grunt.file.mkdir(options.targetScripts);

	});

};