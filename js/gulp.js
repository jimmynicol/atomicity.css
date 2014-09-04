'use strict';

var stream = require('stream'),
    util   = require('util'),
    Vinyl  = require('vinyl'),
    paths  = require('./paths'),
    render = require('./render');


function GulpStream(opts){
  /* jshint validthis:true */
  if (!(this instanceof GulpStream)){
    return new GulpStream(opts);
  }

  stream.Readable.call(this, { objectMode : true });

  this.opts = opts || {};
  this.file = opts.file || paths.file;
}

util.inherits(GulpStream, stream.Readable);

GulpStream.prototype._read = function(){
  var vinyl = new Vinyl({
    path: this.file,
    contents: new Buffer(render(this.opts))
  });

  this.push(vinyl);
  this.push(null);
};


module.exports = GulpStream;
