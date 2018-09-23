//查询歌曲
exports.SelectSong = function (req, res) {
    var SongMusicUtil = require('../dao/SongMusicUtil');
    //2,创建对象
    songMusicUtil = new SongMusicUtil();
    songMusicUtil.init();
    songMusicUtil.querySong(function (data) {
        var playlists = [];
        var index = 0;
        for(var i=0;i<data.length;i++) {
            var PlaylistMusicUtil = require('../dao/PlaylistMusicUtil');
            //2,创建对象
            playlistMusicUtil = new PlaylistMusicUtil();
            playlistMusicUtil.init();
            playlistMusicUtil.queryMusic_list(data[i].music_id,function (playlist) {
                index++;
                for(var i=0;i<playlist.length;i++) {
                    playlists.push({id:playlist[i].music_id,playlist_name:playlist[i].playlist_name});
                }
                if(index==data.length) {
                    var response = {
                        data: data,
                        playlist: playlists
                    }
                    res.end(JSON.stringify(response));
                }

            });
        }
    });
}

//添加歌曲
exports.uploadSong = function (req, res) {

    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public/upload';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {
        console.log(files.uploadImage.path);
        if (err) {
            res.locals.error = err;
            res.render('index', { title: "歌曲上传失败" });
            return;
        }
        //显示地址；
        var path = files.uploadImage.path;
        var index=  path.lastIndexOf('\\')+1;
        path=path.substring(index,path.length);
        console.log(path);
        res.json({
            "newPath":'http://localhost:8888/upload/'+path
        });
    });
}

//添加音乐
exports.addMusic = function (req, res) {
    var name = req.query.name;
    var singer = req.query.singer;
    var languages = req.query.languages;
    var amount = req.query.amount;
    var collection = req.query.collection;
    var musicSrc = req.query.musicSrc;
    var album_id = req.query.playlist_name;

    //1, 引入模块
    var SongMusicUtil = require('../dao/SongMusicUtil');
    //2,创建对象
    songMusicUtil = new SongMusicUtil();
    songMusicUtil.init();
    songMusicUtil.inserMusic(name,singer,languages,amount,collection,musicSrc,album_id,function (data) {
        id = data.insertId;
        var response = {
            result:1,
            id:id
        }
        console.log(JSON.stringify(response));
        res.end(JSON.stringify(response));
    });
}

//删除歌曲
exports.deleteMusic =  function(req, res) {
    req.on('data',function (Music_id) {
        var SongMusicUtil = require('../dao/SongMusicUtil');
        //2,创建对象
        songMusicUtil = new SongMusicUtil();
        songMusicUtil.init();
        songMusicUtil.delete(Music_id,function (data) {
            songMusicUtil.deleteSongP(Music_id);
            var response = {
                result:1
            }
            res.end(JSON.stringify(response));
        });

    });
}

//根据id查询歌曲
exports.selectMusicid = function (req, res) {
    var id = req.query.id;
    //1, 引入模块
    var SongMusicUtil = require('../dao/SongMusicUtil');
    //2,创建对象
    songMusicUtil = new SongMusicUtil();
    songMusicUtil.init();
    songMusicUtil.queryId(id,function (songData) {
        songData.forEach(function (song) {
            var response = {
                song:song
            }
            res.end(JSON.stringify(response));
            //species.push(specie);
        });
    });
}

//修改歌曲
exports.alterMusicid = function (req, res) {
    var id = req.query.id;
    var name = req.query.name;
    var singer = req.query.singer;
    var language = req.query.language;
    var album_id = req.query.album_id;
    //1, 引入模块
    var SongMusicUtil = require('../dao/SongMusicUtil');
    //2,创建对象
    songMusicUtil = new SongMusicUtil();
    songMusicUtil.init();
    songMusicUtil.update(id,name,singer,language,album_id);
    var response = {
        result:1
    }
    res.end(JSON.stringify(response));
}

//将歌曲与歌单相连
exports.addSongPlaylist = function (req, res) {
    var id = req.query.id;
    var check_val = req.query.check_val;
    var index = 0;
    var playlist = check_val.split(",")
    var SongPlaylistUtil = require('../dao/SongPlaylistUtil');
    //2,创建对象
    songPlaylistUtil = new SongPlaylistUtil();
    songPlaylistUtil.init();
    songPlaylistUtil.delete(id,function (data) {
        for(var i=0;i<playlist.length;i++) {
            songPlaylistUtil.inserMusic(id,playlist[i]);
            index++;
        }
        if(index==playlist.length) {
            var response = {
                result:1
            }
            res.end(JSON.stringify(response));
        }
    });
}
