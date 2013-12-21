module.exports = function(grunt) {

	var
	defaults = config = {
		/* Compilation Less */
		less: {
			dev: {
				src: 'documents/less/main.less',
				dest: 'www/css/main.css',
				options: {
					cssmin: true
				}
			},
			dist: {
				src: 'documents/less/main.less',
				dest: 'dist/css/main.css'
			}
		},

		browserify: {
			frontend: {
				src: 'src/frontend.js',
				dest: 'www/javascript/script.js',
				options: {
					standalone: 'chtijs'
				}
			}
		},


		rem2px: {
			dev: {
				expand: true,
				cwd: 'www/css',
				src: ['**/*.css', '!**/*.*.css'],
				dest: 'www/css',
				ext: '.ie.css',
				options: {
					rootSize: 16 // taille de base en px
				}
			},
			dist: {
				expand: true,
				cwd: 'www/css',
				src: ['**/*.css', '!**/*.*.css'],
				dest: 'www/css',
				ext: '.ie.css',
				options: {
					rootSize: 16 // taille de base en px
				}
			}
		}
	};

	return config;
};