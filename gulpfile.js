var gulp        = require('gulp');

var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var compass     = require('gulp-compass');
var size        = require('gulp-filesize');
var changed     = require('gulp-changed-in-place');

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
                'js/jquery.lazyload.min.js',
                'js/js.cookie.js',
                'js/foundation.min.js',
                'js/jquery.transit.min.js',
                'js/jquery.touchSwipe.min.js',
                'js/perfect-scrollbar.jquery.min.js',
                'js/min/dragdealer.min.js',
                'js/src/main.js',
                'js/src/gartonjones.js',
                'js/src/video.js',
                'js/src/menu.js',
                'js/src/ajax-pagination.js'
            ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(size())
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(size());
});

gulp.task('sass', function() {
	return gulp.src('sass/**/*.scss')
		.pipe(compass({
			config_file: './config.rb',
			style: 'compressed',
			css: 'css',
			sass: 'sass',
			javascript: 'js',
			font: 'fonts',
			image: 'img'			
		}))
        .pipe(size());
});

gulp.task('js-minify', function() {
    return gulp.src(['js/src/**/*.js'])
        // .pipe(changed('js/min/'))
        // .pipe(changed())
        .pipe(uglify())
        .pipe(rename( function(path) {
            path.basename += '.min'
        }))
        .pipe(gulp.dest('js/min/'))
        .pipe(size());
});

gulp.task('js-parallax-minify', function() {
    return gulp.src(['js/parallax/*.js'])
        // .pipe(changed('js/min/parallax/'))
        // .pipe(changed())
        .pipe(uglify())
        .pipe(rename( function(path) {
            path.basename += '.min'
        }))
        .pipe(gulp.dest('js/min/parallax/'))
        .pipe(size());
});

// Default Task
gulp.task('default', ['scripts']);

gulp.task('watch', function() {
	gulp.watch('js/src/*.js', ['scripts']);
	gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/src/**/*.js', ['js-minify']);
    gulp.watch('js/parallax/*.js', ['js-parallax-minify']);
});