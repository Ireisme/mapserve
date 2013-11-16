var express = require('express'),
  api = require('./routes/api');

var app = express();

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));
  app.engine('html', require('ejs').renderFile);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/partials/:name', function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

app.get('/api/states', api.states);
app.get('/api/state/:name', api.state)

app.get('*', function(req, res) {
  res.render('index.html')
});


app.listen(8088);