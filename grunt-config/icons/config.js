module.exports = function(grunt, env) {

	var defaults = config = {

		icons2fonts: {
			dev: {},
			dist: {}
		},

		svgicons2svgfont: {
			options: {
				font: 'iconsfont',
				appendCodepoints: true
			},
			dev: {
				src: '<%= conf.src.icons %>/*.svg',
				dest: '<%= conf.dev.fonts %>'
			},
			dist: {
				src: '<%= conf.src.icons %>/*.svg',
				dest: '<%= conf.dist.fonts %>'
			}
		},

		svg2ttf: {
			dev: {
				src: '<%= conf.dev.fonts %>/*.svg',
				dest: '<%= conf.dev.fonts %>'
			},
			dist: {
				src: '<%= conf.dist.fonts %>/*.svg',
				dest: '<%= conf.dist.fonts %>'
			}
		},

		ttf2eot: {
			dev: {
				src: '<%= conf.dev.fonts %>/*.ttf',
				dest: '<%= conf.dev.fonts %>'
			},
			dist: {
				src: '<%= conf.dist.fonts %>/*.ttf',
				dest: '<%= conf.dist.fonts %>'
			}
		},

		ttf2woff: {
			dev: {
				src: '<%= conf.dev.fonts %>/*.ttf',
				dest: '<%= conf.dev.fonts %>'
			},
			dist: {
				src: '<%= conf.dist.fonts %>/*.ttf',
				dest: '<%= conf.dist.fonts %>'
			}
		}
	};

	return config;

};