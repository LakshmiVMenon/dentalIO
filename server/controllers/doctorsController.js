var path = require('path');
var doctorsdb = require('../models/doctors.js')

module.exports = {
	loadDetailPage:function(req,res){
		let base = path.resolve('.');
		let htmpath = base + '/views/doctoDetail.html';
		res.sendFile(htmpath);
    },
    getDetailsList:function(req,res){
        doctorsdb.findDoc()
        .then((docList) => {
            res.end(JSON.stringify(docList));
        })
    },
    searchForDoctor:function(req,res){
    	let searchtext = req.query.searchString;

        doctorsdb.searchDoctor(searchtext)
        .then((docList)=>{
            res.end(JSON.stringify(docList));
        })
    }
    
}