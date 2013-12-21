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
				src: 'documents/icons/*.svg',
				dest: 'www/fonts'
			},
			dist: {
				src: 'documents/icons/*.svg',
				dest: 'dist/fonts'
			}
		},

		svg2ttf: {
			dev: {
				src: 'www/fonts/*.svg',
				dest: 'www/fonts'
			},
			dist: {
				src: 'dist/fonts/*.svg',
				dest: 'dist/fonts'
			}
		},

		ttf2eot: {
			dev: {
				src: 'www/fonts/*.ttf',
				dest: 'www/fonts'
			},
			dist: {
				src: 'dist/fonts/*.ttf',
				dest: 'dist/fonts'
			}
		},

		ttf2woff: {
			dev: {
				src: 'www/fonts/*.ttf',
				dest: 'www/fonts'
			},
			dist: {
				src: 'dist/fonts/*.ttf',
				dest: 'dist/fonts'
			}
		}
	};

	return config;

};