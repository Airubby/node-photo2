"use strict"

const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const sd = require('silly-datetime');


exports.showPhoto = function(req, res, next) {

    let photoName = req.params.photoName;
    let photoDir = req.app.locals.photoDir;
    let fullPath = path.join(photoDir, photoName);
    fs.readdir(fullPath, function(err, files) {
        if (err) {
            return next(err);
        }
        let photoSrc = [];
        files.forEach(function(item) {
            if (fs.statSync(path.join(fullPath, item)).isFile()) {
                photoSrc.push(`/${photoName}/${item}`);
            }
        });
        res.render('photo', {
            photoSrc: photoSrc,
            photoName: photoName
        });
    });

};

exports.uploadImages = function(req, res, next) {

    let photoName = req.params.photoName;
    let photoDir = req.app.locals.photoDir;
    let fullPath = path.join(photoDir, photoName);

    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../tempUpload/");
    form.parse(req, function(err, fields, files) {
        let size = files.photoImage.size;
        if (size > (2 * 1024 * 1024)) {
            res.send("图片尺寸应该小于2M");
            //删除图片
            fs.unlink(files.photoImage.path);
            return;
        }

        let oldPath = files.photoImage.path;
        let extName = path.extname(files.photoImage.name);
        let ranNum = parseInt(Math.random() * 89999 + 10000);
        let date = sd.format(new Date(), 'YYYYMMDDHHmmss');

        if (!['.jpg', '.png', '.gif'].includes(extName)) {
            return res.send('只接受图片');
        }
        let distPath = path.join(fullPath, date + ranNum) + extName;

        fs.rename(oldPath, distPath, function(err) {
            if (err) {
                return next(err);
            }
            res.redirect('back');
        });

    });

};