//var Vivid = require('../../../vivid/index.js');    // When vivid is an npm package, this will be require('vivid');
//var myBlog = new Vivid();
//
//myBlog.init('./vivid.conf.js');
//myBlog.start();

var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('hello worldasdf there!!!!');
});

console.log("hi");

app.listen(8881);