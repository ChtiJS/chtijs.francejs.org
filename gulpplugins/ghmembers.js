var Stream = require('stream')
  , gutil = require('gulp-util')
  , path = require('path')
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

  var ghStream = new Stream.PassThrough({objectMode: true});

  // Get members list
  ghrequest(
    'https://api.github.com/orgs/'+options.organization+'/public_members',
    function(err, results) {
    if(err) {
      ghStream.emit('error',
        new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
      ghStream.end();
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
        members: results,
        title: 'Membres',
        description: 'Découvrez la liste des membres de ChtiJS.',
        shortTitle: 'Membres',
        template: 'members'
      };
      // Retrieve members informations
      n = file[options.prop].members.length;
      file[options.prop].members.forEach(function(member) {
        ghrequest(member.url, function(err, result) {
          if(err) {
            ghStream.emit('error',
              new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
            ghStream.end();
          } else {
            var memberFile = new gutil.File({
              cwd: options.cwd,
              base: options.base,
              path: path.join(options.base, options.folder, member.login + '/index.md'),
                contents: new Buffer(0)
            });
            member.name = result.name;
            member.bio = result.bio;
            memberFile[options.prop] = {
              datas: result,
              title: 'Fiche du membre ' + member.login,
              description: 'Découvrez la fiche du membre ' + member.login + '.',
              shortTitle: member.login,
              template: 'archives'
            };
            ghStream.write(memberFile);
          }
          if(0 === --n) {
            ghStream.write(file);
            ghStream.end();
          }
        });
      });
    }
  });

  return ghStream;

};

// Export the plugin main function
module.exports = ghmembersGulp;
