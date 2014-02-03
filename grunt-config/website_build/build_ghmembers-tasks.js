module.exports = function(grunt) {

  grunt.registerMultiTask("build_ghmembers", "build the website html pages", function() {

    var request = require("request"),
      Q = require("q"),
      fs = require("fs"),
      path = require("path"),
      taskdone = this.async(),
      options = this.options({
        base_url: grunt.option('base_url') ? grunt.option('base_url') : ""
    });

    function ghmembers() {
      var d = Q.defer(),
        url = "https://api.github.com/orgs/" + options.organization + "/public_members",
        token;
      // Reading the access token if not doe yet
      if(!token) {
        try {
          token = fs.readFileSync(__dirname + "/../../.token", "utf-8");
        } catch(err) {
          throw new Error("Create a .token file containing an API token at the root of" + " the project (go to https://github.com/settings/applications).");
        }
      }
      request({
        url: url,
        headers: {
          "Accept": "application/json",
          "User-Agent": "ChtiJS/chtijs.francejs.org",
          Authorization: "token " + token
        }
      }, function(err, res, body) {
        d.resolve(JSON.parse(res.body));
      });
      return d.promise;
    }

    function dfmmembers(members) {
      var d = Q.defer(), i, url, returned = [];
      members.forEach(function(member) {
        url = "http://osrc.dfm.io/" + member.login + ".json";
        request(url, function(err, res, body) {
          returned.push(JSON.parse(res.body));
          if (returned.length === members.length) {
            d.resolve(returned);
          }
        });
      });
      return d.promise;
    }

    ghmembers().then(function(gmembers) {
      dfmmembers(gmembers).then(function(dmembers) {
        var dest = path.join(__dirname, "/../../documents/data/members.dat");
        // écrire le fichier
        grunt.file.write(dest, JSON.stringify(gmembers));
        grunt.log.writeln('File "' + dest + '" created.');
        taskdone();
      });
    });

  });
};