/**
 * Created by behnamhajian on 2016-07-14.
 */

var WebSocket = require('ws');
var ws = new WebSocket('ws://behnam.mybluemix.net/');

ws.on('open', function open() {
  ws.send('something');
  setTimeout(function timeout() {
    ws.send(Date.now().toString(), {mask: true});
  }, 1000);
});

ws.on('message', function(data, flags) {
  console.log(data);
});

ws.on('close', function close() {
  console.log('disconnected');
});
