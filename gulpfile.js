var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');

var browser = require('browser-sync');

var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var util = require('gulp-util');

var isRelease = util.env.release || false;

gulp.task("server", function(){
	browser({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task("watch", function(){
	gulp.watch('css/scss/*.scss', ['css']);
});

gulp.task('css', function(){
	return gulp.src('css/scss/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefix("last 2 version"))
		.pipe(gulp.dest('css/'))
		.pipe(gulpif(isRelease, cssmin()))
		.pipe(gulp.dest('css/'))
		.pipe(browser.reload({stream:true}));
});


gulp.task('default', 
	gulpif(
		isRelease,
		['css'], // Release時はwatchしない
		['css','watch'] //Developの時はwatchしましょうね〜
	)
);