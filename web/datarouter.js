var express = require('express');
var path = require('path');
var router = express.Router();
var info = require('./RHS_Execution.js');
var app = express();

router.get('/', (req, res) =>
{
    //info.obj.urlData
    res.send('info', { title: "datarouter"});
    
});
module.exports = router; 