module.exports = function(grunt) {

	var
	defaults = config = {
		//nettoyer les répertoires de build
		clean: {
			dev: ['./www/*'],
			dist: ['./dist/*']
		},

		init_env: {
			options: {
				targetImages: "images",
				targetScripts: "js",
				targetFonts: "fonts",
				targetCSS: "css"
			},
			dist: {
				options: {
					targetBase: "./dist",
				}
			},
			dev: {
				options: {
					targetBase: "./www",
				}
			}
		},

		copy: {
			images_dev: {
				expand: true,
				cwd: 'documents/images/',
				src: '**',
				dest: 'www/images/',
				flatten: true,
				filter: 'isFile'
			},
			images_dist: {
				expand: true,
				cwd: 'documents/images/',
				src: '**',
				dest: 'dist/images/',
				flatten: true,
				filter: 'isFile'
			},
			css_dev: {
				expand: true,
				cwd: 'documents/css',
				src: '**',
				dest: 'www/css/',
				flatten: true,
				filter: 'isFile'
			},
			css_dist: {
				expand: true,
				cwd: 'documents/css',
				src: '**',
				dest: 'dist/css/',
				flatten: true,
				filter: 'isFile'
			}
		}

	};

	return config;

};