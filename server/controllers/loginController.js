var path = require('path');
var userdb = require('../models/user.js')
var docdb = require('../models/doctors.js');

module.exports = {
	loadLoginPage: function(req,res){
		let base = path.resolve('.');
		let htmpath = base + '/views/login.html';
		res.sendFile(htmpath);
	},
	login: function(req,res){
		console.log("login")
		let data = { username:req.body.username, password:req.body.password };
		userdb.processLogin(data)
		.then(value => {
				res.end(JSON.stringify(value));
		})
		.catch(rejectReason =>{
			res.end(JSON.stringify(rejectReason));
		})
		
	}
}