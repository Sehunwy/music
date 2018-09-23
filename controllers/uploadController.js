exports.upload=function (req, res) {
    var formidable = require('formidable');
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public/upload';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {
        // console.log(files.uploadImage);
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