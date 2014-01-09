var gulp = require('gulp')
  , VarStream = require('varstream')
  , Fs = require('fs')
;

require('matchdep').filterDev('gulp-*').forEach(function(module) {
  global[module.replace(/^gulp-/, 'g-').replace(/-([a-z])/g, function(x,xx) {
    return xx.toUpperCase();
  })] = require(module);
});

// Loading global options (files paths)
var conf = VarStream.parse(Fs.readFileSync(__dirname+'/config.dat'));

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
    .pipe(gulp.dest(conf.build.images));

  gulp.src(conf.src.images + '/**/*.{png,jpg,jpeg,gif}') // , {buffer: conf.buffer} no streams
    .pipe(gIf(!gulp.env.prod, gWatch()))
    .pipe(gIf(gulp.env.prod, gImagemin()))
    .pipe(gulp.dest(conf.build.images));
});

// CSS
gulp.task('build_styles', function() {
  gulp.src(conf.src.less + '/main.less') // , {buffer: conf.buffer} no streams
    .pipe(gLess())
    .pipe(gIf(gulp.env.prod, gMinifyCss()))
    .pipe(gulp.dest(conf.build.css));
});

// JavaScript
gulp.task('build_js', function() {
  gulp.src(conf.src.js + '/**/*.js', {buffer: conf.buffer})
    .pipe(gJshint());

  gulp.src(conf.src.js + '/frontend.js', {buffer: conf.buffer && !gulp.env.prod}) // no streams in prod
    .pipe(gBrowserify())
    .pipe(gIf(gulp.env.prod, gUglify()))
    .pipe(gConcat('dest.js'))
    .pipe(gulp.dest(conf.build.frontjs));
});

// The build task
gulp.task('build', function() {
  gulp.run('build_fonts', 'build_images', 'build_styles', 'build_js');
  if(false === gulp.env.prod) {
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
  }
});

// The default task
gulp.task('default', function() {
  gulp.run('build');
});
