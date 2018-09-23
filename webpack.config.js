const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        playlist: './src/playlist.js',
        song: './src/song.js',
        mv:'./src/mv.js',
        album:'./src/album.js'
   },
    plugins: [
        new CleanWebpackPlugin(['public/react'])
    ],
    devtool: 'inline-source-map',
    output: {
        filename: '[name].all.js',
        path: path.resolve(__dirname, "public/react")
    },
    mode:'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }
            }
        ]
    },
    watch:true
}