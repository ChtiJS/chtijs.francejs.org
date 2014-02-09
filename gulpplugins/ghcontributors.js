var Stream = require('stream')
  , gutil = require('gulp-util')
  , path = require('path')
  , ghrequest = require('./ghrequest')
;

const PLUGIN_NAME = 'gulp-ghcontributors';

// Plugin function
function ghmembersGulp(options) {

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

  var ghStream = new Stream.PassThrough({objectMode: true});

  // Get members list
  ghrequest(
    'https://api.github.com/repos/'+options.organization+'/'
      +options.project+'/contributors',
    function(err, results) {
    if(err) {
      ghStream.emit('error',
        new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
      ghStream.end();
      return;
    }
    // Reading the contributors index
    var file = new gutil.File({
      cwd: options.cwd,
      base: options.base,
      path: path.join(options.base, options.folder, 'index.md'),
      contents: new Buffer(0)
      })
      , n = 0;
    file[options.prop] = {
      contributors: results,
      title: 'Les contributeurs au site',
      description: 'Découvrez les personnes qui ont créé le site de ChtiJS.',
      shortTitle: 'Crédits',
      template: 'credits'
    };
    // Retrieve members informations
    n = file[options.prop].contributors.length;
    file[options.prop].contributors.forEach(function(member) {
      ghrequest(member.url, function(err, result) {
        if(err) {
          ghStream.emit('error',
            new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
        } else {
          member.name = result.name;
        }
        if(0 === --n) {
          ghStream.write(file);
          ghStream.end();
        }
      });
    });
  });

  return ghStream;

};

// Export the plugin main function
module.exports = ghmembersGulp;
