var express = require('express');
var app = express();
var connect = require('connect');
var RedisStore = require('connect-redis')(express);
// for showing IP address
var os = require('os');
//var ipv4 = os.networkInterfaces().eth0[0].address;

var ipv4 = os.address;
 
app.use(connect.cookieParser());

app.use(connect.session({ 
    store: new RedisStore({ url: process.env.REDIS_URL+'42' }), 
	secret: 'demo'
}));
app.set('port', (process.env.PORT || 5000));
// default route
app.get('/', function(req, res) {
      // write IP address and session.name
      res.write('IP:' + ipv4 + '\n');
      res.end('Name: ' + req.session.name + '\n');
});

app.get('/set/:name', function(req, res) {
      // set session.name based on url name
      req.session.name = req.params.name;
      res.redirect('/');
});

app.get('/clear', function(req, res) {
      // delete session.name
      delete req.session.name;
      res.redirect('/');
}); 

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});