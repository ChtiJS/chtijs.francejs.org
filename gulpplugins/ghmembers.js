var Stream = require('stream')
  , gutil = require('gulp-util')
  , path = require('path')
  , ghrequest = require('./ghrequest')
  , Promise = require('es6-promise').Promise
  , fs = require('fs')
;

const PLUGIN_NAME = 'gulp-ghmembers';

// Plugin function
function ghmembersGulp(options) {
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
  options.folder = options.folder || 'members';

  // Get members list
  ghrequest('https://api.github.com/orgs/'+options.organization
    +'/public_members')
  .then(function(results) {
    // Creating the members index
    var file = new gutil.File({
      cwd: options.cwd,
      base: options.base,
      path: path.join(options.base, options.folder, 'index.md'),
      contents: new Buffer(0)
    });
    file[options.prop] = {
      members: results,
      title: 'Membres',
      description: 'Découvrez la liste des membres de ChtiJS.',
      shortTitle: 'Membres',
      template: 'members'
    };

    // Retrieve members informations
    Promise.all(
      file[options.prop].members.map(function(member) {
        return Promise.all([
          ghrequest(member.url),
          new Promise(function(resolve, reject) {
            var bioPath = __dirname+'/../documents/bios/fr/'+member.login + '.md';
            fs.exists(bioPath, function(exists) {
              if(exists) {
                fs.readFile(bioPath, function(err, data) {
                  resolve(data);
                });
              } else {
                resolve();
              }
            });
          }).catch(function(err) {
            ghStream.emit('error',
              new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
            ghStream.end();
          })
        ]).then(function(results) {
            var memberFile = new gutil.File({
              cwd: options.cwd,
              base: options.base,
              path: path.join(options.base, options.folder, member.login + '/index.md'),
                contents: new Buffer(0)
            });
            member.name = results[0].name;
            member.bio = results[1] || results[0].bio;
            memberFile[options.prop] = {
              datas: results[0],
              title: 'Fiche du membre ' + member.login,
              description: 'Découvrez la fiche du membre ' + member.login + '.',
              shortTitle: member.login,
              template: 'archives'
            };
            ghStream.write(memberFile);
        }, function(err) {
            ghStream.emit('error',
              new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
            ghStream.end();
        });
      })
    ).then(function() {
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
module.exports = ghmembersGulp;
