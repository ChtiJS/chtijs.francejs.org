var gulp = require('gulp')
  , VarStream = require('varstream')
  , Fs = require('fs')
  , Path = require('path')
  , Nunjucks = require('nunjucks')
  , express = require('express')
  , tinylr = require('tiny-lr')
  , rimraf = require('rimraf')
;

require('matchdep').filterDev('gulp-*').forEach(function(module) {
  global[module.replace(/^gulp-/, 'g-').replace(/-([a-z])/g, function(x,xx) {
    return xx.toUpperCase();
  })] = require(module);
});

// Loading global options (files paths)
var conf = VarStream.parse(Fs.readFileSync(__dirname+'/config.dat'))
  , server;

// Starting the dev static server
if(!gulp.env.prod) {
  var app = express();
  app.use(express.query())
    .use(express.bodyParser())
    .use(express.static(Path.resolve(__dirname, conf.build.root)))
    .use(tinylr.middleware({ app: app }))
    .listen(35729, function() {
      console.log('Listening on %d', 35729);
    });
  server = app.server;
}

// Fonts
gulp.task('build_fonts', function() {
  gulp.src(conf.src.icons + '/**/*.svg', {buffer: conf.buffer})
    .pipe(gIconfont({
      'fontName': 'iconsfont',
      'appendCodepoints': true
    }))
    .pipe(gulp.dest(conf.build.fonts));
});

// Images
gulp.task('build_images', function() {
  gulp.src(conf.src.images + '/**/*.svg') // , {buffer: conf.buffer} no streams
    .pipe(gIf(!gulp.env.prod, gWatch()))
    .pipe(gIf(gulp.env.prod, gSvgmin()))
    .pipe(gIf(gulp.env.prod, gLivereload(server)))
    .pipe(gulp.dest(conf.build.images));

  gulp.src(conf.src.images + '/**/*.{png,jpg,jpeg,gif}') // , {buffer: conf.buffer} no streams
    .pipe(gIf(!gulp.env.prod, gWatch()))
    .pipe(gIf(gulp.env.prod, gImagemin()))
    .pipe(gIf(gulp.env.prod, gLivereload(server)))
    .pipe(gulp.dest(conf.build.images));
});

// CSS
gulp.task('build_styles', function() {
  gulp.src(conf.src.less + '/main.less') // , {buffer: conf.buffer} no streams
    .pipe(gLess())
    .pipe(gIf(gulp.env.prod, gMinifyCss()))
    .pipe(gIf(gulp.env.prod, gLivereload(server)))
    .pipe(gulp.dest(conf.build.css));
});

// JavaScript
gulp.task('build_js', function() {
  gulp.src(conf.src.js + '/**/*.js', {buffer: conf.buffer})
    .pipe(gJshint());

  gulp.src(conf.src.js + '/frontend.js', {buffer: conf.buffer && !gulp.env.prod}) // no streams in prod
    .pipe(gBrowserify())
    .pipe(gIf(gulp.env.prod, gUglify()))
    .pipe(gConcat('script.js'))
    .pipe(gulp.dest(conf.build.frontjs));

  gulp.src(conf.src.js + '/frontend/vendors/**/*.js')
    .pipe(gulp.dest(conf.build.frontjs + '/vendors'));
});

// HTML
gulp.task('build_html', function() {
  var nunjucks = Nunjucks
    , tree = {}
    , markedFiles = []
    , dest = gulp.dest(conf.build.root)
  ;
  
  nunjucks.configure('documents/templates/', {
    autoescape: true
  });

  gulp.src(conf.src.content + '/**/*.md') // , {buffer: conf.buffer} no streams
    .pipe(gMdvars())
    .pipe(gVartree({
      root: tree,
      index: 'index',
      parentProp: 'parent',
      childsProp: 'childs'
    }))
    .pipe(gMarked())
    .pipe(gRename({ext: '.html'}))
    .once('end', function() {
      markedFiles.forEach(function(file) {
        var nunjucksOptions = {
          env: conf.build.root,
          prod: gulp.env.prod,
          tree: tree,
          metadata: file.metas,
          content: file.contents.toString('utf-8')
        };
        // Render the template
        file.contents = Buffer(nunjucks.render(
          (nunjucksOptions.metadata.template || 'index') + '.tpl',
          nunjucksOptions
        ));
        // Save it.
        dest.write(file);
      });
      dest.end();
    })
    .on('data', function(file) {
      markedFiles.push(file);
    }).resume();
});

// The build task
gulp.task('build', function() {
  rimraf.sync(conf.build.root);
  gulp.run('build_fonts', 'build_images', 'build_styles', 'build_js', 'build_html');
  if(!gulp.env.prod) {
    gulp.watch([conf.src.icons + '/**/*.svg'], function(event) {
      gulp.run('build_fonts');
    });

    gulp.watch([
      conf.src.js + '/frontend/**/*.js',
      conf.src.js + '/frontend.js'
    ], function(event) {
      gulp.run('build_js');
    });

    gulp.watch([conf.src.less + '/**/*.less'], function(event) {
      gulp.run('build_css');
    });

    gulp.watch([conf.src.content + '/**/*.md'], function(event) {
      gulp.run('build_html');
    });
  }
});

// The default task
gulp.task('default', function() {
  gulp.run('build');
});
