// import dependencies
import gulp from "gulp";
import sass from "gulp-sass";
import pug from "gulp-pug";
import browserSync from "browser-sync";

const server = browserSync.create();

// setting browser sync

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    tunnel: true,
    tunnel: "pcgrin",
    server: {
      baseDir: "."
    }
  });
  done();
}

// setting paths
const scss_path = {
  scripts: {
    src: "./scss/*.scss",
    dest: "./css/"
  }
};
const pug_path = {
  scripts: {
    src: "./pug/*.pug",
    dest: "."
  }
};

// gulp task
function scss() {
  return gulp
    .src(scss_path.scripts.src, {
      sourcemaps: true
    })
    .pipe(sass())
    .pipe(gulp.dest(scss_path.scripts.dest));
}

function pug_task() {
  return gulp
    .src(pug_path.scripts.src, {
      sourcemaps: true
    })
    .pipe(pug())
    .pipe(gulp.dest(pug_path.scripts.dest));
}

//watching
const watch_scss = () =>
  gulp.watch(scss_path.scripts.src, gulp.series(scss, reload));
const watch_pug = () =>
  gulp.watch(pug_path.scripts.src, gulp.series(pug_task, reload));

const dev = gulp.parallel(serve, watch_scss, watch_pug);
export default dev;
