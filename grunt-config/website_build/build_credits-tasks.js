module.exports = function(grunt) {
  grunt.registerMultiTask("build_credits", "Downloads contributors data", function() {
    var request = require("request")
      , Q = require("q")
      , fs = require("fs")
      , path = require("path")
      , taskdone = this.async()
      , options = this.options({
          base_url: grunt.option("base_url") ? grunt.option("base_url") : ""
        });

    function ghcontributors() {
      var d = Q.defer()
      , url = "https://api.github.com/repos/" + options.owner + "/"
          + options.repository + "/contributors"
      , usrUrl = "https://api.github.com/users/"
      , token;
      if (!token) {
        try {
          token = fs.readFileSync(path.join(__dirname, "../../.token"), "utf-8");
        } catch (err) {
          throw new Error("Create a .token file containing an API token at the root of"
            + " the project (go to https://github.com/settings/applications).");
        }
      }
      request({
        url: url,
        headers: {
          "Accept": "application/json",
          "User-Agent": "ChtiJS/chtijs.francejs.org",
           "Authorization": "token " + token
        }
      }, function(err, resp, body) {
        var results = JSON.parse(body), left = results.length;
        results.forEach(function(member) {
          request({
            url: usrUrl + member.login,
            headers: {
              "Accept": "application/json",
              "User-Agent": "ChtiJS/chtijs.francejs.org",
              "Authorization": "token " + token
            }
          }, function(uErr, uResp, uBody) {
            member.name = JSON.parse(uBody).name;
            --left === 0 && d.resolve(results);
          });
        });
      });
      return d.promise;
    }

    ghcontributors().then(function(contribs) {
      var dest = path.join(__dirname, "/../../documents/data/contributors.dat");
      grunt.file.write(dest, JSON.stringify(contribs));
      grunt.log.writeln("File '" + dest + "' created.");
      taskdone();
    });
  });
};
