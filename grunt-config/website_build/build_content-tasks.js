module.exports = function(grunt) {

	/* HTML page builder */
  grunt.registerMultiTask('build_content', 'build the website html pages', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      base_url: grunt.option('base_url') ? grunt.option('base_url') : ""
    });

    // chargeur et convertisseur de fichiers markdown
    var marked = require('marked');

    // chargeur méta données
    var VarStream = require('varstream');

    // listing des billets de blog
    var posts = [];
    grunt.file.expand('documents/contents/archives/*/*.md').forEach(function(file) {
      var matches = grunt.file.read(file).match(/^(?:[^]*)<!-- varstream([^]*)-->(?:[^]*)$/im);
      if(matches) {
        new VarStream(posts, ''+posts.length).write(matches[1]);
      } else {
        throw Error('No metadatas found for the post in the file "' + file + '".');
      }
      posts[posts.length-1].href = file.substring(28,39);
    });
    
    // tri par date
    posts.sort(function(post1, post2) {
      if(new Date(post1.created).getTime() < new Date(post2.created).getTime()) {
        return 1;
      }
      return -1;
    });

    // listing des membres
    var request = require("request"),
        Q = require("q");
    
    var githubMembers = function(obj) {
      var d = Q.defer();
      request({url: "https://api.github.com/orgs/chtijs/public_members",
        headers: {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.102 Safari/537.36"
        }
      }, function(gitErr, gitResp, gitMembers) {
        if (!gitErr && gitResp.statusCode === 200) {
          obj.members = JSON.parse(gitResp.body);
          d.resolve(obj);
        }
      });
      return d.promise;
    }

    var fetch = function(user) {
      var d = Q.defer();
      request("http://osrc.dfm.io/" + user.login + ".json", function(osErr, osResp, usr) {
        if (!osErr && osResp.statusCode === 200) {
          d.resolve(JSON.parse(osResp.body));
        }
      });
      return d.promise;
    };

    var dfmMembers = function(obj) {
      var members = new Array, d = Q.defer();
      obj.members.forEach(function(member, index) {
        var m = (fetch(member));
	obj.members.splice(index, 1);
        obj.members.push(m);
        d.resolve(obj);
      });
      return d.promise;
    };


    var obj = {
      files: this.files,
      env: grunt.task.target,
      options: options,
      posts: posts,
      members: []
    };

    githubMembers(obj).done(function(obj) {

    for (var i = 0; i < obj.members.length; i++) { console.log(obj.members[i]);}


      // moteur de templates
      var nunjucks = require('nunjucks');
      nunjucks.configure('documents/templates/', {
        autoescape: true
      });

      // chargement du menu
      var menuDatas = grunt.file.read('documents/data/menu.dat');

      // pour chaque fichier ramassé par la configuration
      obj.files.forEach(function(file) {

        var nunjucksOptions = {
          env: obj.env,
          metadata_site: obj.options,
          posts: obj.posts,
          members: obj.members
        }; 
    
        var aMDContent = grunt.file.read(file.src);
  
        // lis les méta-données
        var matches = aMDContent.match(/^([^]*)<!-- varstream([^]*)-->([^]*)$/im);
        if(matches) {
          new VarStream(nunjucksOptions,'metadata').write(matches[2]);
        }
        
        // ajoute le menu
        new VarStream(nunjucksOptions,'menu').write(menuDatas);
        
        // marque l'item sélectioné
        // Pas de récursion dans NunJucks:(, mais prêt pour plus tard
        function setSelected(parent) {
          parent.forEach(function(item) {
            var href = item.href.lastIndexOf('/') === item.href.length - 1 ?
              item.href + 'index.html' :
              item.href;
            item.parent = parent;
            if(file.dest.substr(3) === href) {
              do {
                item.selected = true;
                item = item.parent && item !== nunjucksOptions.menu ?
                  item.parent :
                  null;
              } while(item)
            } else if(item.childs) {
              item.childs.forEach(setSelected(item));
            }
          });
        }
        setSelected(nunjucksOptions.menu);
        // convertir le mardown en html
        nunjucksOptions.content = marked(matches ? matches[1]+matches[3] : aMDContent);
        // transmettre le tout aux templates
        var finalHtml = nunjucks.render(
          (nunjucksOptions.metadata.template || 'index') + '.tpl',
          nunjucksOptions);
   
        // écrire le fichier
        grunt.file.write(file.dest, finalHtml);
        grunt.log.writeln('File "' + file.dest + '" created.');
      });
    });
  });
};
