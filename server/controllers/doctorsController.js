var path = require('path');
var doctorsdb = require('../models/doctors.js')
console.log("----doc ctrlr-------")

module.exports = {
	loadDetailPage:function(req,res){
		let base = path.resolve('.');
		let htmpath = base + '/views/doctoDetail.html';
		res.sendFile(htmpath);
    },
    getDetailsList:function(req,res){
        console.log("---getDetailsList---called----")
        doctorsdb.findDoc()
        .then((docList) => {
            console.log("---docList---"+docList)
            res.end(JSON.stringify(docList));
        })
    },
    searchForDoctor:function(req,res){
        console.log("---searchForDoctor---called----"+req.query.searchString)
    	let searchtext = req.query.searchString;

        doctorsdb.searchDoctor(searchtext)
        .then((docList)=>{
            res.end(JSON.stringify(docList));
        })
    }
    
}