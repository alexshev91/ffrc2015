'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Breakout Schema
 */
var BreakoutSchema = new Schema({

	// 1-7, corresponds to Day+TIme of the Session
	sessionNumber: {
		type: Number,
	},
	name: {
		type: String,
	},
	roomName: {
		type: String,
	},
	speaker: {
		type: String,
	},
	description: {
		type: String,
	},
	numberSignedUp: {
		type: Number,
	},
	maxCapacity: {
		type: Number,
	},
	user: {
		type: Array,
	}
});

mongoose.model('Breakout', BreakoutSchema);