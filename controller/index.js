"use strict"

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

exports.showIndex = function(req, res, next) {

    //拿到之前通过中间件挂载的一个根目录名称
    let photoDir = req.app.locals.photoDir;
    fs.readdir(photoDir, function(err, files) {
        if (err) {
            return next(err);
        }
        let photosName = [];
        files.forEach(function(item) {
            if (fs.statSync(path.join(photoDir, item)).isDirectory()) {
                photosName.push(item);
            }
        });
        res.render('index', {
            photosName: photosName
        });
    });

};



exports.addPhotoName = function(req, res, next) {

    let photoDir = req.app.locals.photoDir;
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            return next(err);
        }
        //console.log(fields); { photoName: '哈哈' }
        let inputName = fields.photoName;
        let thisPath = path.join(photoDir, inputName);
        fs.access(thisPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
                //不存在，可以创建相册
                console.log('不存在，可以创建相册')
                fs.mkdir(thisPath, function(err) {
                    if (err) {
                        return next(err);
                    }
                    res.render('reminder', {
                        reminder: "相册创建成功！"
                    });
                });
            } else {
                //相册已经存在
                res.render('reminder', {
                    reminder: "相册已经存在了！"
                });
            }

        });

    });


};