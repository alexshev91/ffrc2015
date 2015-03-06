'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var breakouts = require('../../app/controllers/breakouts.server.controller');

	// Breakouts Routes
	app.route('/breakouts')
		.get(breakouts.list);
		// .post(users.requiresLogin, breakouts.create);

	app.route('/breakouts/:breakoutId')
		.get(breakouts.read);
		// .put(users.requiresLogin, breakouts.update)
		// .delete(users.requiresLogin, breakouts.delete);

	// Finish by binding the Breakout middleware
	app.param('breakoutId', breakouts.breakoutByID);
};
