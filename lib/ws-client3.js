/**
 * Created by behnamhajian on 2016-07-14.
 */

var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:3000');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function(data, flags) {
  console.log(data);
});
