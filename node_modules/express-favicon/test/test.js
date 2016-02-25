var express = require('express');
var favicon = require('../index');

var app = express();

app.use(favicon(__dirname + '/favicon.ico'));


app.listen(3001, function(){
	console.log('server is running .');
});
