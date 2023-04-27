// Approach 1 without gulp-load-plugins

// var gulp = require('gulp');
// var jshint = require('gulp-jshint');
// var jscs = require('gulp-jscs');
// var concat = require('gulp-concat');

// // gulp task for lint
// gulp.task('lint', function(){
//     return gulp.src('./src/**/*.js')
//     .pipe(jscs())
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });

// // gulp task for concat
// gulp.task('scripts', function(){
//     return gulp.src('./src/**/*.js')
//     .pipe(jscs())
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('dist'));
// });


// Approach 2 with gulp-load-plugins

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:true});
var sass = require('gulp-sass')(require('sass'));
var config = require('./gulp-config')();
var browserSync = require('browser-sync');

// gulp task (default) that will list all the tasks
gulp.task('default', function(){
    $.taskListing();
})

// gulp task for lint
gulp.task('lint', function(){
    return gulp.src('./src/**/*.js')
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// gulp task for concat
gulp.task('scripts', function(){
    return gulp.src(config.allScripts.jsSrc)
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('all.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts/'));
});

// gulp task for styles
gulp.task('style', function() {
    return gulp.src(config.allScripts.sassSrc)
    .pipe($.sass())
    .pipe($.plumber({errorHandler: sass.logError}))
    .pipe($.autoprefixer({browser: ['last 4 versions', '> 5%']}))
    .pipe($.csslint())
    .pipe($.csslint.reporter)
    .pipe(gulp.dest('dist/'));
})

// gulp task for optimize
gulp.task('optimize', function() {
    return gulp.src(config.allScripts.sassSrc)
    .pipe($.uncss({html: ['index.html', 'about.html'], ignore:[/input/]}))
    .pipe($.csso())
    .pipe(gulp.dest('dist/'));
})

// Gulp task for sass watch
gulp.task('sass-watch', function(){
    return gulp.watch(config.allScripts.sassSrc, ['styles'])
});

// Gulp task for wiredep
gulp.task('wiredep', function(){
    var options = config.wiredepOptions
    return gulp.src(config.html)
    .pipe($.inject(gulp.src([config.allScripts.jsSrc, config.allScripts.sassSrc])))
    .pipe(wiredep(options))
    .pipe(gulp.dest(config.client));
})

// gulp task to lint html
gulp.task('html', function(){
    return gulp.src(config.html)
    .pipe($.htmlhint())
    .pipe($.htmlhint.reporter)
});

function startSync() {
    if(browserSync.active) {
        return;
    }
    var bsOptions = {
        proxy: 'localhost:8000',
        port: 3001,
        files: [
            '**/*.html',
            '**/*.js',
            '**/*.css'
        ]
    }
    browserSync(bsOptions);
}

// gulp task to monitor and restart server
gulp.task('nodemon', ['optimize'], function(){
    return $.nodemon({
        script: config.nodeServ,
        watch: config.srv
    })
    .on('start', function() {
        console.log("Server started");
        startSync();
    })
    .on('restart', ['optimize'], function(){
        console.log("Server restarted");    
    })
})