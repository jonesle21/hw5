var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 12193);

//for post request
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/hw5', function(req,res){
  var params = [];
  for (var p in req.body){
    params.push({'name':p,'value':req.body[p]})
  }
  console.log(params);
  console.log(req.body);
  var context = {};
  context.urlItem = params;
  res.render('post', context);
});

//get request
app.get('/hw5', function(req,res){
    var params = [];
    for (var p in req.query){
        params.push({'name':p, 'value':req.query[p]})
    }
    var context = {};
    context.urlItem = params;
    res.render('get', context)
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
