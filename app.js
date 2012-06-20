/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes');
var mysql = require('mysql');
var client = mysql.createClient({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: 'mydb',
  table: 'login'
});

var app = module.exports = express.createServer();


// Configuration
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'your secret here'
  }));
  /*app.use(require('stylus').middleware({
    src: __dirname + '/public'
  }));*/

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});


app.post('/authenticate', routes.authenticate);

app.get('/login', routes.login);
app.get('/signup', routes.signup);
app.post('/insert', routes.insert);
app.get('/message', routes.message);
app.post('/display', routes.display);
app.get('/select', routes.select);
app.get('/wrong',routes.wrong);
// Routes
app.get('/', routes.home);

app.post('/', routes.home_post_handler);

app.post('/putdata', routes.putdata);


app.listen(3000, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
