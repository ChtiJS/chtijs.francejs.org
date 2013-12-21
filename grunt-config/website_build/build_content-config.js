module.exports = function(grunt) {

  var defaults = config = {
    
    build_content: {
      dev: {
        expand: true,
        cwd: '<%= conf.src.content %>',
        src: ['**/*.md'],
        dest: '<%= conf.dev.root %>',
        ext: '.html',
        options: {
          targetBase: ""
        }
      },
      dist: {
        expand: true,
        cwd: '<%= conf.src.content %>',
        src: ['**/*.md'],
        dest: '<%= conf.dist.root %>',
        ext: '.html',
        options: {
          targetBase: "<%= conf.dist.root %>",
          base_url: "<%= conf.baseURL %>"
        }
      }

    }
  };

  return config;

};