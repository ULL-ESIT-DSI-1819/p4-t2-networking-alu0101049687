var gulp  = require('gulp')
var shell = require('gulp-shell')

gulp.task("pre-install", shell.task([
  "npm i -g gulp static-server",
  "npm install -g nodemon",
  "npm install -g gulp-shell"
]));

gulp.task('servidor', shell.task([
    'node net-watcher-json-service.js target.txt'
  ]))

gulp.task('touch', shell.task([
    'watch -n 1 touch target.txt'
  ]))

gulp.task('watcher', shell.task([
    'node net-watcher.js target.txt'
  ]))

gulp.task('connect', shell.task([
    'nc localhost60300'
  ]))

gulp.task('client', shell.task([
    'node net-watcher-json-client.js'
  ]))