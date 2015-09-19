'use strict';

// GitHub request helper
var token = '';
var request = require('request');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var Promise = require('es6-promise').Promise;

module.exports = function ghrequest(url) {

  return new Promise(function(resolve, reject) {

    // Reading the access token if not doe yet
    if(!token) {
      try {
        token = fs.readFileSync(path.join(__dirname, '..', '.token'), 'utf-8');
      } catch(err) {
        gutil.log('ghrequest: Create a .token file containing a GitHub API' +
          ' token in the root directory of the project' +
          ' (go to https://github.com/settings/applications)' +
          ' since GitHub limit anonymous requests to 60 per hour. Or use' +
          ' the --noreq option to avoid external requests.');
      }
    }

    // GitHub request helper
    request({
      url: url,
      headers: {
        Accept: 'application/json',
        // http://developer.github.com/v3/#user-agent-required
        'User-Agent': 'ChtiJS/chtijs.francejs.org',
        // Create your token https://github.com/login/oauth/authorize?client_id=be0b80112ab0b6273c71
        Authorization: (token ? 'token ' + token : ''),
      },
    }, function(err, response, body) {
      // Handle any error
      if(err) {
        reject(err);
        return;
      }
      if(200 !== response.statusCode) {
        reject(new Error('Unexpexted status code (' + url + ': ' +
            response.statusCode + ')'));
        return;
      }
      resolve(JSON.parse(body));
    });

  });
};
