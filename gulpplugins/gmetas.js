var Stream = require('stream')
  , Path = require('path')
;

const PLUGIN_NAME = 'gulp-metas';

// Plugin function
function gMetas(options) {
  var stream = new Stream.Transform({objectMode: true});

  options = options || {};
  options.prop = options.prop || 'metas';

  stream._transform = function(file, unused, cb) {
    file[options.prop] = {
      title: Path.dirname(file.path),
      description: Path.basename(file.path) + Path.extname(file.path) + '\'s content.',
      shortTitle: Path.dirname(file.path)
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
