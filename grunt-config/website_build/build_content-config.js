module.exports = function(grunt) {

  var defaults = config = {
    
    build_content: {
      dev: {
        expand: true,
        cwd: 'documents/contents',
        src: ['**/*.md'],
        dest: 'www/',
        ext: '.html',
        options: {
          targetBase: ""
        }
      },
      dist: {
        expand: true,
        cwd: 'documents/contents',
        src: ['**/*.md'],
        dest: 'dist/',
        ext: '.html',
        options: {
          targetBase: "./dist",
          base_url: "http://smdlsld.fr"
        }
      }

    }
  };

  return config;

};