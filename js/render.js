'use strict';

var sass, autoprefixer, CleanCss, path, fs, cssDir, pkg;

sass         = require('node-sass');
autoprefixer = require('autoprefixer-core');
CleanCss     = require('clean-css');
path         = require('path');
fs           = require('fs');
cssDir       = path.resolve(__dirname + '/../css');
pkg          = require('../package.json');



module.exports = function(options){
  var css, banner;

  options = options || {};
  options.normalize = options.normalize || true;

  css = sass.renderSync({
    file: cssDir + '/index.scss',
    outputStyle: options.outputStyle || 'nested',
    includePaths: [cssDir]
  });

  if (options.normalize === true){
    css = fs.readFileSync(
      __dirname + '/../node_modules/normalize.css/normalize.css'
    ) + css;
  }

  if (options.autoprefixer){
    var opts = {
      browsers: options.autoprefixer.browsers || autoprefixer.default.browsers,
      cascade: options.autoprefixer.cascade || autoprefixer.default.cascade,
    };
    css =  autoprefixer.process(css, opts).css;
  }

  if (options.minify === true){
    css = new CleanCss().minify(css);
  }

  banner = '/*!\nAtomicity.css v' + pkg.version + ' |';
  banner += ' ' + pkg.license + ' License |';
  banner += ' ' + pkg.homepage +  ' \n*/\n\n';

  css = banner + css;

  return css;

};