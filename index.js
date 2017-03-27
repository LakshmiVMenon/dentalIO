var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var http = require('http').Server(app);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// app.use('/css',express.static(path.join(__dirname, 'public/css')));
// app.use('/js',express.static(path.join(__dirname, 'public/js')));
// app.use('/images',express.static(path.join(__dirname, 'public/images')));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });


app.set('port',process.env.PORT || 3030)

http.listen(app.get('port'), function () {
    console.log('listening on *:3030');
});

var routes = require('./routes/routes')(app);
