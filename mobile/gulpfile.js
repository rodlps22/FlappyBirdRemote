var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sh = require('shelljs'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    slim = require("gulp-slim"),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    coffee = require('gulp-coffee'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    changed = require('gulp-changed'),
    plumber = require('gulp-plumber'),
    neat = require('node-neat').includePaths,

srcPaths = {
  images: [
    './src/img/**/*'
  ],
  styles: [
    './src/css/**/*.scss'
  ],
  fonts: [
    './src/fonts/**/*'
  ],
  index:       './src/index.slim',
  app:         './src/js/*.coffee',
  controllers: './src/js/controllers/**/*.coffee',
  services:    './src/js/services/**/*.coffee',
  directives:  './src/js/directives/**/*.coffee',
  filters:     './src/js/filters/**/*.coffee',
  templates:    './src/slims/**/*.slim'
},
vendorPaths = {
  scripts: [ 
    './src/lib/ionic/js/ionic.bundle.min.js',
    './src/lib/lodash/dist/lodash.min.js',
    './src/lib/angular-resource/angular-resource.min.js',
    './src/lib/moment/min/moment.min.js',
    './src/lib/angular-moment/angular-moment.min.js',
    './src/lib/angular-socket-io/socket.js'
  ],
  styles: [
    './src/lib/ionic/scss/**/*.css',
    './src/lib/fontawesome/css/font-awesome.min.css'
  ],
  fonts: [
    './src/lib/ionic/fonts/*',
    './src/lib/fontawesome/fonts/*'
  ]
};

distPath = {
  app:           "./www/js/",
  controller:    "./www/js/",
  service:       "./www/js/",
  directive:     "./www/js/",
  filter:        "./www/js/",
  css:           "./www/css/",
  vendor:        "./www/lib/",
  root:          "./www/",
  font:          "./www/fonts/",
  images:        "./www/img",
  templates:     "./www/slim"
}

gulp.task('scripts:app', function() {
  return gulp.src(srcPaths.app)
    .pipe(plumber())
    .pipe(changed(distPath.app, { extension: '.js' }))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(distPath.app))
    .pipe(notify({ message: 'APPLICATION CONFIG TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('scripts:controllers', function() {
  return gulp.src(srcPaths.controllers)
    .pipe(plumber())
    .pipe(changed(distPath.controller, { extension: '.js' }))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('controllers.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(distPath.controller))
    .pipe(notify({ message: 'APPLICATION CONTROLLERS TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('scripts:services', function() {
  return gulp.src(srcPaths.services)
    .pipe(plumber())
    .pipe(changed(distPath.service, { extension: '.js' }))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('services.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(distPath.service))
    .pipe(notify({ message: 'APPLICATION SERVICES TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('scripts:directives', function() {
  return gulp.src(srcPaths.directives)
    .pipe(plumber())
    .pipe(changed(distPath.directive, { extension: '.js' }))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('directives.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(distPath.directive))
    .pipe(notify({ message: 'APPLICATION DIRECTIVES TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('scripts:filters', function() {
  return gulp.src(srcPaths.filters)
    .pipe(plumber())
    .pipe(changed(distPath.filter, { extension: '.js' }))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('filters.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(distPath.filter))
    .pipe(notify({ message: 'APPLICATION FILTERS TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('styles:app', function(){
    return gulp.src(srcPaths.styles)
      .pipe(plumber())
      .pipe(changed(distPath.css, { extension: '.css' }))
      .pipe(sass({includePaths: ['styles'].concat(neat), errLogToConsole: true}))
      .pipe(concat('style.css'))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(rename({suffix: '.min'}))
      .pipe(minifycss())
      .pipe(gulp.dest(distPath.css))
      .pipe(notify({ message: 'APPLICATION STYLES TASK COMPLETED' }))
      .pipe(connect.reload());
})

gulp.task('fonts:app', function(){
  gulp.src(srcPaths.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(distPath.font))
    .pipe(notify({ message: 'APPLICATION FONTS TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('styles:vendor', function() {
  return gulp.src(vendorPaths.styles)
    .pipe(plumber())
    .pipe(gulp.dest(distPath.vendor+'css/'))
    .pipe(notify({ message: 'VENDOR STYLES TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('scripts:vendor', function() {
  return gulp.src(vendorPaths.scripts)
    .pipe(plumber())
    .pipe(gulp.dest(distPath.vendor+'js/'))
    .pipe(notify({ message: 'VENDOR SCRIPTS TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('fonts:vendor', function(){
  gulp.src(vendorPaths.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(distPath.vendor+'fonts/'))
    .pipe(notify({ message: 'VENDOR FONTS TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('clean', function() {
  return gulp.src([distPath.root], {read: false})
    .pipe(clean());
});

gulp.task('slim', function(){
  gulp.src(srcPaths.templates)
    .pipe(slim({
      pretty: false
    }))
    .pipe(plumber())
    .pipe(gulp.dest(distPath.templates))
    .pipe(notify({ message: 'APPLICATION SLIM TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('index', function(){
  gulp.src(srcPaths.index)
    .pipe(slim({
      pretty: false
    }))
    .pipe(plumber())
    .pipe(gulp.dest(distPath.root))
    .pipe(notify({ message: 'INDEX TEMPLATE TASK COMPLETED' }))
    .pipe(connect.reload());
});

gulp.task('images', function(){
  gulp.src(srcPaths.images)
    .pipe(plumber())
    .pipe(gulp.dest(distPath.images))
    .pipe(notify({ message: 'APPLICATION IMAGES TASK COMPLETED ' }))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'www',
    port: 8000,
    livereload: true,
  });
});

gulp.task('watch', ['clean'], function() {
  gulp.start(
    'connect',
    'styles:vendor',
    'scripts:vendor',
    'fonts:vendor',
    'styles:app',
    'scripts:app',
    'scripts:controllers',
    'scripts:services',
    'scripts:directives',
    'scripts:filters',
    'fonts:app',
    'images',
    'index',
    'slim'
  )

  gulp.watch(srcPaths.app,          ['scripts:app']);
  gulp.watch(srcPaths.controllers,  ['scripts:controllers']);
  gulp.watch(srcPaths.services,     ['scripts:services']);
  gulp.watch(srcPaths.directives,   ['scripts:directives']);
  gulp.watch(srcPaths.filters,      ['scripts:filters']);
  gulp.watch(srcPaths.styles,       ['styles:app']);
  gulp.watch(srcPaths.index,        ['index']);
  gulp.watch(srcPaths.templates,    ['slim']);
});

gulp.task('default', ['watch'])



// gulp.task('install', ['git-check'], function() {
//   return bower.commands.install()
//     .on('log', function(data) {
//       gutil.log('bower', gutil.colors.cyan(data.id), data.message);
//     });
// });

// gulp.task('git-check', function(done) {
//   if (!sh.which('git')) {
//     console.log(
//       '  ' + gutil.colors.red('Git is not installed.'),
//       '\n  Git, the version control system, is required to download Ionic.',
//       '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
//       '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
//     );
//     process.exit(1);
//   }
//   done();
// });
