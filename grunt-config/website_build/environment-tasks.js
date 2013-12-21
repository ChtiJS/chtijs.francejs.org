module.exports = function(grunt) {
	
	grunt.registerMultiTask('init_env', 'create directories for dev and build', function() {
		var options = this.options();
		var base = options.targetBase + '/';
		grunt.log.writeln("directory creation...");

		grunt.log.writeln(base + options.targetImages);
		grunt.file.mkdir(base + options.targetImages);

		grunt.log.writeln(base + options.targetFonts);
		grunt.file.mkdir(base + options.targetFonts);

		grunt.log.writeln(base + options.targetCSS);
		grunt.file.mkdir(base + options.targetCSS);

		grunt.log.writeln(base + options.targetScripts);
		grunt.file.mkdir(base + options.targetScripts);

	});

};