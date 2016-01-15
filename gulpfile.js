'use strict';

var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'), // puts multiple files into 1 file
    rename = require('gulp-rename'), // allows you to rename files..
    sass   = require('gulp-sass'), // bring sass compiller
    maps   = require('gulp-sourcemaps'), // because our css is in 1 file when compiled when we inspect elements it tells us the application.css line number not ???.scss where its actually written this will fix that
    del    = require('del'), // something to do with removing old files from previous gulp builds
    livereload = require('gulp-livereload'), // auto reload web site
    autoprefixer = require('gulp-autoprefixer'); // auto prefixer

gulp.task("concatScripts",function(){
  // grab all src methods
  return gulp.src([ // important add to first line of all
    'public/**/*.js'
    ]) // these are the files i want to concat in order, because stick relies on jquery
  .pipe(maps.init()) // create a map file for javascript
  .pipe(concat("app.js")) // pipe in the information into contact which does the magic and give it a file name
  .pipe(maps.write('./'))
  .pipe(gulp.dest('js')) // gulp will save save in the specified folder
  .pipe(livereload());
});

gulp.task('minifyScripts', ['concatScripts'],function(){ // adding [] says run this after what ever is in []] the return is important, because its a promise so it know to run after its complete
  return gulp.src('js/app.js') // use the app.js which was concated, we will run these in order later...
  .pipe(uglify()) // minify the information
  .pipe(rename('app.min.js')) // use rename module to rename the app so you have 2 files 1 min 1 standard
  .pipe(gulp.dest('js')) // write back to js file
})

gulp.task('compileSass',function(){
  return gulp.src('scss/application.scss') // only 1 file because that file is imported the import file from each scss folder
  .pipe(maps.init()) //create the map
  .pipe(sass()) // compile in css
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
  .pipe(maps.write('./')) // puts the map file at the same level ./ as teh dest('css')
  .pipe(gulp.dest('css')) // because the scss file is called application it will become aplication.css if the 'css' folder doesnt exist it will create it
  .pipe(livereload()); // then send over to live reload
})


//
  // since nothing depends on it you dont need a return
gulp.task('watchFiles', function(){
  livereload.listen();
  // globing, look in scss folder any additional folder/file **, and then anything ending in a .scss (*.scss)
  gulp.watch('scss/**/*.scss', ['compileSass']); // run the following tasks when these change
  gulp.watch('main.js', ['concatScripts']) // want to watch the files we will actually change, and then run X tasks. dont really need to concatScripts but it has the maping so that makes debugging easier so we will add as dependecie.
  // watch will continully listen after is is ran
})

gulp.task('clean', function(){
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

// we do not need to include tasks that are injected
gulp.task('build', ['minifyScripts', 'compileSass'],function(){
  return gulp.src(['css/application.css','js/app.min.js', 'index.html', 'img/**', 'fonts/**'], { base: './'} ) // based tells gulp to preserve the directory structure in the current ('./') directory
    // take select all your main folders and the condeseded css add js file
    .pipe(gulp.dest('dist'));
})

// run gulp serve to run both watch files
gulp.task('serve', ['watchFiles'])



gulp.task('default', ['clean'], function(){
  gulp.start('build'); //wait for clean task to run then start up the build
}) // when you run gulp, run the build task