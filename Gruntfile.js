// Todo : 
// - svgmin / svg rasterize 
// - improve the generated stylesheet
// - concatening the generated stylesheet to a user stylesheet

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerMultiTask('icons2fonts', 'Converts svg icons to webfonts', function() {
    var targetStr = "";
    if (this.target) {
      targetStr = ":" + this.target;
    }
    grunt.task.run([
      'svgicons2svgfont' + targetStr,
      'svg2ttf' + targetStr,
      'ttf2eot' + targetStr,
      'ttf2woff' + targetStr
    ]);
  });

  grunt.registerTask('dev', 'Run website locally and start watch process (living document).', function() {
    
    grunt.task.run('clean:dev');
    
    grunt.file.mkdir('./www/images');
    grunt.file.mkdir('./www/fonts');
    grunt.file.mkdir('./www/css');
    grunt.file.mkdir('./www/js');
    
    grunt.task.run([
      'icons2fonts:dev',
      'less:dev',
      'copy:images_dev',
      'copy:css_dev',
      'build_content:dev',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('dist', 'Build the website ready for production', function() {
    
    grunt.task.run('clean:dist');
    
    grunt.file.mkdir('./dist/images');
    grunt.file.mkdir('./dist/fonts');
    grunt.file.mkdir('./dist/css');
    grunt.file.mkdir('./dist/js');
    
    grunt.task.run([
      'icons2fonts:dist',
      'less:dist',
      'copy:css_dist',
      'cssmin:dist',
      'imagemin:dist',
      'svgmin:dist',
      'build_content:dist'
    ]);
  });

  grunt.registerTask('default', [
    'jshint:gruntfile'
  ]);

  /* HTML page builder */
  grunt.registerMultiTask('build_content', 'build the website html pages', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      base_url: grunt.option('base_url') ? grunt.option('base_url') : ""
    });

    //chargeur et convertisseur de fichiers markdown
    var marked = require('marked');

    //moteur de templates
    var nunjucks = require('nunjucks');
    nunjucks.configure('documents/templates/', {
      autoescape: true
    });

    //charger les metadata du site
    //var metadata_site =;  

    //pour chaque fichier ramassé par la configuration
    this.files.forEach(function(file) {
      //convertir le mardown en html
      var html = marked(grunt.file.read(file.src));

      // transmettre le tout aux templates
      var finalHtml = nunjucks.render('index.tpl', {
        env: grunt.task.target,
        content: html,
        metadata: {}, //TODO
        metadata_site: options
      });

      // écrire le fichier
      grunt.file.write(file.dest, finalHtml);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });


  grunt.initConfig({

    clean: {
      //nettoyer les répertoires de build
      dev: ["www/**/*.*"],
      dist: ["dist/**/*.*"]
      // fonts: ['www/fonts/**/*.*'],
      // images_all: ['www/images/**/*.*'],
      // images_svg: ['www/images/**/*.svg'],
      // css: ['www/css/**/*.*'],
      // html: ['www/**/*.html']
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
    },

    // linting js avec reporter ameliore
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      //vérification du gruntfile
      gruntfile: {
        src: ['Gruntfile.js']
      }
    },

    /**** Tâches de conversion SVG -> webfonts **************/
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
    },

    /* Compilation Less */
    less: {
      dev: {
        src: 'documents/less/main.less',
        dest: 'www/css/pictofont.css'
      },
      dist: {
        src: 'documents/less/main.less',
        dest: 'dist/css/pictofont.css'
      }
    },

    cssmin: {
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },

    imagemin: {
      dev: {
        options: {
          optimizationLevel: 3
        },
        expand: true,
        cwd: 'documents/images',
        src: ['**/*.{png,gif,jpg}'],
        dest: 'www/images/'
      },
      dist: {
        options: {
          optimizationLevel: 3
        },
        expand: true,
        cwd: 'documents/images',
        src: ['**/*.{png,gif,jpg}'],
        dest: 'dist/images/'
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'documents/images',
          src: ['**/*.svg'],
          dest: 'dist/images/',
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
        files: ['www/css/*.css', '!www/css/pictofont.css'] //on ramasse les CSS, mais on exclut les fichiers générés par la tâche less
      },
      content: {
        files: ['documents/contenu/**/*.md'],
        tasks: ['build_content']
      },
      templates: {
        files: ['documents/templates/**/*.tpl']
      },
      frontscripts: {
        files: ['src/frontend.js', 'src/front/**/*.js'],
        tasks: ['browserify:frontend']
      },
      backscripts: {
        files: ['src/backend.js', 'src/back/**/*.js']
      }
    },
    build_content: {
      options: {
        base_url: ""
      },
      dev: {
        expand: true,
        cwd: 'documents/contenu',
        src: ['**/*.md'],
        dest: 'www/',
        ext: '.html'
      },
      dist: {
        expand: true,
        cwd: 'documents/contenu',
        src: ['**/*.md'],
        dest: 'dist/',
        ext: '.html',
        options: {
          base_url: "http://smdlsld.fr"
        }
      }
    }
  });
};