var gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    ugfity = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    spriter = require('gulp-css-spriter'),
    base64 = require('gulp-css-base64'),
    autoprefixer = require('gulp-autoprefixer'),
    bower = require('gulp-bower');
    connect = require('gulp-connect'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config'),
    stripDebug = require('gulp-strip-debug');

    var rev = require('gulp-rev');
    var revCollector = require('gulp-rev-collector');
    var runSequence = require('run-sequence');
    var cssUrlAdjuster = require('gulp-css-url-adjuster');

var host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

var brower = os.platform() === 'linux' ? 'Google chrome'
    : (os.platform() === 'darwin' ? 'Google chrome'
    : (os.platform() === 'win32' ? 'chrome' : 'firefox'));

//将图片拷贝到目标目录
gulp.task('copy:imagesrev', function() {
    return gulp.src(['src/images/**/*'])
        .pipe(rev())
        .pipe(gulp.dest('dist/images'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/img'))

});

gulp.task('copy:images', function() {
    return gulp.src(['src/images/**/*'])
        .pipe(gulp.dest('dist/images'))

});

//用于html文件内, 可以以include模板
gulp.task('fileinclude', function() {
    return gulp.src(['src/app/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/app'))

});

gulp.task('fileinclude:rev', function() {
    return gulp.src(['rev/**/*.json','src/app/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                '../js': '/js/front',
                '../css': '/css/front',
                '../images': '/img/front'
            }
        }))
        .pipe(gulp.dest('dist/app'))

});

gulp.task('font:rev', function () {
    return gulp.src('src/font/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/font'))

});

gulp.task('font', function () {
    return gulp.src('src/font/*.css')
        .pipe(gulp.dest('dist/css'))

});

gulp.task('font:font', function () {
    return gulp.src(['!src/font/*.css','src/font/**'])
        .pipe(gulp.dest('dist/css'))

});

//编译less合并css, 既有自己写的less也有第三方css
gulp.task('lesscat', function() {
    return gulp.src(['src/css/main.less', 'src/css/*.css'])
        .pipe(less())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))

});

//sprite雪碧图合并, 先拷贝图片到dist/images和编译less合并css
gulp.task('sprite:rev',['copy:imagesrev','lesscat'], function() {
    var timestamp = +new Date();
    return gulp.src('dist/css/style.min.css')
        .pipe(spriter({
            spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',//这里可以替换为生成环境的cdn链接
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .pipe(cssUrlAdjuster({
            replace: ['../images','/img/front']
        }))
        .pipe(cssmin())
        .pipe(autoprefixer())
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/style'))

});

gulp.task('sprite',['copy:images','lesscat'], function() {
    var timestamp = +new Date();
    return gulp.src('dist/css/style.min.css')
        .pipe(spriter({
            spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',//这里可以替换为生成环境的cdn链接
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .pipe(cssmin())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
});

//引入webpack 压缩js

var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);
gulp.task('build-js',['fileinclude'], function(callback) {
    devCompiler.run(function(err, status) {
        if(err) throw new gutil.PluginError('webpack:build-js', err);
        gutil.log('[webpack:build-js]', status.toString({
            color: true
        }));
        callback();
    })
});

//为js文件加上10位MD5,并修改html中的引用路径, 依赖于build-js
gulp.task('md5:js', ['build-js'], function() {
    return gulp.src(['dist/jss/*.js'])
        .pipe(stripDebug())
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('move-js:rev', ['build-js'], function() {
    return gulp.src(['dist/jss/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
});

gulp.task('move-js', ['build-js'], function() {
    return gulp.src(['dist/jss/*.js'])
        .pipe(gulp.dest('dist/js'))
});

gulp.task('zepto:rev', function() {
    return gulp.src(['src/static/*.js'])
        .pipe(ugfity())
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/zepto'))
});

gulp.task('zepto', function() {
    return gulp.src(['src/static/*.js'])
        .pipe(ugfity())
        .pipe(gulp.dest('dist/js'))
});

//为css文件加上10位MD5, 并修改html中的引入路径,
gulp.task('md5:css', ['sprite'], function() {
    return gulp.src(['dist/css/*.css'])
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/css'))
});

//删除dist文件夹
gulp.task('clean', function() {
    return gulp.src(['dist', 'rev'])
        .pipe(clean())
});

//监控文件变化
gulp.task('watch', function(){
    return gulp.watch('src/**/*', ['lesscat','copy:images', 'build-js','move-js', 'zepto','fileinclude'])
});

//本地服务器
gulp.task('connect', function() {
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

//自动打开url
gulp.task('open', function() {
    return gulp.src('')
        .pipe(gulpOpen({
            app: brower,
            uri: 'http://localhost:3000/app'
        }))
});


gulp.task('bower:swipercssrev', function() {
    return gulp.src('src/bowerComponent/swiper/dist/css/swiper.min.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/bower'))
});

gulp.task('bower:swipercss', function() {
    return gulp.src('src/bowerComponent/swiper/dist/css/swiper.min.css')
        .pipe(gulp.dest('dist/css'))
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('dist/js'))

})

//发布
// gulp.task('default', ['connect', 'fileinclude', 'md5:css', 'md5:js', 'font','bower:swipercss','zepto', 'open' ]);//第一版本
// gulp.task('default', ['connect', 'fileinclude:rev', 'move-js:rev', 'sprite:rev','font:rev','font:font', 'bower:swipercssrev','zepto:rev','open']);
gulp.task('default', function(cb) {
    runSequence('clean', ['move-js:rev', 'sprite:rev','font:rev','font:font', 'bower:swipercssrev','zepto:rev'],'fileinclude:rev', cb)
});
//开发
gulp.task('dev', ['connect', 'copy:images', 'fileinclude', 'lesscat', 'move-js','font','font:font', 'bower:swipercss','zepto', 'watch', 'open']);


