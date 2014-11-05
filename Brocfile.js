var fs = require('fs'),
    pickFiles = require('broccoli-static-compiler'),
    mergeTrees = require('broccoli-merge-trees'),
    compileSass = require('broccoli-sass'),
    autoprefix = require('broccoli-autoprefixer'),
    uglify = require('broccoli-uglify-js'),
    hint = require('broccoli-jshint');

var styles = compileSass(['demo'], 'style.scss', 'style.css');

styles = autoprefix(styles);

var demoScript = hint('demo');

demoScript = uglify(demoScript, {
  file: 'main.min.js'
});

var public = pickFiles('public', {
  srcDir: '.',
  destDir: '.'
});

//console.log(mergeTrees([styles, public]));

module.exports = mergeTrees([styles, demoScript, public]);
