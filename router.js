"use strict"

//当前router文件就是配置用户请求

const express = require('express');
const indexController = require('./controller/index');
const photoController = require('./controller/photo');

//router就可以用来组织用户路由，对每一个具体的请求
//分发到具体的响应函数
const router = express.Router();

router.get("/", indexController.showIndex);
router.post("/", indexController.addPhotoName);
router.get("/:photoName", photoController.showPhoto);
//router.post("/:photoName", photoController.uploadImages); //如果有多个post("/:photoName",) 就无法判断走哪个了
router.post("/photo/:photoName", photoController.uploadImages); // 加了photo后模板中也要加photo

module.exports = router;