/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes');
var mysql = require('mysql');

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

// Routes
app.post('/authenticate', routes.authenticate);
app.get('/login', routes.login);
app.get('/signup', routes.signup);
app.post('/insert', routes.insert);
app.get('/message', routes.message);
app.post('/display', routes.display);
app.get('/select', routes.select);
app.get('/wrong',routes.wrong);
app.get('/querymessage',routes.querymessage);
app.post('/query',routes.query);
app.get('/', routes.home);
//requesting & setting status
app.get('/stats',routes.stats);
app.post('/done',routes.done);
app.get('/mobstatus',routes.mobstatus);
app.post('/report',routes.report);
// Server
var port = process.env.PORT || 3001; 
app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
