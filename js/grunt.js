'use strict';

var fs     = require('fs'),
    render = require('./render'),
    paths  = require('./paths'),
    pkg    = require('../package.json'),
    chalk  = require('chalk');


module.exports = function(grunt){
  var options, desc, css, file;

  desc = 'Render ' + pkg.name + ' with options';

  function log(msg) {
    if (!options.silent) {
      grunt.log.writeln(msg);
    }
  }

  grunt.registerMultiTask('atomicity', desc, function(){
    options = this.options({
      minify: false,
      autoprefixer: true
    });

    css = render(options);

    if (this.options.minify){
      file = paths.fileMin;
    } else {
      file = paths.file;
    }

    fs.writeFile(this.data.dest + file, css, function(err){
      if(err){
        throw new Error(err);
      } else {
        log('File ' + chalk.cyan(this.data.dest + file) + ' created.');
      }
    });

  });

};