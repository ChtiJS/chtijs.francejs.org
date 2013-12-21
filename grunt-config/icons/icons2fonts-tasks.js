module.exports = function(grunt) {

grunt.registerMultiTask('icons2fonts', 'Converts svg icons to webfonts', function() {
    var targetStr = "";
    if (this.target) {
      targetStr = ":" + this.target;
    }
    grunt.task.run([
      'svgicons2svgfont' + targetStr,
      'svg2ttf' + targetStr,
      'ttf2eot' + targetStr,
      'ttf2woff' + targetStr
    ]);
  });

};