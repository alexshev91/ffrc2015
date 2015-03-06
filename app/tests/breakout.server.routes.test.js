'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Breakout = mongoose.model('Breakout'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, breakout;

/**
 * Breakout routes tests
 */
describe('Breakout CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Breakout
		user.save(function() {
			breakout = {
				name: 'Breakout Name'
			};

			done();
		});
	});

	it('should be able to save Breakout instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Breakout
				agent.post('/breakouts')
					.send(breakout)
					.expect(200)
					.end(function(breakoutSaveErr, breakoutSaveRes) {
						// Handle Breakout save error
						if (breakoutSaveErr) done(breakoutSaveErr);

						// Get a list of Breakouts
						agent.get('/breakouts')
							.end(function(breakoutsGetErr, breakoutsGetRes) {
								// Handle Breakout save error
								if (breakoutsGetErr) done(breakoutsGetErr);

								// Get Breakouts list
								var breakouts = breakoutsGetRes.body;

								// Set assertions
								(breakouts[0].user._id).should.equal(userId);
								(breakouts[0].name).should.match('Breakout Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Breakout instance if not logged in', function(done) {
		agent.post('/breakouts')
			.send(breakout)
			.expect(401)
			.end(function(breakoutSaveErr, breakoutSaveRes) {
				// Call the assertion callback
				done(breakoutSaveErr);
			});
	});

	it('should not be able to save Breakout instance if no name is provided', function(done) {
		// Invalidate name field
		breakout.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Breakout
				agent.post('/breakouts')
					.send(breakout)
					.expect(400)
					.end(function(breakoutSaveErr, breakoutSaveRes) {
						// Set message assertion
						(breakoutSaveRes.body.message).should.match('Please fill Breakout name');
						
						// Handle Breakout save error
						done(breakoutSaveErr);
					});
			});
	});

	it('should be able to update Breakout instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Breakout
				agent.post('/breakouts')
					.send(breakout)
					.expect(200)
					.end(function(breakoutSaveErr, breakoutSaveRes) {
						// Handle Breakout save error
						if (breakoutSaveErr) done(breakoutSaveErr);

						// Update Breakout name
						breakout.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Breakout
						agent.put('/breakouts/' + breakoutSaveRes.body._id)
							.send(breakout)
							.expect(200)
							.end(function(breakoutUpdateErr, breakoutUpdateRes) {
								// Handle Breakout update error
								if (breakoutUpdateErr) done(breakoutUpdateErr);

								// Set assertions
								(breakoutUpdateRes.body._id).should.equal(breakoutSaveRes.body._id);
								(breakoutUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Breakouts if not signed in', function(done) {
		// Create new Breakout model instance
		var breakoutObj = new Breakout(breakout);

		// Save the Breakout
		breakoutObj.save(function() {
			// Request Breakouts
			request(app).get('/breakouts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Breakout if not signed in', function(done) {
		// Create new Breakout model instance
		var breakoutObj = new Breakout(breakout);

		// Save the Breakout
		breakoutObj.save(function() {
			request(app).get('/breakouts/' + breakoutObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', breakout.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Breakout instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Breakout
				agent.post('/breakouts')
					.send(breakout)
					.expect(200)
					.end(function(breakoutSaveErr, breakoutSaveRes) {
						// Handle Breakout save error
						if (breakoutSaveErr) done(breakoutSaveErr);

						// Delete existing Breakout
						agent.delete('/breakouts/' + breakoutSaveRes.body._id)
							.send(breakout)
							.expect(200)
							.end(function(breakoutDeleteErr, breakoutDeleteRes) {
								// Handle Breakout error error
								if (breakoutDeleteErr) done(breakoutDeleteErr);

								// Set assertions
								(breakoutDeleteRes.body._id).should.equal(breakoutSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Breakout instance if not signed in', function(done) {
		// Set Breakout user 
		breakout.user = user;

		// Create new Breakout model instance
		var breakoutObj = new Breakout(breakout);

		// Save the Breakout
		breakoutObj.save(function() {
			// Try deleting Breakout
			request(app).delete('/breakouts/' + breakoutObj._id)
			.expect(401)
			.end(function(breakoutDeleteErr, breakoutDeleteRes) {
				// Set message assertion
				(breakoutDeleteRes.body.message).should.match('User is not logged in');

				// Handle Breakout error error
				done(breakoutDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Breakout.remove().exec();
		done();
	});
});