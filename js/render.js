'use strict';

var sass, autoprefixer, CleanCss, path, fs, cssDir, pkg;

sass         = require('node-sass');
autoprefixer = require('autoprefixer-core');
CleanCss     = require('clean-css');
path         = require('path');
fs           = require('fs');
cssDir       = path.resolve(__dirname + '/../css');
pkg          = require('../package.json');


function getFile(path){
  if (!fs.existsSync(path)){
    throw new Error('Unable to find scss file: ' + path);
  }
  return fs.readFileSync(path)
}

function addBanner(css){
  var banner;

  banner = '/*!\n' + pkg.name;
  banner += ' v' + pkg.version + ' |';
  banner += ' ' + pkg.license + ' License |';
  banner += ' ' + pkg.homepage +  ' \n*/\n\n';

  return banner + css;
}

module.exports = function(options){
  var scss, css, banner;

  scss = '';
  options = options || {};
  options.normalize = options.normalize || true;

  // concatentate scss files to use as the data string when rendering the SASS
  if (options.variables){
    scss += getFile(options.variables);
  }
  scss += getFile(cssDir + '/_index.scss');

  // render the CSS string from the source scss
  css = sass.renderSync({
    data: scss,
    outputStyle: options.outputStyle || 'nested',
    includePaths: [cssDir]
  });

  // add normalize.css to the head of the file
  if (options.normalize === true){
    css = fs.readFileSync(
      __dirname + '/../node_modules/normalize.css/normalize.css'
    ) + css;
  }

  // add vendor prefixes is requested
  if (options.autoprefixer){
    var opts = {
      browsers: options.autoprefixer.browsers || autoprefixer.default.browsers,
      cascade: options.autoprefixer.cascade || autoprefixer.default.cascade,
    };
    css =  autoprefixer.process(css, opts).css;
  }

  // minify the css string if requested
  if (options.minify === true){
    css = new CleanCss().minify(css);
  }

  return addBanner(css);
};