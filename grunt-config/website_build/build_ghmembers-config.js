module.exports = function(grunt) {

  var defaults = config = {

    build_ghmembers: {
      dev: {
        expand: true,
        cwd: '<%= conf.src.content %>',
        dest: '<%= conf.dev.root %>',
        ext: '.html',
        options: {
          targetBase: "",
          organization: "chtijs",
          template: "members"
        }
      },
      dist: {
        expand: true,
        cwd: '<%= conf.src.content %>',
        dest: '<%= conf.dist.root %>',
        ext: '.html',
        options: {
          targetBase: "<%= conf.dist.root %>",
          base_url: "<%= conf.baseURL %>",
          organization: "chtijs",
          template: "members"
        }
      }

    }
  };

  return config;

};