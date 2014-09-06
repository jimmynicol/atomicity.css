'use strict';

var fs     = require('fs'),
    render = require('./render'),
    pkg    = require('../package.json'),
    chalk  = require('chalk');


module.exports = function(grunt){
  var options, desc, css;

  desc = 'Render ' + pkg.name + ' with options';

  function log(msg) {
    if (!options.silent) {
      grunt.log.writeln(msg);
    }
  }

  grunt.registerMultiTask('atomicity', desc, function(){
    options = this.options({
      minify: false,
      autoprefixer: true,
      silent: false
    });

    css = render(options);

    fs.writeFileSync(this.data.dest, css);
    log('File ' + chalk.cyan(this.data.dest) + ' created.');
  });

};