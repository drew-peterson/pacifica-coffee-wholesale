'use strict';

var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'), // puts multiple files into 1 file
    rename = require('gulp-rename'), // allows you to rename files..
    sass   = require('gulp-sass'), // bring sass compiller
    maps   = require('gulp-sourcemaps'), // because our css is in 1 file when compiled when we inspect elements it tells us the application.css line number not ???.scss where its actually written this will fix that
    del    = require('del'), // something to do with removing old files from previous gulp builds
    livereload = require('gulp-livereload'), // auto reload web site
    autoprefixer = require('gulp-autoprefixer'), // auto prefixer
    htmlmin = require('gulp-htmlmin');

    // minify images
    const imagemin = require('gulp-imagemin');
    const pngquant = require('imagemin-pngquant');



// minify HTML ==================================
gulp.task('minifyHtml', function() {
  return gulp.src('public/views/**')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/public/views'))
});
// ==============================================

gulp.task("concatScripts",function(){
  // grab all src methods
  return gulp.src([ // important add to first line of all
    "public/js/modules/*.js",
    "public/js/controllers/*.js",
    "public/js/routes/*.js",
    "public/js/services/*.js",
    ]) 
  .pipe(maps.init()) // create a map file for javascript
  .pipe(concat("application.js")) // pipe in the information into contact which does the magic and give it a file name
  .pipe(maps.write('./'))
  .pipe(gulp.dest('public/js')) // gulp will save save in the specified folder
  .pipe(livereload());
});

gulp.task('minifyScripts', ['concatScripts'],function(){ // adding [] says run this after what ever is in []] the return is important, because its a promise so it know to run after its complete
  return gulp.src('public/js/application.js') // use the app.js which was concated, we will run these in order later...
  .pipe(uglify()) // minify the information
  .pipe(rename('application.min.js')) // use rename module to rename the app so you have 2 files 1 min 1 standard
  .pipe(gulp.dest('public/js')); // write back to js file
});

gulp.task('compileSass',function(){
  return gulp.src('public/scss/application.scss') // only 1 file because that file is imported the import file from each scss folder
  .pipe(maps.init()) //create the map
  .pipe(sass({outputStyle: 'compressed'})) // compile in css
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
  .pipe(maps.write('./')) // puts the map file at the same level ./ as teh dest('css')
  .pipe(gulp.dest('public/css')) // because the scss file is called application it will become aplication.css if the 'css' folder doesnt exist it will create it
  .pipe(livereload()); // then send over to live reload
});


//
  // since nothing depends on it you dont need a return
gulp.task('watchFiles', function(){
  livereload.listen();
  // globing, look in scss folder any additional folder/file **, and then anything ending in a .scss (*.scss)
  gulp.watch('public/scss/**/*.scss', ['compileSass']); // run the following tasks when these change
  gulp.watch([
    "public/js/controllers/*.js",
    "public/js/modules/*.js",
    "public/js/routes/*.js",
    "public/js/services/*.js"], ['concatScripts']); // want to watch the files we will actually change, and then run X tasks. dont really need to concatScripts but it has the maping so that makes debugging easier so we will add as dependecie.
  // watch will continully listen after is is ran
});

gulp.task('clean', function(){
  del(['dist', 'public/css/application.css*', 'public/js/app*.js*']);
  gulp.start(['concatScripts', 'compileSass']);
});


// PRODUCTION =======================================

var paths = {
  scripts: 'public/js/application.js',
  libs: ['public/libs/angular/angular.min.js','public/libs/angular-ui-router/release/angular-ui-router.min.js','public/libs/angular-animate/angular-animate.min.js','public/libs/jquery/dist/jquery.min.js'],
  styles: 'public/css/application.css',
  html: 'public/index.html',
  images: 'public/img/**',
  extra: ['public/favicon.ico', 'public/sitemap.xml']
};

gulp.task('imageMin', function(){
  return gulp.src('public/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/public/img'));
});

// we do not need to include tasks that are injected
// remove ,'js/app.min.js' , 'img/**', 'fonts/**'
gulp.task('build', ['compileSass', 'minifyScripts', 'imageMin', 'minifyHtml'],function(){

  return gulp.src(
    [
    paths.scripts,
    paths.libs[0],
    paths.libs[1],
    paths.libs[2],
    paths.libs[3],
    paths.styles,
    paths.html,
    paths.extra[0],
    paths.extra[1]
    ],{base: './'})

  // return gulp.src(['public/css/application.css', 'public/js/application.min.js', 'public/index.html'], { base: './'} ) // based tells gulp to preserve the directory structure in the current ('./') directory
    // take select all your main folders and the condeseded css add js file
    .pipe(gulp.dest('dist'));
});

// run gulp serve to run both watch files
gulp.task('serve', ['watchFiles']);


gulp.task('default', ['clean'], function(){
  gulp.start('build'); //wait for clean task to run then start up the build
}); // when you run gulp, run the build task

// run server w/ http-server -p 3000

// run gulp serve to start the auto and watch