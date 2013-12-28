module.exports = function(grunt) {
	var defaults = config = {
		/* Serveur pour le livereload */
		connect: {
			livereload: {
				options: {
					port: 9001,
					// Change hostname to '0.0.0.0' to access
					// the server from outside.
					hostname: '0.0.0.0',
					base: '<%= conf.dev.root %>/',
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
				files: ['<%= conf.src.icons %>/*.svg'],
				tasks: ['icons2fonts:dev']
			},
			less: {
				files: ['<%= conf.src.stylesheets %>/*.less'],
				tasks: ['less:dev']
			},
			svgimages: {
				files: ['<%= conf.src.images %>/*.svg'],
				tasks: ['svgmin:dev']
			},
			bitmapimages: {
				files: ['<%= conf.src.images %>/*.{png,gif,jpg}'],
				tasks: ['imagemin:dev']
			},
			css: {
				files: ['<%= conf.dev.css %>/*.css', '!<%= conf.dev.css %>/*.min.css', '!<%= conf.dev.css %>/*.ie.css'],
				tasks: ['rem2px:dev']
			},
			data: {
				files: ['<%= conf.src.data %>/**/*.dat'],
				tasks: ['build_content:dev']
			},
			content: {
				files: ['<%= conf.src.content %>/**/*.md'],
				tasks: ['build_content:dev']
			},
			templates: {
				files: ['<%= conf.src.templates %>/**/*.tpl'],
				tasks: ['build_content:dev']
			},
			frontscripts: {
				files: ['<%= conf.src.scripts %>/frontend.js', '<%= conf.src.scripts %>/front/**/*.js'],
				tasks: ['browserify:frontend']
			},
			backscripts: {
				files: ['<%= conf.src.scripts %>/backend.js', '<%= conf.src.scripts %>/back/**/*.js']
			}
		}
	};
	return config;
};