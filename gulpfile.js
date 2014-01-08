var gulp = require('gulp')
  , VarStream = require('varstream')
  , Fs = require('fs')
;

require('matchdep').filterDev('gulp-*').forEach(function(module) {
  global[module.replace(/^gulp-/, 'g-').replace(/-([a-z])/g, function(x,xx) {
    return xx.toUpperCase();
  })] = require(module);
});

var opt = {buffer: true};

//chargement des options globales (filepaths)
var stream = new VarStream(opt, 'conf');
stream.write(Fs.readFileSync(__dirname+'/config.dat'));
stream.end();

// Fonts
gulp.task('build_fonts', function() {
  gulp.src(opt.conf.src.icons + '/**/*.svg', {buffer: opt.conf.buffer})
    .pipe(gIconfont({
      'fontName': 'iconsfont',
      'appendCodepoints': true
    }))
    .pipe(gulp.dest(opt.conf.build.fonts));
});

// Images
gulp.task('build_images', function() {
  gulp.src(opt.conf.src.images + '/**/*.svg') // , {buffer: opt.conf.buffer} no streams
    .pipe(gIf(!gulp.env.prod, gWatch()))
    .pipe(gIf(gulp.env.prod, gSvgmin()))
    .pipe(gulp.dest(opt.conf.build.images));

  gulp.src(opt.conf.src.images + '/**/*.{png,jpg,jpeg,gif}') // , {buffer: opt.conf.buffer} no streams
    .pipe(gIf(!gulp.env.prod, gWatch()))
    .pipe(gIf(gulp.env.prod, gImagemin()))
    .pipe(gulp.dest(opt.conf.build.images));
});

// CSS
gulp.task('build_styles', function() {
  gulp.src(opt.conf.src.less + '/main.less') // , {buffer: opt.conf.buffer} no streams
    .pipe(gLess())
    .pipe(gIf(gulp.env.prod, gMinifyCss()))
    .pipe(gulp.dest(opt.conf.build.css));
});

// JavaScript
gulp.task('build_js', function() {
  gulp.src(opt.conf.src.js + '/**/*.js', {buffer: opt.conf.buffer})
    .pipe(gJshint());

  gulp.src(opt.conf.src.js + '/frontend.js', {buffer: opt.conf.buffer && !gulp.env.prod}) // no streams in prod
    .pipe(gBrowserify())
    .pipe(gIf(gulp.env.prod, gUglify()))
    .pipe(gConcat('dest.js'))
    .pipe(gulp.dest(opt.conf.build.frontjs));
});

// The build task
gulp.task('build', function() {
  gulp.run('build_fonts', 'build_images', 'build_styles', 'build_js');
  if(false === gulp.env.prod) {
    gulp.watch([opt.conf.src.icons + '/**/*.svg'], function(event) {
      gulp.run('build_fonts');
    });

    gulp.watch([
      opt.conf.src.js + '/frontend/**/*.js',
      opt.conf.src.js + '/frontend.js'
    ], function(event) {
      gulp.run('build_js');
    });

    gulp.watch([opt.conf.src.less + '/**/*.less'], function(event) {
      gulp.run('build_css');
    });
  }
});

// The default task
gulp.task('default', function() {
  gulp.run('build');
});
