// Todo : 
// - svgmin / svg rasterize 
// - improve the generated stylesheet
// - concatening the generated stylesheet to a user stylesheet
// - deciding about a build system for markdown content

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: ['Gruntfile.js']
      }
    },

    svgicons2svgfont: {
      icons: {
        options: {
          font: 'iconsfont',
          appendCodepoints: true
        },
        src: 'documents/icons/*.svg',
        dest: 'www/fonts'
      }
    },

    svg2ttf: {
      icons: {
        src: 'www/fonts/*.svg',
        dest: 'www/fonts'
      }
    },

    ttf2eot: {
      icons: {
        src: 'www/fonts/*.ttf',
        dest: 'www/fonts'
      }
    },

    ttf2woff: {
      icons: {
        src: 'www/fonts/*.ttf',
        dest: 'www/fonts'
      }
    },

    less: {
      main: {
        src: 'documents/less/main.less',
        dest: 'www/css/pictofont.css'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'www/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'www/css/',
        ext: '.min.css'
      }
    },

    imagemin: {
      minify: {
        options: {
          optimizationLevel: 3
        },
        expand: true,
        cwd: 'documents/images',
        src: ['**/*.{png,gif,jpg}'],
        dest: 'www/images/'
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'documents/images',
          src: ['**/*.svg'],
          dest: 'www/images/',
          ext: '.svg'
        }]
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
    watch: {
      options: {
        livereload: true
      },
      icons: {
        files: ['documents/icons/*.svg'],
        tasks: ['icons2fonts']
      },
      less: {
        files: ['documents/less/*.less'],
        tasks: ['less:main']
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
        files: ['www/css/*.css','!www/css/screen.css'] //on ramasse les CSS, mais on exclut les fichiers générés du watch
      },
      frontscripts: {
        files: ['src/frontend.js', 'src/front/**/*.js'],
        tasks: ['browserify:frontend']
      },
      backscripts: {
        files: ['src/backend.js', 'src/back/**/*.js']
      }
    }
  });

  grunt.registerTask('icons2fonts', 'Converts svg icons to webfonts', [
    'svgicons2svgfont:icons',
    'svg2ttf:icons',
    'ttf2eot:icons',
    'ttf2woff:icons'
  ]);

  grunt.registerTask('dev', 'Run website locally and start watch process (living document).', [
    'icons2fonts',
    'less:main',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('dist','Build the website ready for production', [
    'icons2fonts',
    'less:main',
    'cssmin',
    'imagemin',
    'svgmin'
  ]);

  grunt.registerTask('default', [
    'jshint:gruntfile'
  ]);
};