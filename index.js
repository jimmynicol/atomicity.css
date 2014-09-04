'use strict';

var paths = require('./js/paths');

module.exports = {
  file:    paths.file,
  fileMin: paths.fileMin,
  render:  require('./js/render'),
  gulp:    require('./js/gulp'),
  grunt:   require('./js/grunt')
};
