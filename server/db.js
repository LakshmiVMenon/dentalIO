var mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost/dentalio");
if(process.env.NODE_ENV == "production"){
	mongoose.connect("mongodb://dentalio:dentalio@ds123410.mlab.com:23410/dentalio");
}
else{
	mongoose.connect("mongodb://localhost/dentalio");
}
var db = mongoose.connection;

db.on('error', function () {
	console.log('error occured from db');
});
 
db.once('open', function dbOpen() {
	console.log('successfully opened the db');
});

exports.mongoose = mongoose;
