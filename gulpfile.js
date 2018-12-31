'use strict';

var fs = require('fs');
var path = require('path');

var Nunjucks = require('nunjucks');
var moment = require('moment');

var express = require('express');
var rimraf = require('rimraf');
var args = require('yargs').argv;
var internalIp = require('internal-ip');

var buildBranch = require('buildbranch');

var VarStream = require('varstream');

var CombineStream = require('combine-stream');
var filter = require('streamfilter');

var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var gGhmembers = require('./gulpplugins/ghmembers');
var gGhcontributors = require('./gulpplugins/ghcontributors');
var gPlanet = require('./gulpplugins/planet');

var rem2px = require('rework-rem2px');
var queryless = require('css-queryless');

var browserify = require('browserify');

// Loading global options (files paths)
var conf = VarStream.parse(
  fs.readFileSync(path.join(__dirname, '/config.dat'))
);

// Reading args options
var prod = !!args.prod;
var lr = !args.nolr && !prod;
var watch = !args.nowatch && !prod;
var buffer = !args.stream;
var browser = !args.nobro && !prod;
var httpServer = !args.nosrv && !prod;
var req = !args.noreq || prod;

if (!prod) {
  // Finding the server IP
  conf.ip = args.ip
    ? 'auto' === args.ip
      ? internalIp.v4.sync()
      : args.ip
    : '127.0.0.1';
  conf.port = 9001;
  conf.baseURL = 'http://' + conf.ip + ':' + conf.port;
}
// Configure nunjuncks
Nunjucks.configure(conf.src.templates, {
  watch: watch,
  autoescape: true,
}).addFilter('date', function(date, lang) {
  return moment(date)
    .locale(lang)
    .format('LLLL');
});

// Fonts
gulp.task('build_fonts', function() {
  return gulp
    .src(conf.src.icons + '/**/*.svg', { buffer: buffer })
    .pipe(
      g.iconfont({
        fontName: 'iconsfont',
        appendCodepoints: true,
        hint: !!g.util.env.hint,
      })
    )
    .pipe(gulp.dest(conf.build.fonts));
});

// Images
gulp.task('build_images', function() {
  var stream = new CombineStream([
    gulp
      .src(conf.src.images + '/**/*.svg', { buffer: buffer })
      .pipe(g.cond(watch, g.watch.bind(g, conf.src.images + '/**/*.svg')))
      .pipe(g.cond(prod, g.svgmin)),
    gulp
      .src(conf.src.images + '/**/*.{png,jpg,jpeg,gif}', { buffer: buffer })
      .pipe(
        g.cond(
          watch,
          g.watch.bind(g, conf.src.illustrations + '/**/*.{png,jpg,jpeg,gif}')
        )
      ),
    gulp
      .src(conf.src.images + '/favicon.svg', { buffer: buffer })
      .pipe(g.cond(watch, g.watch.bind(g, conf.src.images + '/chtijs.svg')))
      // https://groups.google.com/forum/#!topic/nodejs/SxNKLclbM5k
      .pipe(
        g.spawn({
          cmd: '/bin/sh',
          args: [
            '-c',
            'cat |  convert -background none -resize 32x32 svg:/dev/stdin png:/dev/stdout | cat',
          ],
          filename: function() {
            return 'favicon.png';
          },
        })
      ),
  ])
    .pipe(g.cond(prod, g.streamify.bind(null, g.imagemin)))
    .pipe(g.cond(lr, g.livereload))
    .pipe(gulp.dest(conf.build.images));

  if (prod) {
    return stream;
  }
});

// CSS
gulp.task('build_styles', function() {
  var keepmatches = ['screen and (min-width: 61rem)', 'print'];

  return gulp
    .src(conf.src.less + '/main.less', { buffer: buffer })
    .pipe(g.streamify(g.less))
    .pipe(g.streamify(g.autoprefixer))
    .pipe(g.cond(prod, g.minifyCss))
    .pipe(g.cond(lr, g.livereload))
    .pipe(gulp.dest(conf.build.css))
    .pipe(g.rework(queryless(keepmatches), rem2px(16)))
    .pipe(
      g.rename({
        suffix: '-ie',
      })
    )
    .pipe(gulp.dest(conf.build.css));
});

// JavaScript
gulp.task('build_scripts', function(cb) {
  browserify(path.join(conf.src.scripts + '/index.js')).once('end', cb);
});

// HTML
gulp.task('build_html', function(cb) {
  var tree = {};
  var markedFiles = [];
  var dest = gulp.dest(conf.build.root);

  // Setting copyright end
  conf.build.created = new Date().toISOString();

  if (lr) {
    dest.pipe(g.livereload());
  }

  var mdFilter = filter(
    function(file, enc, cb) {
      cb(file.path.indexOf('.md') === file.path.length - 4);
    },
    { objectMode: true, restore: true, passthrough: true }
  );

  var draftFilter = filter(
    function(file, enc, cb) {
      cb(file.metadata.draft);
    },
    { objectMode: true, restore: false, passthrough: true }
  );

  var ghostFilter = filter(
    function(file, enc, cb) {
      cb(file.metadata.ghost);
    },
    { objectMode: true, restore: true, passthrough: true }
  );

  var sourceStreams = [
    // Streams not supported yet
    gulp
      .src(conf.src.content + '/**/*.{html,md}', { buffer: buffer || true })
      .pipe(
        g.mdvars({
          prop: 'metadata',
        })
      ),
  ];

  if (req) {
    sourceStreams.push(
      gGhcontributors({
        organization: 'ChtiJS',
        project: 'chtijs.francejs.org',
        base: conf.src.content,
        buffer: buffer || true, // Streams not supported
      }),
      gGhmembers({
        organization: 'ChtiJS',
        base: conf.src.content,
        buffer: buffer || true, // Streams not supported
      }),
      gPlanet({
        base: conf.src.content,
        blogs: conf.blogs,
        buffer: buffer || true, // Streams not supported
      })
    );
  }

  var contentStream = new CombineStream(sourceStreams)
    .pipe(draftFilter)
    .pipe(ghostFilter)
    .pipe(
      g.vartree({
        root: tree,
        index: 'index',
        prop: 'metadata',
        parentProp: 'parent',
        childsProp: 'childs',
        sortProp: 'published',
        sortDesc: true,
      })
    )
    .pipe(ghostFilter.restore)
    .pipe(mdFilter)
    .pipe(
      g.marked({
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: true,
      })
    )
    .pipe(g.rename({ extname: '.html' }))
    .pipe(mdFilter.restore)
    .once('end', function() {
      var rootItems = {};

      // Registering languages sections
      tree.childs.forEach(function(item) {
        rootItems[item.lang] = item;
      });
      markedFiles.forEach(function(file) {
        (file.metadata.types || ['html']).forEach(function(type, i) {
          var curFile = file;
          var nunjucksOptions = {
            env: conf.build.root,
            prod: prod,
            tree: tree,
            conf: conf,
            type: type,
            root: rootItems[curFile.metadata.lang],
            metadata: curFile.metadata,
            content: curFile.contents.toString('utf-8'),
          };

          if (0 < i) {
            curFile = file.clone();
          }
          if ('html' !== type) {
            curFile.path =
              curFile.path.substr(0, curFile.path.length - 4) + type;
          }
          // Render the template
          curFile.contents = new Buffer(
            Nunjucks.render(
              type +
                '/' +
                (nunjucksOptions.metadata.template || 'page') +
                '.tpl',
              nunjucksOptions
            )
          );
          // Save it.
          dest.write(curFile);
        });
      });
      dest.end();
      cb();
    })
    .on('readable', function() {
      var file;

      while ((file = contentStream.read())) {
        markedFiles.push(file);
      }
    });
});

// The clean task
gulp.task('clean', function() {
  rimraf.sync(conf.build.root);
});

// The build task
gulp.task(
  'build',
  ['clean', 'build_fonts', 'build_images', 'build_styles', 'build_html'],
  function(cb) {
    // Robots.txt
    fs.writeFileSync(
      conf.build.root + '/robots.txt',
      'User-agent: *\r\nAllow: /\r\n'
    );

    // Files watch
    if (watch) {
      gulp.watch(
        [conf.src.js + '/frontend/**/*.js', conf.src.js + '/frontend.js'],
        ['build_js']
      );

      gulp.watch([conf.src.less + '/**/*.less'], ['build_styles']);

      gulp.watch(
        [conf.src.content + '/**/*', conf.src.templates + '/**/*.tpl'],
        ['build_html']
      );

      gulp.watch([conf.src.icons + '/**/*.svg'], ['build_fonts']);
    }

    // Livereload
    if (lr) {
      console.log('Starting livereload.');
      g.livereload.listen({
        basePath: conf.build.root,
      });
    }

    // Open the browser
    if (browser) {
      require('open')(conf.baseURL + '/index.html');
    }

    cb();
  }
);

// Publish task
gulp.task('ghpages', function(cb) {
  buildBranch(
    {
      ignore: ['.git', '.token', 'www', 'node_modules'],
      domain: conf.domain,
    },
    function(err) {
      if (err) {
        throw err;
      }
      cb();
    }
  );
});

// Publish
gulp.task('publish', ['ghpages']);

// Dev env
gulp.task('server', function(cb) {
  // Starting the dev static server
  if (httpServer) {
    express()
      .use(express.query())
      .use(express.static(path.resolve(__dirname, conf.build.root)))
      .listen(conf.port, conf.ip, function() {
        g.util.log('Dev server listening on %s:%d', conf.ip, conf.port);
        cb();
      });
  }
});

// The default task
gulp.task('default', ['server', 'build'].slice(prod ? 1 : 0));
