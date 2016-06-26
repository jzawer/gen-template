var nunjucks = require('nunjucks');
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080, '127.0.0.1');

app.use(express.static('node_modules'));

nunjucks.configure('views', {
  autoescape: true,
  express   : app
});

app.get('/', function(req, res) {
  res.render('index.html', {
    name: 'pepe'
  });
});

function connect() {
	socket.emit('sayHello');
}

io.on('connection', function (socket) {

	socket.on('hi', function(data) {
		var form_data = [];

		data.forEach(function(index, element){

			var name_tmp = index.name;
			var value_tmp = index.value;
			var tmp = [];
			tmp[name_tmp] = value_tmp;

			form_data.push(tmp);
		});
		console.log(form_data);
	});


});
