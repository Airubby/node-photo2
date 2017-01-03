"use strict"

const path = require('path');
const fs = require('fs');
const formidable = require('formidable');


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

}