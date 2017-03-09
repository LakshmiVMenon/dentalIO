var mongoose = require('../db').mongoose;
var bcrypt = require('bcrypt');

var schema = {
	firstname:{type:String,reuired:true},
	lastname:{type:String,reuired:true},
	username:{type:String,reuired:true},
	password:{type:String,reuired:true}
}
var userSchema = mongoose.Schema(schema);
var User = mongoose.model('User',userSchema);

var comparePasswords = function(userPassword, modelHash){
    	return new Promise((resolve,reject)=>{
    		bcrypt.compare(userPassword, modelHash, (err, res)=> {
			    if(!res){
			    	return reject('You have entered a wrong password.');
			    }
			    else{
			    	return resolve(true);
			    }
	        });
    	})
    }

module.exports = {
    processLogin: function(data){
    	let isloggedin = false;
    	let errMsg = '';
    	
    	return new Promise((resolve,reject)=>{
    		User.findOne({username:data.username},(err,model)=>{
    			let cbData = {data:model, isloggedin, errMsg};
    			if (err){
                	console.log(err);
                	return reject(err);
	            }
	            if( model === null){
	            	cbData.errMsg ='User doesnot exist.'
	            	return reject(cbData);
	            }
	            else{
	            	comparePasswords(data.password, model.password)
					.then((value)=>{
							cbData.isloggedin = value;
							return resolve(cbData);
						},
						(error)=>{
							cbData.errMsg = error;
							return reject(cbData);
						}
					)
	            }
    		})
    	})
    }
}