module.exports = function(grunt) {

  var defaults = config = {

    build_credits: {
      dev: {
        expand: true,
        cwd: "<%= conf.src.content %>",
        src: ["**/*.md"],
        dest: "<%= conf.src.content %>",
        ext: ".md",
        options: {
          targetBase: "",
          owner: "chtijs",
	  repository: "chtijs.francejs.org",
          template: "credits"
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
          owner: "chtijs",
	  repository: "chtijs.francejs.org",
          template: "credits"
        }
      }
    }
  };
  return config;
};
