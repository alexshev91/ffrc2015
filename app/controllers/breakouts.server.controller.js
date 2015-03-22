'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Breakout = mongoose.model('Breakout'),
	User = mongoose.model('User'),
	_ = require('lodash');






exports.findbysession = function(req,res){
	console.log("in breakout server controller, req.body is: " + JSON.stringify(req.body));

	var sessNum = req.body.sessionNum;
    	Breakout.find({"sessionNumber": sessNum}, function(err, doc) {
    		if (err || !doc) {
    			throw 'Error'
    		} else {
    			console.log("Breakout server controller. inside find. the document to be responded with is doc: " + JSON.stringify(doc));
    			res.json(doc);
    		}
    	});
};

exports.findbyname = function(req,res){
	console.log("in breakout server controller, findbyname, req.body is: " + JSON.stringify(req.body));

	var brkoutname = req.body.breakoutName;
    	Breakout.find({"name": brkoutname}, function(err, doc) {
    		if (err || !doc) {
    			throw 'Error'
    		} else {
    			console.log("Breakout server controller. inside findbyname the document to be responded with is doc: " + JSON.stringify(doc));
    			res.json(doc);
    		}
    	});
};


exports.findusersofbreakout = function(req,res){

	var userIDArray = req.body.breakoutUsersArray;
	var queryIDarray = [];
	var searchQuery= {};

	for(var i = 0; i< userIDArray.length; i++){
		queryIDarray.push({_id: userIDArray[i]})
	};
	searchQuery= {$or: queryIDarray};



	// { $or:[ {'_id':param}, {'name':param}, {'nickname':param} ]}

	User.find(searchQuery, function(err, doc){
    		if (err || !doc) {
    			throw 'Error'
    		} else {
    			console.log("Breakout server controller. inside findusersofbreakout the document to be responded with is doc: " + JSON.stringify(doc));
    			res.json(doc);
    		}


	});



}


exports.addUserToSession = function(req,res){
	console.log('inside addUserToSession. req.body is: '+ JSON.stringify(req.body))
	var sessionid = req.body.sessID;
	var sessionnumber = req.body.sessNumber;
	var sessionname = req.body.sessName;

	var usercomment = req.body.usrcmnt;

	var usrid = req.body.usertobeupdated._id;
	var useremail= req.body.usertobeupdated.email;
	var usda = req.body.usertobeupdated.USDA;
	var fda = req.body.usertobeupdated.FDA;
	var firstname = req.body.usertobeupdated.firstName;
	var lastname = req.body.usertobeupdated.lastName;


	var updateQuery = {};

	switch (sessionnumber) {
	  case 1:
	    updateQuery = {$set:{'sessions.sessionOne.sessionid':sessionid, 'sessions.sessionOne.name': sessionname, 'sessions.sessionOne.comment': usercomment}};
	    break;
	  case 2:
	    updateQuery = {$set:{'sessions.sessionTwo.sessionid':sessionid, 'sessions.sessionTwo.name': sessionname, 'sessions.sessionTwo.comment': usercomment}};
	    break;
	  case 3:
	    updateQuery = {$set:{'sessions.sessionThree.sessionid':sessionid, 'sessions.sessionThree.name': sessionname, 'sessions.sessionThree.comment': usercomment}};
	    break;
	  case 4:
	    updateQuery = {$set:{'sessions.sessionFour.sessionid':sessionid, 'sessions.sessionFour.name': sessionname, 'sessions.sessionFour.comment': usercomment}};
	    break;
	  case 5:
	    updateQuery = {$set:{'sessions.sessionFive.sessionid':sessionid, 'sessions.sessionFive.name': sessionname, 'sessions.sessionFive.comment': usercomment}};
	    break;
	  case 6:
	    updateQuery = {$set:{'sessions.sessionSix.sessionid':sessionid, 'sessions.sessionSix.name': sessionname, 'sessions.sessionSix.comment': usercomment}};
	    break;
	  case 7:
	    updateQuery = {$set:{'sessions.sessionSeven.sessionid':sessionid, 'sessions.sessionSeven.name': sessionname, 'sessions.sessionSeven.comment': usercomment}};
	    break;
	  default:
	    console.log("Inside breakout.server.controller, addUserToSession method. Switch statement for sessionnumber has defaulted")
	    break;
	};


	Breakout.update({_id: sessionid},{$push:{"users":{"email": useremail, "id":usrid, "comment": usercomment,"firstName": firstname, "lastName": lastname, "USDA": usda, "FDA": fda}}},function(err, doc) {
		if (err || !doc) {
			console.log("error updating breakout with user: " + err);
		} else {

			console.log("Just updated breakout: "+ JSON.stringify(doc))

			User.update({_id: usrid},updateQuery,function(err, doc) {
				if (err || !doc) {
					console.log("error updating user with breakout " + err);
				} else {
					res.json(doc);
				}
			});
		};
	});
};




exports.finduserbyid = function(req,res){
	var searchid = req.body.uid;

	User.find({"_id":searchid}, function(err, doc){
    		if (err || !doc) {
    			throw 'Error'
    		} else {
    			console.log("Breakout server controller. inside findusersofbreakout the document to be responded with is doc: " + JSON.stringify(doc));
    			res.json(doc);
    		}


	});




}






/**
 * Create a Breakout
 */
exports.create = function(req, res) {
	var breakout = new Breakout(req.body);
	breakout.user = req.user;

	breakout.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(breakout);
		}
	});
};

/**
 * Show the current Breakout
 */
exports.read = function(req, res) {
	res.jsonp(req.breakout);
};

/**
 * Update a Breakout
 */
exports.update = function(req, res) {
	var breakout = req.breakout ;

	breakout = _.extend(breakout , req.body);

	breakout.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(breakout);
		}
	});
};

/**
 * Delete an Breakout
 */
exports.delete = function(req, res) {
	var breakout = req.breakout ;

	breakout.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(breakout);
		}
	});
};

/**
 * List of Breakouts
 */
exports.list = function(req, res) {
	Breakout.find().sort('-created').populate('user', 'displayName').exec(function(err, breakouts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(breakouts);
		}
	});
};

exports.getusersforgrid = function(req, res){
	User.find().exec(function(err, users){
		if(err){
			console.log('ERROR FINDING USERS FOR GRID')
		} else{
			res.json(users);
		}
	})
}



/**
 * Breakout middleware
 */
exports.breakoutByID = function(req, res, next, id) {
	Breakout.findById(id).populate('user', 'displayName').exec(function(err, breakout) {
		if (err) return next(err);
		if (! breakout) return next(new Error('Failed to load Breakout ' + id));
		req.breakout = breakout ;
		next();
	});
};


/**
 * Breakout authorization middleware
 */
// exports.hasAuthorization = function(req, res, next) {
// 	if (req.breakout.user.id !== req.user.id) {
// 		return res.status(403).send('User is not authorized');
// 	}
// 	next();
// };
