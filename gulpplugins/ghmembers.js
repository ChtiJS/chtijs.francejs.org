'use strict';

var Stream = require('stream');
var gutil = require('gulp-util');
var path = require('path');
var ghrequest = require('./ghrequest');
var Promise = require('es6-promise').Promise;
var fs = require('fs');

var PLUGIN_NAME = 'gulp-ghmembers';

// Plugin function
function ghmembersGulp(options) {
  var ghStream = new Stream.PassThrough({ objectMode: true });

  options = options || {};
  if(!options.organization) {
    throw new Error('Please provide the organization name.');
  }
  if(!options.base) {
    throw new Error('Please provide the base directory.');
  }
  options.buffer = 'boolean' == typeof options.buffer ? options.buffer : true;
  options.cwd = options.cwd || process.cwd();
  options.prop = options.prop || 'metadata';
  options.folder = options.folder || 'members';

  // Get members list
  ghrequest('https://api.github.com/orgs/' + options.organization +
    '/public_members')
  .then(function(results) {
    // Creating the members index
    var file = new gutil.File({
      cwd: options.cwd,
      base: options.base,
      path: path.join(options.base, options.folder, 'index.md'),
      contents: new Buffer(0),
    });

    file[options.prop] = {
      members: results,
      title: 'Membres',
      description: 'Découvrez la liste des membres de ChtiJS.',
      shortTitle: 'Membres',
      template: 'members',
    };

    // Retrieve members informations
    return Promise.all(
      file[options.prop].members.map(function(member) {
        return Promise.all([
          ghrequest(member.url),
          new Promise(function(resolve) {
            var bioPath = path.join(
              __dirname, '..', 'documents', 'bios', 'fr', member.login + '.md'
            );

            fs.readFile(bioPath, function(err, data) {
              if(err) {
                return resolve();
              }
              resolve(data);
            });
          }),
        ]).then(function(results) {
          var memberFile = new gutil.File({
            cwd: options.cwd,
            base: options.base,
            path: path.join(options.base, options.folder, member.login + '/index.md'),
            contents: new Buffer(0),
          });

          member.name = results[0].name;
          member.bio = results[1] || results[0].bio;
          memberFile[options.prop] = {
            datas: results[0],
            title: 'Fiche du membre ' + member.login,
            description: 'Découvrez la fiche du membre ' + member.login + '.',
            shortTitle: member.login,
            template: 'archives',
          };
          ghStream.write(memberFile);
        });
      })
    ).then(function() {
      ghStream.write(file);
    });

  }).then(function() {
    ghStream.end();
  }).catch(function(err) {
    ghStream.emit('error',
      new gutil.PluginError(PLUGIN_NAME, err, { showStack: true }));
    ghStream.end();
  });

  return ghStream;

}

// Export the plugin main function
module.exports = ghmembersGulp;
