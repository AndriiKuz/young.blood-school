const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
// const watch = require("gulp-watch");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const del = require("del");
const browserSync = require("browser-sync").create();

const cssFiles = [
  "./node_modules/normalize.css/normalize.css",
  "./src/css/style.css",
  "./src/css/queries.css",
];

const jsFiles = ["./src/js/script.js", "./src/js/form.js"];

function sassCompile() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./src/css"));
}

function styles() {
  return gulp
    .src(cssFiles)
    .pipe(concat("styles.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: [">0.01%"],
        // cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )

    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src(jsFiles)
    .pipe(concat("script.js"))
    .pipe(
      uglify({
        toplevel: true,
      })
    )
    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.stream());
}

function htmlMove() {
  return gulp
    .src("./src/*.html")
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.stream());
}

function phpMove() {
  return gulp.src("./src/*.php").pipe(gulp.dest("./build"));
}

function mailerMove() {
  return gulp.src("./src/PHPMailer/**/*").pipe(gulp.dest("./build/PHPMailer"));
}

function imgMove() {
  return gulp.src("./src/img/*").pipe(gulp.dest("./build/img"));
}

function clean() {
  return del(["build/*"]);
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
    tunnel: true,
  });

  gulp.watch("./src/scss/**/*.scss", sassCompile);
  gulp.watch("./src/css/**/*.css", styles);
  gulp.watch("./src/js/**/*.js", scripts);
  gulp.watch("./src/*.html", htmlMove);
}

gulp.task("sass-compile", sassCompile);
gulp.task("styles", styles);
gulp.task("scripts", scripts);
gulp.task("watch", watch);

gulp.task(
  "build",
  gulp.series(
    clean,
    sassCompile,
    gulp.parallel(styles, scripts, htmlMove, phpMove, imgMove, mailerMove)
  )
);
