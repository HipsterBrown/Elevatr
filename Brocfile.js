var fs = require('fs'),
    pickFiles = require('broccoli-select'),
    mergeTrees = require('broccoli-merge-trees'),
    compileSass = require('broccoli-sass'),
    autoprefix = require('broccoli-autoprefixer'),
    uglify = require('broccoli-uglify-js'),
    hint = require('broccoli-jshint');

var styles = compileSass(['demo'], 'style.scss', 'style.css');

styles = autoprefix(styles);

var scripts = pickFiles('.', {
  acceptFiles: ['demo/*.js', 'src/*.js'],
  rejectFiles: ['tmp/*'],
  outputDir: '/'
});

var hintedScripts = hint(scripts);

scripts = mergeTrees([scripts, hintedScripts]);

var pub = pickFiles('public', {
  outputDir: '.'
});

//console.log(mergeTrees([styles, public]));

module.exports = mergeTrees([styles, scripts, pub]);
