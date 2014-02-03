module.exports = function(grunt) {

  grunt.registerTask('default', [
    'jshint:gruntfile'
  ]);


 grunt.registerTask('dev', 'Run website locally and start watch process (living document).', function() {

    grunt.task.run([
      'clean:dev',
      'init_env:dev',
      'icons2fonts:dev',
      'browserify:dev',
      'less:dev',
      'copy:images_dev',
      'copy:css_dev',
      'build_ghmembers:dev',
      'build_content:dev',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('dist', 'Build the website ready for production', function() {

    grunt.task.run([
      'clean:dist',
      'init_env:dist',
      'icons2fonts:dist',
      'browserify:dist',
      'less:dist',
      'copy:css_dist',
      //'cssmin:dist',
      'imagemin:dist',
      'svgmin:dist',
      'cname:publish',
      'build_content:dist'
    ]);

  });

  grunt.registerTask('publish', 'Publish current contents to GitHub pages', function() {

    grunt.task.run([
      'dist',
      'cname:publish',
      'gh-pages:publish'
    ]);

  });

};
