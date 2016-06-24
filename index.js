var nunjucks  = require('nunjucks');
var express   = require('express');
var app       = express();

app.listen(8080);

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
