const gulp = require("gulp");

const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const livereload = require("gulp-livereload");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");

const minifyCSS = require("gulp-minify-css");
const autoprefixer = require("gulp-autoprefixer");

const del = require("del");

const imagemin = require("gulp-imagemin");
const imageminPNGquant = require("imagemin-pngquant");
const imageminJPEGrecompress = require("imagemin-jpeg-recompress");
const zip = require("gulp-zip");

var DIST_PATH = "client/dist";
var SCRIPTS_PATH = "client/js/**/*.js";
var CSS_PATH = "client/css/**/*.css";
var IMAGES_PATH = "client/images/**/*.{png,jpeg,jpg,svg,gif}";

// CSS
gulp.task("styles", function() {
	console.log("Starting styles task");
	return gulp
		.src(CSS_PATH)
		.pipe(
			plumber(function(error) {
				console.log("Styles task error: ", error);
				this.emit("end");
			})
		)
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({ browsers: ["last 2 versions", "ie 8"] }))
		.pipe(concat("style.css"))
		.pipe(minifyCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Scripts
gulp.task("scripts", function() {
	console.log("Starting scripts task.");
	return gulp
		.src(SCRIPTS_PATH)
		.pipe(
			plumber(function(err) {
				console.log("Scripts task error!");
				console.log(err);
				this.emit("end");
			})
		)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat("scripts.js"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Images
gulp.task("images", function() {
	return gulp
		.src(IMAGES_PATH)
		.pipe(
			imagemin([
				imagemin.gifsicle(),
				imagemin.jpegtran(),
				imagemin.optipng(),
				imagemin.svgo(),
				imageminPNGquant(),
				imageminJPEGrecompress()
			])
		)
		.pipe(gulp.dest(DIST_PATH + "/images"));
});

// Clean
gulp.task("clean", function() {
	console.log("Starting delete task");
	return del.sync([DIST_PATH]);
});

// Default
gulp.task("default", ["clean", "images", "styles", "scripts"], function() {
	console.log("Starting default task.");
});

// Zip
gulp.task("export", function() {
	return gulp
		.src("public/**/*")
		.pipe(zip("website.zip"))
		.pipe(gulp.dest("./"));
});

// Watch
gulp.task("watch", ["default"], function() {
	console.log("Starting watch task.");
	require("./server.js");
	livereload.listen();
	gulp.watch(CSS_PATH, ["styles"]);
	gulp.watch(SCRIPTS_PATH, ["scripts"]);
});
