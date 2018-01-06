var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var messages = [];
var id = 1;

app.use(bodyParser.json());
 
app.get('/', function (req, res) {
  res.send('out messenger system');
});
 
// get 
 
app.get('/messages', function (req, res) {
  res.json(messages);
}); 
 
app.get('/messages/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);
  var flag = false;
  
  for(var i = 0; i < messages.length; i++) {
    if (messages[i].id === id){
      flag = true;
      res.json(messages[i]);
      break;
    } 
  }  
    if (!flag) {
      res.send('can\'t find messages with this ID');
    }
  
});  

// post

app.post('/messages/', function (req, res) {
  var body = req.body;
  var new_messages = 
  {
    id: id++,
    name: body.name,
    content: body.content,
    read: body.read
  }
  messages.push(new_messages);
  res.send('new message added');
}); 

// delete
app.del('/messages/:id', function (req, res){
  var id = parseInt(req.params.id, 10);
  var flag = false;
  
  for(var i = 0; i < messages.length; i++) {
    if (messages[i].id === id){
      flag = true;
      messages.splice(i, 1);
      break;
    } 
  }
  if (!flag) {
    res.send('can\'t find messages with this ID');
  } else {
    res.send('message with ID = ' + id + ' has been deleted');
  }
});  

app.listen(process.env.PORT, function() {
    console.log('server is running');
});