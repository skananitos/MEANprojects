// Import the express module
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.send('Express Works');
})

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});