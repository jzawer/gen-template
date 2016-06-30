var nunjucks = require('nunjucks');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var router = express.Router();

server.listen(8080, '127.0.0.1');

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.use(express.static('node_modules'));
app.use(router);


nunjucks.configure('views', {
  autoescape: true,
  express   : app
});

router.get('/', function(req, res) {
	res.render('index.html', {title: 'jose'}, function(err, html) {
		res.send(html);
	});
});

router.post('/generate', function(req, res) {
	data = req.body;

	res.render('templates/construction_web.html',data , function(err, html){
		if(err) console.log(err);
		//res.send(html);
		// trying same but forcing status
		res.status(200).send(html);
	});
});

/*io.sockets.on('connection', function(socket) {
	socket.on('generate', function(data) {
		app.render('templates/construction_web.html', function(err, html){

		});
	});
});*/
