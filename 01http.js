var express = require('express');
var app = express();
var path = require('path');
var fs = require("fs");
var bodyParser = require('body-parser');
//handle request entity too large
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
//设置静态文件
app.use(express.static('public'));
//设置html引擎
app.set('view engine', 'html');
//设置视图地址
app.set('views', path.join(__dirname, '/views'));
//设置html引擎
app.engine('html', require('ejs').__express);
//指定模板引擎
// app.set("view engine", 'ejs');
// //指定模板位置
// app.set('views', __dirname + '/views');
//接受表单的请求

var urlencodedParser=bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

var formidable = require('formidable');

//引入腾讯云模块

// var COS = require('cos-nodejs-sdk-v5');

//首页
var indexController = require('./controllers/IndexController');
app.get('/index', indexController.index);

//图片上传
var uploadController = require('./controllers/uploadController');
app.post('/upload', uploadController.upload);

//添加歌单
var playlistController = require('./controllers/playlistController');
app.get('/addPlaylist', playlistController.addPlaylist);

//删除歌单
var playlistController = require('./controllers/playlistController');
app.post('/deletePlaylist', playlistController.deletePlaylist);

// 修改歌单
var playlistController = require('./controllers/playlistController');
app.post('/Playlistupload', playlistController.Playlistupload);

//根据id查询歌单
var playlistController = require('./controllers/playlistController');
app.post('/selectPlaylistid', playlistController.selectPlaylistid);

//修改歌单
var playlistController = require('./controllers/playlistController');
app.post('/alterplaylist', playlistController.alterplaylist);


//查询歌曲
var songController = require('./controllers/songController');
app.get('/SelectSong', songController.SelectSong);

//添加歌曲
var songController = require('./controllers/songController');
app.post('/uploadSong', songController.uploadSong);

//添加音乐
var songController = require('./controllers/songController');
app.get('/addMusic', songController.addMusic);

//删除歌曲
var songController = require('./controllers/songController');
app.post('/deleteMusic', songController.deleteMusic);

//根据id查询歌曲
var songController = require('./controllers/songController');
app.get('/selectMusicid', songController.selectMusicid);

//修改歌曲
var songController = require('./controllers/songController');
app.get('/alterMusicid', songController.alterMusicid);

//将歌曲与歌单相连
var songController = require('./controllers/songController');
app.get('/addSongPlaylist', songController.addSongPlaylist);

//查询专辑
app.get('/SelectAlbum', function (req, res) {
    var AlbumMusicUtil = require('./dao/AlbumMusicUtil');
    //2,创建对象
    albumMusicUtil = new AlbumMusicUtil();
    albumMusicUtil.init();
    albumMusicUtil.queryalbum(function (data) {
        var response = {
            data:data
        }
        res.end(JSON.stringify(response));
    });
});

//添加专辑
app.post('/addAlbum', urlencodedParser, function(req, res) {
    req.on('data',function (album) {
        var album_name = album;
        var AlbumMusicUtil = require('./dao/AlbumMusicUtil');
        //2,创建对象
        albumMusicUtil = new AlbumMusicUtil();
        albumMusicUtil.init();
        albumMusicUtil.inserAlbum(0,album_name,function (data) {
            id = data.insertId;
            var response = {
                result:1,
                id:id,
                album:album_name.toString()
            }
            // console.log(JSON.stringify(response));
            res.end(JSON.stringify(response));
        });
    });
});

//删除专辑
app.post('/deleteAlbum', urlencodedParser, function(req, res) {
    req.on('data',function (album_id) {
        var AlbumMusicUtil = require('./dao/AlbumMusicUtil');
        //2,创建对象
        albumMusicUtil = new AlbumMusicUtil();
        albumMusicUtil.init();
        albumMusicUtil.delete(album_id);
        var response = {
            result:1
        }
        res.end(JSON.stringify(response));
    });
});

//根据id查询专辑
app.get('/selectAlbumid', function (req, res) {
    var id = req.query.id;
    //1, 引入模块
    var AlbumMusicUtil = require('./dao/AlbumMusicUtil');
    //2,创建对象
    albumMusicUtil = new AlbumMusicUtil();
    albumMusicUtil.init();
    albumMusicUtil.queryId(id,function (albumData) {
        albumData.forEach(function (album) {
            var response = {
                album:album.album_name
            }
            res.end(JSON.stringify(response));
            //species.push(specie);
        });
    });
});

//修改专辑
app.get('/alterAlbumid', function (req, res) {
    var id = req.query.id;
    var name = req.query.name;
    //1, 引入模块
    var AlbumMusicUtil = require('./dao/AlbumMusicUtil');
    //2,创建对象
    albumMusicUtil = new AlbumMusicUtil();
    albumMusicUtil.init();
    albumMusicUtil.update(id,name);
    var response = {
        result:1
    }
    res.end(JSON.stringify(response));
})

//查询mv
app.get('/SelectMv', function (req, res) {
    var MVMusicUtil = require('./dao/MVMusicUtil');
    //2,创建对象
    mvMusicUtil = new MVMusicUtil();
    mvMusicUtil.init();
    mvMusicUtil.queryMV(function (data) {
        var response = {
            data:data
        }
        res.end(JSON.stringify(response));
    });
});

//添加mv
app.get('/addMV', function (req, res) {
    var Name = req.query.Name;
    var Infor = req.query.Infor;
    var address = req.query.address;
    console.log(Name);
    //1, 引入模块
    var MVMusicUtil = require('./dao/MVMusicUtil');
    //2,创建对象
    mvMusicUtil = new MVMusicUtil();
    mvMusicUtil.init();
    mvMusicUtil.inserMv(Name,Infor,address,function (data) {
        id = data.insertId;
        var response = {
            result:1,
            id:id,
            Name:Name,
            Infor:Infor,
            address:address
        }
        console.log(JSON.stringify(response));
        res.end(JSON.stringify(response));
    });
})

//删除mv
app.post('/deleteMv', urlencodedParser, function(req, res) {
    req.on('data',function (mv_id) {
        var MVMusicUtil = require('./dao/MVMusicUtil');
        //2,创建对象
        mvMusicUtil = new MVMusicUtil();
        mvMusicUtil.init();
        mvMusicUtil.delete(mv_id);
        var response = {
            result:1
        }
        res.end(JSON.stringify(response));
    });
});

//根据id查询MV
app.get('/selectMVid', function (req, res) {
    var id = req.query.id;
    //1, 引入模块
    var MVMusicUtil = require('./dao/MVMusicUtil');
    //2,创建对象
    mvMusicUtil = new MVMusicUtil();
    mvMusicUtil.init();
    mvMusicUtil.queryId(id,function (mvData) {
        mvData.forEach(function (mv) {
            var response = {
                mv:mv
            }
            res.end(JSON.stringify(response));
            //species.push(specie);
        });
    });
});

//修改MV
app.get('/alterMVid', function (req, res) {
    var id = req.query.id;
    var name = req.query.name;
    var infor = req.query.infor;
    var address = req.query.address;
    //1, 引入模块
    var MVMusicUtil = require('./dao/MVMusicUtil');
    //2,创建对象
    mvMusicUtil = new MVMusicUtil();
    mvMusicUtil.init();
    mvMusicUtil.update(id,name,infor,address);
    var response = {
        result:1
    }
    res.end(JSON.stringify(response));
})



app.listen(8888);