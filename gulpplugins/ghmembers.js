var Stream = require('stream')
  , gutil = require('gulp-util')
  , path = require('path')
  , StreamQueue = require('streamqueue')
  , duplexer = require('duplexer')
  , ghrequest = require('./ghrequest')
;

const PLUGIN_NAME = 'gulp-ghmembers';

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
  options.folder = options.folder || 'members';

  var stream = new Stream.PassThrough({objectMode: true});
  var ghStream = new Stream.PassThrough({objectMode: true});

  // Get members list
  ghrequest(
    'https://api.github.com/orgs/'+options.organization+'/public_members',
    ghStream, function(err, results) {
    if(err) {
      stream.emit('error',
        new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
    } else {
      // Creating the members index
      var file = new gutil.File({
        cwd: options.cwd,
        base: options.base,
        path: path.join(options.base, options.folder, 'index.md'),
        contents: new Buffer(0)
        })
        , n = 0;
      file[options.prop] = {
        datas: results,
        title: 'Contributeurs',
        description: 'Découvrez la liste des contributeurs de ce site.',
        shortTitle: 'Contributeurs',
        template: 'archives'
      };
      ghStream.write(file);
    }
    ghStream.end();
  });

  return duplexer(stream, new StreamQueue({
    objectMode:true
  }, stream, ghStream));

};

// Export the plugin main function
module.exports = ghmembersGulp;
