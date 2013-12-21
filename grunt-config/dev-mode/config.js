module.exports = function(grunt) {
	var defaults = config = {
		/* Serveur pour le livereload */
		connect: {
			livereload: {
				options: {
					port: 9001,
					// Change hostname to '0.0.0.0' to access
					// the server from outside.
					hostname: 'localhost',
					base: 'www/',
					open: true,
					livereload: true
				}
			}
		},

		/* 
      Surveiller les fichiers, si changement, retraitement 
      et reload automatique du navigateur 
    */
		watch: {
			options: {
				livereload: true
			},
			icons: {
				files: ['documents/icons/*.svg'],
				tasks: ['icons2fonts:dev']
			},
			less: {
				files: ['documents/less/*.less'],
				tasks: ['less:dev']
			},
			svgimages: {
				files: ['documents/images/*.svg'],
				tasks: ['svgmin:dist']
			},
			bitmapimages: {
				files: ['documents/images/*.{png,gif,jpg}'],
				tasks: ['imagemin:dist']
			},
			css: {
				files: ['www/css/*.css', '!www/css/*.min.css', '!www/css/*.ie.css'],
				tasks: ['rem2px:dist']
			},
			data: {
				files: ['documents/data/**/*.dat'],
				tasks: ['build_content']
			},
			content: {
				files: ['documents/contents/**/*.md'],
				tasks: ['build_content']
			},
			templates: {
				files: ['documents/templates/**/*.tpl'],
				tasks: ['build_content']
			},
			frontscripts: {
				files: ['src/frontend.js', 'src/front/**/*.js'],
				tasks: ['browserify:frontend']
			},
			backscripts: {
				files: ['src/backend.js', 'src/back/**/*.js']
			}
		}
	};
	return config;
};