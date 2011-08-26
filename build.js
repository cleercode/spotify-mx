// Module dependencies
var fs = require('fs')
  , stylus = require('stylus')
  , uglify = require('uglify-js')
  , parse = uglify.parser.parse
  , pro = uglify.uglify;

// Input/output files
var cssFile = 'style.css'
  , jsFile = 'script.js'
  , buildFile = 'spotify-mx.js';

// Minify CSS and JS, embed CSS in JS
fs.readFile(cssFile, 'utf8', function(err, css) {
  handleError(err, 'reading CSS');

  compressCSS(css, function(err, css) {
    handleError(err, 'compressing CSS');

    fs.readFile(jsFile, 'utf8', function(err, js) {
      handleError(err, 'reading JS');

      compressJS(js, function(err, js) {
        handleError(err, 'compressing JS');

        js = js.replace('//css', css)
               .replace('\n', '');

        fs.writeFile(buildFile, js, function(err) {
          handleError(err, 'writing JS');

          console.log('Successfully wrote to ' + buildFile);
        });

      })
    });
  });
});

// Compress JS using Uglify-JS
function compressJS(js, fn) {
  try {
    var ast = parse(js);
    ast = pro.ast_mangle(ast);
    ast = pro.ast_squeeze(ast);
    js = pro.gen_code(ast);
    fn(null, js);
  }
  catch (err) {
    fn(err);
  }
}

// Compress CSS (and base64 inline images) using Stylus
function compressCSS(css, fn) {
  stylus(css)
    .set('compress', true)
    .define('url', stylus.url())
    .render(fn);
}

// Throw errors
function handleError(err, str) {
  if (err) throw new Error('Error while ' + str);
}
