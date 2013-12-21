module.exports = function(grunt){
  
  /* IE specific : convert em measurements to pixel */
  grunt.registerMultiTask('rem2px', 'Replace any rem unit by it\'s px equivalent', function() {
    var options = this.options({
      rootSize: grunt.option('rootSize') || ""
    });

    this.files.forEach(function(file) {
      
      grunt.file.write(file.dest,
        grunt.file.read(file.src).replace(/([0-9]+(?:.[0-9]*)?|[0-9]*.[0-9]+?)rem/g,
          function(i, value) {
            return (value*options.rootSize)+'px';
          }
        )
      );
      
      grunt.log.writeln('File "' + file.dest + '" created.');
    
    });

  });

};	

