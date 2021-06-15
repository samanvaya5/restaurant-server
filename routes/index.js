var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join('D:/Projects/Backend_Coursera/NodeJS/conFusionServer/public/about.html'))
});

module.exports = router;
