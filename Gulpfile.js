var gulp = require('gulp');
var shell = require('gulp-shell');
var bs = require('browser-sync');
var nodemon = require('gulp-nodemon');

var paths = {
  scripts: './build/**/*.js'
};

gulp.task('serve', function () {
  nodemon({script: 'index.js', ignore: 'node_modules/**/*.js'});
});

gulp.task('start', ['serve'], function () {
  bs({
    notify: true,
    injectChanges: true,
    files: paths.scripts.concat(paths.styles),
    proxy: 'localhost:8000'
  });
});

gulp.task('browserify', shell.task([
  'browserify client/client.js -o build/bundle.js'
]));

gulp.task('watchify', shell.task([
  'watchify -d client/client.js -o build/bundle.js -v'
]));

gulp.task('browserify-production', shell.task([
  'NODE_ENV=production browserify client/client.js | uglifyjs -cm > build/bundle.js'
]));
