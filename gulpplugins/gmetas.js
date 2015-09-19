var Stream = require('stream');
var path = require('path');

const PLUGIN_NAME = 'gulp-metas';

// Plugin function
function gMetas(options) {
  var stream = new Stream.Transform({objectMode: true});

  options = options || {};
  options.prop = options.prop || 'metadata';

  stream._transform = function(file, unused, cb) {
    file[options.prop] = {
      title: path.dirname(file.path),
      description: path.basename(file.path) + path.extname(file.path) + '\'s content.',
      shortTitle: path.dirname(file.path)
    };
    if(options.template) {
      file[options.prop].template = options.template;
    }
    stream.push(file);
    cb();
  };

  return stream;

};

// Export the plugin main function
module.exports = gMetas;
