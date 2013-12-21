module.exports = function(grunt) {

	var
	defaults = config = {

		imagemin: {
			dev: {
				options: {
					optimizationLevel: 3
				},
				expand: true,
				cwd: 'documents/images',
				src: ['**/*.{png,gif,jpg}'],
				dest: 'www/images/'
			},
			dist: {
				options: {
					optimizationLevel: 3
				},
				expand: true,
				cwd: 'documents/images',
				src: ['**/*.{png,gif,jpg}'],
				dest: 'dist/images/'
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'documents/images',
					src: ['**/*.svg'],
					dest: 'dist/images/',
					ext: '.svg'
				}]
			}
		}

	};

	return config;
};