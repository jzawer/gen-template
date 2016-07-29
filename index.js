var nunjucks = require('nunjucks');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var zip = require('express-easy-zip');
var fs = require('fs');
var path = require('path');

var app = express();
var upload = multer({ dest: './download/'});
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var router = express.Router();

server.listen(81, '0.0.0.0');

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
app.use(zip());

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
	if (req.file.path === undefined)
		return false;

	fs.renameSync(req.file.path, req.file.destination + 'logo');

	res.render('templates/construction/construction_web.html', data , function(err, html){
		if(err) console.log(err);

		fs.writeFile('./download/index.html', html, 'utf8', function(error) {
			if (error) throw error;
		});
	});

	res.zip({
		files: [
			{
				path: path.join(__dirname, 'download/'), name: 'download'
			}    //or a folder
		],
		filename: 'web.zip'
	});
});
