module.exports = function(grunt) {

	var
	defaults = config = {
		/* Compilation Less */
		less: {
			dev: {
				src: '<%= conf.src.stylesheets %>/main.less',
				dest: '<%= conf.dev.css %>/main.css',
				options: {
					cssmin: true
				}
			},
			dist: {
				src: '<%= conf.src.stylesheets %>/main.less',
				dest: '<%= conf.dist.css %>/main.css'
			}
		},

		browserify: {
		 	dev: {
		 		src: '<%= conf.src.scripts %>/frontend.js',
		 		dest: '<%= conf.dev.scripts %>/script.js'
		 	},
		 	dist: {
		 		src: '<%= conf.src.scripts %>/frontend.js',
		 		dest: '<%= conf.dist.scripts %>/script.js'
		 	}
		},


		rem2px: {
			dev: {
				expand: true,
				cwd: '<%= conf.dev.css %>',
				src: ['**/*.css', '!**/*.*.css'],
				dest: '<%= conf.dev.css %>',
				ext: '.ie.css',
				options: {
					rootSize: 16 // taille de base en px
				}
			},
			dist: {
				expand: true,
				cwd: '<%= conf.dist.css %>',
				src: ['**/*.css', '!**/*.*.css'],
				dest: '<%= conf.dist.css %>',
				ext: '.ie.css',
				options: {
					rootSize: 16 // taille de base en px
				}
			}
		}
	};

	return config;
};
