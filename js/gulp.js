'use strict';

var stream = require('stream'),
    es     = require('event-stream'),
    util   = require('util'),
    Vinyl  = require('vinyl'),
    paths  = require('./paths'),
    render = require('./render');


function GulpRead(opts){
  /* jshint validthis:true */
  if (!(this instanceof GulpRead)){
    return new GulpRead(opts);
  }

  stream.Readable.call(this, { objectMode : true });

  this.opts = opts || {};
  this.filePath = opts.file || paths.file;
}
util.inherits(GulpRead, stream.Readable);

GulpRead.prototype._read = function(){
  var vinyl = new Vinyl({
    path: this.filePath,
    contents: new Buffer(render(this.opts))
  });

  this.push(vinyl);
  this.push(null);
};


var GulpTransform = function(opts){
  return es.map(function(file, callback){
    var css = new Buffer(render(opts));
    file.contents = Buffer.concat([file.contents, css]);
    callback(null, file);
  });
};



module.exports = {
  read: GulpRead,
  through: GulpTransform
};