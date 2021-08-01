const { src, dest, watch, series } = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

//Sass Task
function sassTask(){
    return src('./src/sass/main.sass', { sourcemaps: true})
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(dest('./public/css', { sourcemaps: '.'}));
}

//Javascript Task
function jsTask(){
    return src('src/js/multipleSelect.js', { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        //.pipe(uglify())
        .pipe(dest('public/js', { sourcemaps: '.' }));
}

function watchTask(){
    watch(['src/sass/**/*.sass', 'src/js/**/*.js'], series(sassTask, jsTask));
}

//Default Gulp task
exports.default = series(
    sassTask,
    jsTask,
    watchTask
)
