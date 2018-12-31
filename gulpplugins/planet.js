'use strict';

var Stream = require('stream');
var gutil = require('gulp-util');
var path = require('path');
var feedr = require('feedr');
var striptags = require('striptags');

var PLUGIN_NAME = 'gulp-planet';

// Plugin function
function gulpPlanet(options) {
  var planetStream = null;
  var planet = null;
  var pendingFeeds = null;
  var file = null;

  options = options || {};
  if (!(options.blogs && options.blogs.length)) {
    throw new Error('Please provide some blogs.');
  }
  options.folder = options.folder || 'planet';
  options.buffer = 'boolean' == typeof options.buffer ? options.buffer : true;
  if (!options.base) {
    throw new Error('Please provide the base directory.');
  }
  options.prop = options.prop || 'metadata';
  options.maxDescriptionLength = 100;

  planetStream = new Stream.PassThrough({ objectMode: true });
  planet = new feedr.Feedr();
  pendingFeeds = options.blogs.length;
  file = new gutil.File({
    cwd: options.cwd,
    base: options.base,
    path: path.join(options.base, options.folder, 'index.md'),
    contents: new Buffer(0),
  });
  file[options.prop] = {
    entries: [],
    title: 'Planète',
    description:
      'Embarquez pour la planète ChtiJS à travers les blogs de ses membres !',
    shortTitle: 'Planète',
    template: 'planet',
  };

  options.blogs.forEach(function(blog) {
    planet.readFeed(blog.feed, {}, function(err, data) {
      if (err) {
        planetStream.emit(
          'error',
          new gutil.PluginError(PLUGIN_NAME, err, { showStack: true })
        );
      }
      file[options.prop].entries = file[options.prop].entries.concat(
        (data.feed
          ? data.feed.entry.map(function(entry) {
              return {
                title: entry.title,
                link:
                  entry.link &&
                  entry.link[0] &&
                  entry.link[0].$ &&
                  entry.link[0].$.href
                    ? entry.link[0].$.href
                    : entry.id && entry.id[0]
                    ? entry.id[0]
                    : '',
                summary:
                  entry.summary && entry.summary[0]
                    ? entry.summary[0]
                    : entry.description && entry.description[0]
                    ? entry.description[0]
                    : '',
                published:
                  entry.published && entry.published[0]
                    ? entry.published[0]
                    : entry.created && entry.created[0]
                    ? entry.created[0]
                    : {}.undef,
                blog: blog,
              };
            })
          : data.rss &&
            data.rss.channel &&
            data.rss.channel[0] &&
            data.rss.channel[0].item
          ? data.rss.channel[0].item.map(function(entry) {
              return {
                title: entry.title && entry.title[0] ? entry.title[0] : '',
                link:
                  entry.link && entry.link[0]
                    ? entry.link[0]
                    : entry.id && entry.id[0]
                    ? entry.id[0]
                    : '',
                summary: striptags(
                  entry.description && entry.description[0]
                    ? entry.description[0]
                    : ''
                ),
                published:
                  entry.pubDate && entry.pubDate[0]
                    ? entry.pubDate[0]
                    : {}.undef,
                blog: blog,
              };
            })
          : []
        )
          .filter(function(entry, i) {
            return entry.title && entry.link && 4 > i;
          })
          .map(function(entry) {
            if (entry.summary.length > options.maxDescriptionLength) {
              entry.summary =
                entry.summary.substr(0, options.maxDescriptionLength - 3) +
                '...';
            }
            return entry;
          })
      );
      if (!--pendingFeeds) {
        file[options.prop].entries = file[options.prop].entries.sort(function(
          a,
          b
        ) {
          return new Date(a.published) < new Date(b.published) ? 1 : -1;
        });
        planetStream.write(file);
        planetStream.end();
      }
    });
  });
  return planetStream;
}

// Export the plugin main function
module.exports = gulpPlanet;
