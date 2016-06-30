var nunjucks = require('nunjucks');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

var app = express();
var upload = multer({ dest: './views/templates/construction/tmp/'});
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var router = express.Router();

server.listen(8080, '127.0.0.1');

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.use(express.static('node_modules'));
app.use(router);
app.use(express.static('views/templates/construction/tmp/'));


nunjucks.configure('views', {
  autoescape: true,
  express   : app
});

router.get('/', function(req, res) {
	res.render('index.html', {title: 'jose'}, function(err, html) {
		res.send(html);
	});
});

router.post('/generate', upload.single('image'), function(req, res) {
	data = req.body;
	data.image = 'logo';
	console.log(req.file);

	fs.renameSync(req.file.path, req.file.destination + 'logo');

	res.render('templates/construction/construction_web.html', data , function(err, html){
		if(err) console.log(err);

		console.log(data);

		res.status(200).send(html);
	});
});

/*io.sockets.on('connection', function(socket) {
	socket.on('generate', function(data) {
		app.render('templates/construction_web.html', function(err, html){

		});
	});
});*/
