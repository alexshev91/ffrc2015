'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var breakouts = require('../../app/controllers/breakouts.server.controller');
	// var Breakout = require('../../app/models/breakout.server.model');

	// Breakouts Routes
	app.route('/breakouts')
		.get(breakouts.list);
		// .post(users.requiresLogin, breakouts.create);

	app.route('/breakouts/:breakoutId')
		.get(breakouts.read);
		// .put(users.requiresLogin, breakouts.update)
		// .delete(users.requiresLogin, breakouts.delete);
	app.route('/addUserToSession').post(breakouts.addUserToSession);
	app.route('/findBreakoutsBySession').post(breakouts.findbysession);
	app.route('/findBreakoutsByName').post(breakouts.findbyname);
	app.route('/findUsersOfBreakout').post(breakouts.findusersofbreakout);




	// Finish by binding the Breakout middleware
	app.param('breakoutId', breakouts.breakoutByID);

	// app.post('/findonebreakout',function(req,res){
	// 	var testing= req.body.roomName;
 //    	Breakout.find({"roomName": testing}, function(err, doc) {
 //    		if (err || !doc) {
 //    			throw 'Error'
 //    		} else {
 //    			console.log("doc: " + JSON.stringify(doc));
 //    			res.json(doc);
 //    		}
 //    	});
	// })
};
