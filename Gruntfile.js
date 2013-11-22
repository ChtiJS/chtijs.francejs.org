// Todo : svgmin / svg rasterize / server : start on dev / restart on file change

module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    grunt.initConfig({

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
          dest: 'www/css/screen.css'
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
          tasks: ['less:main'],
          options: {
            livereload: false
          }
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
          files: ['www/css/*.css']
        },
        frontscripts: {
          files: ['src/frontend.js','src/front/**/*.js'],
          tasks: ['browserify:frontend']
        },
        backscripts: {
          files: ['src/backend.js','src/back/**/*.js']
        }
      }
    });

    grunt.registerTask('icons2fonts', [
        'svgicons2svgfont:icons',
        'svg2ttf:icons',
        'ttf2eot:icons',
        'ttf2woff:icons'
    ]);

    grunt.registerTask('dev', [
        'watch'
    ]);

    grunt.registerTask('dist', [
        'icons2fonts',
        'less:main',
        'cssmin',
        'imagemin',
        'svgmin'
    ]);

    grunt.registerTask('default', [
        'dist'
    ]);
};
