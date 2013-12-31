module.exports = function(grunt) {

  /* Domain */
  grunt.registerMultiTask('cname', 'Set the website domain', function() {
    var options = this.options({
      domain: grunt.option('domain') || ""
    });
      
    grunt.file.write(options.base + '/CNAME', options.domain);
    
    grunt.log.writeln('File "CNAME" created.');

  });


};
