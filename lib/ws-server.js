/**
 * Created by behnamhajian on 2016-07-06.
 */
'use strict';





function createAppServer(options){
  var cfenv = require('cfenv');
  var http = require('http');
  var express = require('express');
  var bodyParser= require('body-parser');
  var app = express();
  app.use(bodyParser.urlencoded({extended: true}))
  var server = http.createServer();
  var environment = cfenv.getAppEnv() || options;

  app.use('/', express.static('public'));
  server.on('request', app);
  server.listen(environment.port, function() {
    console.log('listen on : ' + environment.port);
  });

  createWebsocketServer({server: server, app: app}, function(sockets){
    app.get('/car/goForward', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'car/goForward' );
      }
      return res.send({signalSent: 'car/goForward'});
    });
    app.get('/car/goBackward', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'car/goBackward' );
      }
      return res.send({signalSent: 'car/goBackward'});
    });
    app.get('/car/turnLeft/fine', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'car/turnLeft/fine' );
      }
      return res.send({signalSent: 'car/turnLeft/fine'});
    });
    app.get('/car/turnLeft/coarse', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'car/turnLeft/coarse' );
      }
      return res.send({signalSent: 'car/turnLeft/coarse'});
    });
    app.get('/car/turnRight/fine', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'car/turnRight/fine' );
      }
      return res.send({signalSent: 'car/turnRight/fine'});
    });
    app.get('/car/turnRight/coarse', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'car/turnRight/coarse' );
      }
      return res.send({signalSent: 'car/turnRight/coarse'});
    });
    app.get('/car/stop', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'car/stop' );
      }
      return res.send({signalSent: 'car/stop'});
    });
    app.get('/car/setSpeed/:speed', function (req, res){
      for(var c = 0; c < sockets.clients.length; c++) {
        sockets.clients[c].send( 'car/setSpeed/'+ req.params.speed);
      }
      return res.send({signalSent: 'car/setSpeed/'+ req.params.speed});
    });
    app.get('/camera/right', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'camera/right' );
      }
      return res.send({signalSent: 'camera/right'});
    });
    app.get('/camera/left', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'camera/left' );
      }
      return res.send({signalSent: 'camera/left'});
    });
    app.get('/camera/up', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'camera/up' );
      }
      return res.send({signalSent: 'camera/up'});
    });
    app.get('/camera/down', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'camera/down' );
      }
      return res.send({signalSent: 'camera/down'});
    });
    app.get('/camera/home', function (req, res){
      for( var c = 0; c < sockets.clients.length; c++ ) {
        sockets.clients[c].send( 'camera/home' );
      }
      return res.send({signalSent: 'camera/home'});
    });
  });
}

function createWebsocketServer(options, callback){
  var server = options.server;
  var app = options.app;
  var ws = require('ws');

  var sockets = new ws.Server({
    server: server
  });

  sockets.on('connection', function(client) {
    console.log('Connection.');
    client.on( 'message', function(message) {
      console.log('message from client : ' + message);
    });
  });

  return callback(sockets);
}

createAppServer({});
