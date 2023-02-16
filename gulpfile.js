const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();


 






// Sass Task
function scssTask(){
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer({overrideBrowserslist: ["last 5 versions"], cascade: true,}), cssnano() ]))
    .pipe(dest('dist', { sourcemaps: '.' }))
    
  
}




// JavaScript Task
function jsTask(){
  return src('./scss/**/*.scss', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
       baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(
  scssTask,
  jsTask,
  browsersyncServe,
  watchTask
  
  
);