var Stream = require('stream')
  , gutil = require('gulp-util')
  , path = require('path')
  , feedr = require('feedr')
;

const PLUGIN_NAME = 'gulp-planet';

// Plugin function
function gulpPlanet(options) {

  options = options || {};
  if(!(options.blogs && options.blogs.length)) {
    throw 'Please provide some blogs.';
  }
  options.folder = options.folder || 'planet';
  options.buffer = 'boolean' == typeof options.buffer ? options.buffer : true;
  if(!options.base) {
    throw 'Please provide the base directory.';
  }
  options.prop = options.prop || 'metas';

  var planetStream = new Stream.PassThrough({objectMode: true});
  var planet = new feedr.Feedr();
  var pendingFeeds = options.blogs.length;
  var file = new gutil.File({
    cwd: options.cwd,
    base: options.base,
    path: path.join(options.base, options.folder, 'index.md'),
    contents: new Buffer(0)
  });
  file[options.prop] = {
    entries: [],
    title: 'Planète',
    description: 'Embarquez pour la planète ChtiJS à travers les blogs de ses membres !',
    shortTitle: 'Planète',
    template: 'planet'
  };

  options.blogs.forEach(function(blog) {
    planet.readFeed(blog.feed, {}, function(err, data, headers) {
      if(err) {
        console.log(err)
        planetStream.emit('error',
          new gutil.PluginError(PLUGIN_NAME,
            err,
            {showStack: true}
          ));
      }
      file[options.prop].entries =
        file[options.prop].entries.concat(data.feed.entry.map(function(entry) {
          entry.blog = blog;
          return entry;
        }).filter(function(entry, i) {
          return i < 4;
        }));
      if(!--pendingFeeds) {
        file[options.prop].entries =
          file[options.prop].entries.sort(function(a, b) {
            return a.published && b.published ?
              new Date(a.published[0]) < new Date(b.published[0]) ?
              1 :
              -1 :
              1;
          });
        planetStream.write(file);
        planetStream.end();
      }
    });
  });
  return planetStream;

};

// Export the plugin main function
module.exports = gulpPlanet;

