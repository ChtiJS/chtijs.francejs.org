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

  grunt.registerMultiTask('init_env', 'create directories for dev and build', function() {
    var options = this.options();
    var base = options.targetBase+'/';
    grunt.log.writeln("directory creation...");
    
    grunt.log.writeln(base+options.targetImages);
    grunt.file.mkdir(base+options.targetImages);

    grunt.log.writeln(base+options.targetFonts);
    grunt.file.mkdir(base+options.targetFonts);
    
    grunt.log.writeln(base+options.targetCSS);
    grunt.file.mkdir(base+options.targetCSS);

    grunt.log.writeln(base+options.targetScripts);
    grunt.file.mkdir(base+options.targetScripts);

  });


  grunt.registerTask('dev', 'Run website locally and start watch process (living document).', function() {

    grunt.task.run([
      'clean:dev',
      'init_env:dev',
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

    grunt.task.run([
      'clean:dist',
      'init_env:dist',
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
  grunt.registerMultiTask('rem2px', 'Replace any rem unit by it\'s'
    + ' px equivalent', function() {
    var options = this.options({
      rootSize: grunt.option('rootSize') || ""
    });

    this.files.forEach(function(file) {
      grunt.file.write(file.dest,
        grunt.file.read(file.src).replace(/([0-9]+(?:.[0-9]*)?|[0-9]*.[0-9]+?)rem/g,
          function(i, value) {
            return (value*options.rootSize)+'px';
          }
        )
      );
      grunt.log.writeln('File "' + file.dest + '" created.');
    });

  });

  /* HTML page builder */
  grunt.registerMultiTask('build_content', 'build the website html pages', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      base_url: grunt.option('base_url') ? grunt.option('base_url') : ""
    });

    // chargeur et convertisseur de fichiers markdown
    var marked = require('marked');

    // chargeur méta données
    var VarStream = require('varstream');

    // listing des billets de blog
    var posts = [];
    grunt.file.expand('documents/contents/archives/*/*.md').forEach(function(file) {
      var matches = grunt.file.read(file).match(/^(?:[^]*)<!-- varstream([^]*)-->(?:[^]*)$/im);
      if(matches) {
        new VarStream(posts, ''+posts.length).write(matches[1]);
      } else {
        throw Error('No metadatas found for the post in the file "' + file + '".');
      }
      posts[posts.length-1].href = file.substring(28,39);
    });
    
    // tri par date
    posts.sort(function(post1, post2) {
      if(new Date(post1.created).getTime() < new Date(post2.created).getTime()) {
        return 1;
      }
      return -1;
    });

    // moteur de templates
    var nunjucks = require('nunjucks');
    nunjucks.configure('documents/templates/', {
      autoescape: true
    });

    // chargement du menu
    var menuDatas = grunt.file.read('documents/data/menu.dat');

    // pour chaque fichier ramassé par la configuration
    this.files.forEach(function(file) {

      var nunjucksOptions = {
        env: grunt.task.target,
        metadata_site: options,
        posts: posts
      };

      var aMDContent = grunt.file.read(file.src);

      // lis les méta-données
      var matches = aMDContent.match(/^([^]*)<!-- varstream([^]*)-->([^]*)$/im);
      if(matches) {
        new VarStream(nunjucksOptions,'metadata').write(matches[2]);
      }
      
      // ajoute le menu
      new VarStream(nunjucksOptions,'menu').write(menuDatas);
      
      // marque l'item sélectioné
      // Pas de récursion dans NunJucks:(, mais prêt pour plus tard
      function setSelected(parent) {
        parent.forEach(function(item) {
          var href = item.href.lastIndexOf('/') === item.href.length - 1 ?
            item.href + 'index.html' :
            item.href;
          item.parent = parent;
          if(file.dest.substr(3) === href) {
            do {
              item.selected = true;
              item = item.parent && item !== nunjucksOptions.menu ?
                item.parent :
                null;
            } while(item)
          } else if(item.childs) {
            item.childs.forEach(setSelected(item));
          }
        });
      }
      setSelected(nunjucksOptions.menu);

      // convertir le mardown en html
      nunjucksOptions.content = marked(matches ? matches[1]+matches[3] : aMDContent);

      // transmettre le tout aux templates
      var finalHtml = nunjucks.render(
        (nunjucksOptions.metadata.template || 'index') + '.tpl',
        nunjucksOptions);

      // écrire le fichier
      grunt.file.write(file.dest, finalHtml);
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });


  grunt.initConfig({

    clean: {
      //nettoyer les répertoires de build
      dev: ["www/*"],
      dist: ["dist/*"]
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
    },
    
    init_env:{
      options:{
          targetImages: "images",
          targetScripts: "js",
          targetFonts: "fonts",
          targetCSS: "css"
      },
      dist:{
        options:{
          targetBase: "./dist",
        }
      },
      dev:{
        options:{
          targetBase: "./www",
        }
      }
    },

    rem2px: {
      dev: {
        expand: true,
        cwd: 'www/css',
        src: ['**/*.css','!**/*.*.css'],
        dest: 'www/css',
        ext: '.ie.css',
        options: {
          rootSize: 16 // taille de base en px
        }
      },
      dist: {
        expand: true,
        cwd: 'www/css',
        src: ['**/*.css','!**/*.*.css'],
        dest: 'www/css',
        ext: '.ie.css',
        options: {
          rootSize: 16 // taille de base en px
        }
      }
    },

    build_content: {
      dev: {
        expand: true,
        cwd: 'documents/contents',
        src: ['**/*.md'],
        dest: 'www/',
        ext: '.html',
        options: {
          targetBase: ""
        }
      },

      dist: {
        expand: true,
        cwd: 'documents/contents',
        src: ['**/*.md'],
        dest: 'dist/',
        ext: '.html',
        options: {
          targetBase: "./dist",
          base_url: "http://smdlsld.fr"
        }
      }
    }
  });
};
