'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Breakout = mongoose.model('Breakout'),
	_ = require('lodash');

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
