var Stream = require('stream')
  , gutil = require('gulp-util')
  , path = require('path')
  , ghrequest = require('./ghrequest')
  , Promise = require('es6-promise').Promise
;

const PLUGIN_NAME = 'gulp-ghcontributors';

// Plugin function
function ghcontributorsGulp(options) {
  var ghStream = new Stream.PassThrough({objectMode: true});

  options = options || {};
  if(!options.organization) {
    throw 'Please provide the organization name.';
  }
  if(!options.base) {
    throw 'Please provide the base directory.';
  }
  options.buffer = 'boolean' == typeof options.buffer ? options.buffer : true;
  options.cwd = options.cwd || process.cwd();
  options.prop = options.prop || 'metas';
  options.folder = options.folder || 'credits';

  // Get members list
  ghrequest('https://api.github.com/repos/' + options.organization + '/'
      + options.project + '/contributors')
    .then(function(results) {
      // Reading the contributors index
      var file = new gutil.File({
        cwd: options.cwd,
        base: options.base,
        path: path.join(options.base, options.folder, 'index.md'),
        contents: new Buffer(0)
      });
      file[options.prop] = {
        contributors: results,
        title: 'Les contributeurs du site',
        description: 'Découvrez les personnes qui ont créé le site de ChtiJS.',
        shortTitle: 'Crédits',
        template: 'credits'
      };

      // Retrieve members informations
      return Promise.all(file[options.prop].contributors.map(function(member) {
        return ghrequest(member.url)
          .then(function(result) {
            member.name = result.name;
          }, function (err) {
            ghStream.emit('error',
              new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
            ghStream.end();
          });
      })).then(function() {
        ghStream.write(file);
        ghStream.end();
      }, function(err) {
        ghStream.emit('error',
          new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
          ghStream.end();
      });
    }, function(err) {
      ghStream.emit('error',
        new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
      ghStream.end();
    });

  return ghStream;

};

// Export the plugin main function
module.exports = ghcontributorsGulp;
