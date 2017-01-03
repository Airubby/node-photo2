"use strict"

const fs = require('fs');
const path = require('path');

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

}