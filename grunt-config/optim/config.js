module.exports = function(grunt) {

	var
	defaults = config = {

		imagemin: {
			dev: {
				options: {
					optimizationLevel: 3
				},
				expand: true,
				cwd: '<%= conf.src.images %>',
				src: ['**/*.{png,gif,jpg}'],
				dest: '<%= conf.dev.images %>'
			},
			dist: {
				options: {
					optimizationLevel: 3
				},
				expand: true,
				cwd: '<%= conf.src.images %>',
				src: ['**/*.{png,gif,jpg}'],
				dest: '<%= conf.dist.images %>'
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= conf.src.images %>',
					src: ['**/*.svg'],
					dest: '<%= conf.dist.images %>',
					ext: '.svg'
				}]
			}
		}

	};

	return config;
};