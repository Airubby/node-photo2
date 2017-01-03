"use strict"

//当前router文件就是配置用户请求

const express = require('express');
const indexController = require('./controller/index');
const photoController = require('./controller/photo');

//router就可以用来组织用户路由，对每一个具体的请求
//分发到具体的响应函数
const router = express.Router();

router.get("/", indexController.showIndex);
router.get("/:photoName", photoController.showPhoto);
router.post("/:photoName", photoController.uploadImages);

module.exports = router;