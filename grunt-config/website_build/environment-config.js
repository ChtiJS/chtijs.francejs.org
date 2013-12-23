module.exports = function(grunt) {

	var
	defaults = config = {
		//nettoyer les répertoires de build
		clean: {
			dev: ['<%= conf.dev.root %>/*'],
			dist: ['<%= conf.dist.root %>/*']
		},

		init_env: {
			dist: {
				options: {
					targetBase: "<%= conf.dist.root %>",
					targetImages: "<%= conf.dist.images %>",
					targetScripts: "<%= conf.dist.scripts %>",
					targetFonts: "<%= conf.dist.fonts %>",
					targetCSS: "<%= conf.dist.css %>"
				}
			},
			dev: {
				options: {
					targetBase: "<%= conf.dev.root %>",
					targetImages: "<%= conf.dev.images %>",
					targetScripts: "<%= conf.dev.scripts %>",
					targetFonts: "<%= conf.dev.fonts %>",
					targetCSS: "<%= conf.dev.css %>"
				}
			}
		},

		copy: {
			images_dev: {
				expand: true,
				cwd: '<%= conf.src.images %>',
				src: '**',
				dest: '<%= conf.dev.images %>',
				flatten: true,
				filter: 'isFile'
			},
			images_dist: {
				expand: true,
				cwd: '<%= conf.src.images %>',
				src: '**',
				dest: '<%= conf.dist.images %>',
				flatten: true,
				filter: 'isFile'
			},
			css_dev: {
				expand: true,
				cwd: '<%= conf.src.css %>',
				src: '**',
				dest: '<%= conf.dev.css %>',
				flatten: true,
				filter: 'isFile'
			},
			css_dist: {
				expand: true,
				cwd: '<%= conf.src.css %>',
				src: '**',
				dest: '<%= conf.dist.css %>',
				flatten: true,
				filter: 'isFile'
			}
		}

	};

	return config;

};