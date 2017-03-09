var path = require('path');
var loginController = require('../server/controllers/loginController.js');
var doctorsController = require('../server/controllers/doctorsController.js');	

module.exports = function(app){
	app.get('/',loginController.loadLoginPage);
	app.post('/login',loginController.login);
	app.post('/docdetail',doctorsController.loadDetailPage);
	app.get('/docdetailslist',doctorsController.getDetailsList);
	app.get('/search',doctorsController.searchForDoctor);
};