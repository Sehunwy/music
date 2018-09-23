//添加歌单
exports.addPlaylist = function(req, res) {
    var name = req.query.name;
    var label = req.query.label;
    var pathsrc = req.query.pathsrc;
    var amount = req.query.amount;
    var collection = req.query.collection;
    var PlaylistMusicUtil = require('../dao/PlaylistMusicUtil');
    //2,创建对象
    playlistMusicUtil = new PlaylistMusicUtil();
    playlistMusicUtil.init();
    // inserPlaylist = function (id,name,path,amount,label,collection)
    playlistMusicUtil.inserPlaylist(0,name,pathsrc,amount,label,collection,function (data) {
        id = data.insertId;
        var response = {
            result:1,
            id:id
        }
        res.end(JSON.stringify(response));
    });
}

//删除歌单
exports.deletePlaylist =  function(req, res) {
    var id = req.body.id;
     // req.on('data',function (id) {
        console.log("id"+id);
        var PlaylistMusicUtil = require('../dao/PlaylistMusicUtil');
        //2,创建对象
        playlistMusicUtil = new PlaylistMusicUtil();
        playlistMusicUtil.init();
        playlistMusicUtil.delete(id);
        var response = {
            result:1
        }
        res.end(JSON.stringify(response));
     // });
}

// 修改歌单
exports.Playlistupload = function (req, res) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public/upload';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {
        console.log(files.uploadImage.path);
        if (err) {
            res.locals.error = err;
            res.render('index', { title: "图片上传失败" });
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

//根据id查询歌单
exports.selectPlaylistid = function (req, res) {
    var id = req.body.id;
    //1, 引入模块
    var PlaylistMusicUtil = require('../dao/PlaylistMusicUtil');
    //2,创建对象
    playlistMusicUtil = new PlaylistMusicUtil();
    playlistMusicUtil.init();
    playlistMusicUtil.queryId(id,function (playlistData) {
        playlistData.forEach(function (playlist) {
            var response = {
                playlist:playlist
            }
            res.end(JSON.stringify(response));
        });
    });
}

//修改歌单
exports.alterplaylist = function (req, res) {
    var id = req.body.id;
    var playName = req.body.playName;
    var playLabel = req.body.playLabel;
    var src = req.body.src;
    //1, 引入模块
    var PlaylistMusicUtil = require('../dao/PlaylistMusicUtil');
    //2,创建对象
    playlistMusicUtil = new PlaylistMusicUtil();
    playlistMusicUtil.init();
    playlistMusicUtil.update(id,playName,playLabel,src);
    var response = {
        result:1
    }
    res.end(JSON.stringify(response));
}