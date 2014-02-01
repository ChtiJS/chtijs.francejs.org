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
    var members = [];
    var request = require("request");
    request("https://api.github.com/orgs/chtijs/public_members", function(gitErr, gitResp, gitMembers) {
      var i;
      if (!gitErr && gitResp.statusCode === 200) {
        for (i = 0; i < gitMembers.data.length; i++) {
          request("http://osrc.dfm.io/" + gitMembers.data[i].login + ".json", function(osrcErr, osrcResp, user) {
            if (!osrcErr && osrcResp.statusCode === 200) {
              members.push(user);
            }
          });
        }
      }
    });

    // moteur de templates
    var nunjucks = require('nunjucks');
    nunjucks.configure('documents/templates/', {
      autoescape: true
    });

    // chargement du menu
    var menuDatas = grunt.file.read('documents/data/menu.dat');

    // pour chaque fichier ramassé par la configuration
    this.files.forEach(function(file) {

      var nunjucksOptions = {
        env: grunt.task.target,
        metadata_site: options,
        posts: posts,
	members: members
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


};
