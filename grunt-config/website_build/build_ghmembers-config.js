module.exports = function(grunt) {

  var defaults = config = {

    build_ghmembers: {
      dev: {
        expand: true,
        cwd: "<%= conf.src.content %>",
        src: ["**/*.md"],
        dest: "<%= conf.src.content %>",
        ext: ".md",
        options: {
          targetBase: "",
          organization: "chtijs",
          template: "members"
        }
      },
      dist: {
        expand: true,
        cwd: "<%= conf.src.content %>",
        src: ["**/*.md"],
        dest: "<%= conf.src.content %>",
        ext: ".md",
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