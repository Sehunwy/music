//首页
exports.index = function(req, res) {
    var PlaylistMusicUtil = require('../dao/PlaylistMusicUtil');
    //2,创建对象
    playlistMusicUtil = new PlaylistMusicUtil();
    playlistMusicUtil.init();
    playlistMusicUtil.queryPlaylist(function (data) {
        var AlbumMusicUtil = require('../dao/AlbumMusicUtil');
        //2,创建对象
        albumMusicUtil = new AlbumMusicUtil();
        albumMusicUtil.init();
        albumMusicUtil.queryalbum(function (album) {
            res.render('index', {
                data: data,
                album:album
            })
        })
    })
}