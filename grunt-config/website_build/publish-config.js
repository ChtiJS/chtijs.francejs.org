module.exports = function(grunt) {

  var defaults = config = {

    'gh-pages': {
      publish: {
        options: {
          base: 'dist'
        },
        src: ['**']
      }
    },

    'cname': {
      publish: {
        options: {
          base: 'dist',
          domain: 'chtijs.francejs.org'
        }
      }
    }
  };

  return config;

};