var mongoose = require('../db').mongoose;
var cSchema = {
	name:{type:String,required:true},
	address	:{type:String,required:true},
	weekdaytiming:{type:String,required:true},
	weekendtiming:{type:String,required:true},
	fee:{type:Number,required:true}
}

var clinicSchema = mongoose.Schema(cSchema);
// var Clinic = mongoose.model('Clinic',clinicSchema);


var schema = {
	_id:{type:String},
	name:{type:String,required:true},
	role:{type:String,required:true},
	qualification:{type:String,required:true},
	experience:{type:String,required:true},
	clinics:[clinicSchema],
	profileimg:{type:String}
}
var doctorSchema = mongoose.Schema(schema);
var Doctor = mongoose.model('Doctor',doctorSchema);




module.exports = {
    findDoc : function(){
    	return new Promise((resolve,reject)=>{
    		Doctor.find((err,doc)=>{
    			if(err){
    				return reject(err);
    			}
    			return resolve(doc);
    		})
    	})
    },
    searchDoctor: function(searchText){
    	let regex = new RegExp(searchText, "i")
     	let query = { name:regex };
    	return new Promise((resolve,reject)=>{
    		Doctor.find(query, (err,doc)=>{
    			if(err){
    				return reject(err);
    			}
    			return resolve(doc);
    		})
    	})
    }
}