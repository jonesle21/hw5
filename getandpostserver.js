var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/HW5',function(req,res){
    var info = [];
    for (var p in req.query){
        info.push({'name':p, 'value':req.query[p]})
    }
    var datainput = {};
    datainput.dataList = info
  res.render('get.handlebars', datainput) //We can omit the .handlebars extension as we do below
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});