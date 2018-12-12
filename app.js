var express = require('express');
var path = require('path');
//var datarouter = require('./web/datarouter');
var methods = require('./web/RHS_Maincode.js');
var bodyParser = require('body-parser');

// Init app
var app = express();

app.use(express.static('public'));
app.use(express.static('views/slick'));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');


function sortByLikeUp(a,b) {
      if (b.likeCount < a.likeCount)
        return -1;
      if (b.likeCount > a.likeCount)
        return 1;
      return 0;
}

function sortByLikeDown(a,b) {
      if (a.likeCount < b.likeCount)
        return -1;
      if (a.likeCount > b.likeCount)
        return 1;
      return 0;
}

function sortByDateUp(a,b) {
      if (b.takenAt < a.takenAt)
        return -1;
      if (b.takenAt > a.takenAt)
        return 1;
      return 0;
}

function sortByDateDown(a,b) {
      if (a.takenAt < b.takenAt)
        return -1;
      if (a.takenAt > b.takenAt)
        return 1;
      return 0;
}

var _sortBy = sortByLikeUp;
var _instaObjs = [];

//Home route
app.get('/', function(req, res)
{
    res.render('index');
});

app.get('/data', function(req, res)
{
    methods.instainfo(function cb(instaObjs){
        _instaObjs = instaObjs.sort(_sortBy);
        res.render('indexdata', {"instaObjs" : _instaObjs});
    });
});

app.get('/reload', function(req, res)
{   
    console.log("reloaded");
    methods.instainfo(function cb(instaObjs){
        _instaObjs = instaObjs.sort(_sortBy);
        res.render('reload', {"instaObjs" : _instaObjs});
    });
})

app.post('/sort', function(req, res)
{
    console.log(req.body);
    switch(req.body.sortBy){
        case '1' :
                _sortBy = sortByLikeUp;
                break;
        case '2' :
                _sortBy = sortByLikeDown;
                break;
        case '3' :
                _sortBy = sortByDateUp;
                break;
        case '4' :
                _sortBy = sortByDateDown;
                break;
        default :
                _sortBy = sortByLikeUp;
                break;
    }
    _instaObjs = _instaObjs.sort(_sortBy);
    res.render('reload', {"instaObjs" : _instaObjs});
})

//Start server
server_port = process.env.PORT || 3000;
app.listen(server_port, function()
{
  console.log('Listening on port %d', server_port)
});

module.exports = app;
//-------------- ALL FUNCTION AFTER THIS LINE ------------- // 



