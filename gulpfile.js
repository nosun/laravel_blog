var elixir = require('laravel-elixir');
var gulp    = require('gulp');
var htmlmin = require('gulp-htmlmin');
var argv    = require('yargs').argv;

var Task=elixir.Task;

elixir.config.assetsPath = "./resources/assets/";
elixir.config.publicPath = "./public/";

elixir.extend('compress', function() {
    new Task('compress', function() {
        return gulp.src('./storage/framework/views/*')
            .pipe(htmlmin({
                collapseWhitespace:    true,
                removeAttributeQuotes: true,
                removeComments:        true,
                minifyJS:              true
            }))
            .pipe(gulp.dest('./storage/framework/views/'));
    })
        .watch('./storage/framework/views/*');
});

elixir(function(mix) {
    var buildJs = function(){
        mix.browserify(['common.js'],  'public/js/common.js');
        mix.scripts(['plugin-js/*.js', 'general-js/*.js','after-js/*.js'],  'public/js/app.js');
    };

    var buildCss = function(){
        mix.less('general/*.less', 'public/css/app.css');
    };

    var buildExtra = function(){
        mix.less('admin-lte/AdminLTE.less', 'public/css/admin-lte/AdminLTE.css');
        mix.less('admin-lte/skins/_all-skins.less', 'public/css/admin-lte/skins/_all-skins.css');
        mix.less('admin-lte/skins/skin-blue.less', 'public/css/admin-lte/skins/skin-blue.css');
        mix.copy(elixir.config.assetsPath+'js/admin-lte/**', elixir.config.publicPath+'js/admin-lte/');
        mix.copy(elixir.config.assetsPath+'images/**', elixir.config.publicPath+'images/');
    };

    var buildCompress = function(){
        mix.compress();
    };

    switch(true){
        case !!argv.s:
            buildJs();
            break;
        case !!argv.c:
            buildCss();
            break;
        case !!argv.e:
            buildExtra();
            break;
        case !!argv.p:
            buildCompress();
            break;
        default:
            buildCss();
            buildJs();
            break;
    }
});