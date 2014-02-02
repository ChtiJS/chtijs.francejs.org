var Stream = require('stream')
  , gutil = require('gulp-util')
  , path = require('path')
  , fs = require('fs')
  , request = require('request')
  , StreamQueue = require('streamqueue')
  , duplexer = require('duplexer')
;

const PLUGIN_NAME = 'gulp-ghmembers';

// Create your own : https://github.com/settings/applications
var token = fs.readFileSync(__dirname + '/../.token', 'utf-8');
if(!token) {
  throw new Error('Create a .token file containing an API token at the root of'
    + ' the project (go to https://github.com/settings/applications).');
}


// Request helper
function ghrequest(url, stream, cb) {
  request({
    url: url,
    headers: {
      Accept: 'application/json',
      // http://developer.github.com/v3/#user-agent-required
      'User-Agent': 'ChtiJS/chtijs.francejs.org',
      // Create your token https://github.com/login/oauth/authorize?client_id=be0b80112ab0b6273c71
      Authorization: 'token ' + token
    }
  }, function(err, response, body) {
    // Handle any error
    if(err) {
      stream.emit('error',
        new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
      setImmediate(cb);
      return;
    }
    if(200 != response.statusCode) {
      stream.emit('error',
        new gutil.PluginError(PLUGIN_NAME,
          'Unexpexted status code (' + response.statusCode + ')',
          {showStack: true}
        ));
      setImmediate(cb);
      return;
    }
    cb(JSON.parse(body));
  });
}

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
    ghStream, function(results) {
    if(!results) {
      ghStream.end();
    }
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
      title: 'Annuaire des membres',
      description: 'Découvrez l\'annuaire des membres',
      shortTitle: 'Membres',
      template: 'archives'
    };
    // Retrieve members informations
    n = file.metas.datas.length;
    file.metas.datas.forEach(function(member) {
      ghrequest(member.url, ghStream, function(results) {
        if(results) {
          var file = new gutil.File({
            cwd: options.cwd,
            base: options.base,
            path: path.join(options.base, options.folder, member.login + '/index.md'),
            contents: new Buffer(0)
          });
          file[options.prop] = {
            datas: results,
            title: 'Fiche du membre ' + member.login,
            description: 'Découvrez la fiche du membre ' + member.login + '.',
            shortTitle: member.login,
            template: 'archives'
          };
          ghStream.write(file);
        }
        if(0 == --n) {
          ghStream.end();
        }
      });
    });
    ghStream.write(file);
  });

  return duplexer(stream, new StreamQueue({
    objectMode:true
  }, stream, ghStream));

};

// Export the plugin main function
module.exports = ghmembersGulp;
