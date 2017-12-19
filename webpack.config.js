var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');//获取src的绝对路径 process.cwd()用来获取当前目录的绝对路径

//获取多个页面的每个入口文件
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);//将js目录下的文件名,组合成一个数组
    var matchs = [],//用于储存match过滤出的js文件的信息
        files = {};
    dirs.forEach(function(item) {
        matchs = item.match(/(.+)\.js$/);
        if(matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    })
    return files;
}

module.exports = {
    cache: true,
    devtool: '#soure-map',
    entry: getEntry(),
    output: {
        path: path.resolve(__dirname, 'dist/jss'),//这是js文件放置本地的路径
        publicPath: 'dist/js',//这是html引入url的
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    },
    resolve: {
        alias: {
            jquery: srcDir + '/js/lib/jquery-2.1.3.min.js',
            tanchuang: srcDir + '/js/lib/tanchuang.js',
            yanzheng: srcDir + '/js/lib/yanzheng.js',
            swiper: srcDir + '/js/lib/swiper-3.4.2.min.js',
            reg: srcDir + '/js/lib/reg.js',
            listview: srcDir + '/js/lib/listview.js',
            fetch: srcDir + '/js/lib/fetch.js'
        }
    },
    plugins: [
        new CommonsChunkPlugin({name: 'common'}),
        new uglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        new webpack.NamedModulesPlugin(),
    ]
}