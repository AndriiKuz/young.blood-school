const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const watch = require("gulp-watch");

gulp.task("sass-compile", function () {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./src/css/"));
});

gulp.task("watch", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass-compile"));
});
