'use strict';

(function() {
	// Breakouts Controller Spec
	describe('Breakouts Controller Tests', function() {
		// Initialize global variables
		var BreakoutsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Breakouts controller.
			BreakoutsController = $controller('BreakoutsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Breakout object fetched from XHR', inject(function(Breakouts) {
			// Create sample Breakout using the Breakouts service
			var sampleBreakout = new Breakouts({
				name: 'New Breakout'
			});

			// Create a sample Breakouts array that includes the new Breakout
			var sampleBreakouts = [sampleBreakout];

			// Set GET response
			$httpBackend.expectGET('breakouts').respond(sampleBreakouts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.breakouts).toEqualData(sampleBreakouts);
		}));

		it('$scope.findOne() should create an array with one Breakout object fetched from XHR using a breakoutId URL parameter', inject(function(Breakouts) {
			// Define a sample Breakout object
			var sampleBreakout = new Breakouts({
				name: 'New Breakout'
			});

			// Set the URL parameter
			$stateParams.breakoutId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/breakouts\/([0-9a-fA-F]{24})$/).respond(sampleBreakout);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.breakout).toEqualData(sampleBreakout);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Breakouts) {
			// Create a sample Breakout object
			var sampleBreakoutPostData = new Breakouts({
				name: 'New Breakout'
			});

			// Create a sample Breakout response
			var sampleBreakoutResponse = new Breakouts({
				_id: '525cf20451979dea2c000001',
				name: 'New Breakout'
			});

			// Fixture mock form input values
			scope.name = 'New Breakout';

			// Set POST response
			$httpBackend.expectPOST('breakouts', sampleBreakoutPostData).respond(sampleBreakoutResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Breakout was created
			expect($location.path()).toBe('/breakouts/' + sampleBreakoutResponse._id);
		}));

		it('$scope.update() should update a valid Breakout', inject(function(Breakouts) {
			// Define a sample Breakout put data
			var sampleBreakoutPutData = new Breakouts({
				_id: '525cf20451979dea2c000001',
				name: 'New Breakout'
			});

			// Mock Breakout in scope
			scope.breakout = sampleBreakoutPutData;

			// Set PUT response
			$httpBackend.expectPUT(/breakouts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/breakouts/' + sampleBreakoutPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid breakoutId and remove the Breakout from the scope', inject(function(Breakouts) {
			// Create new Breakout object
			var sampleBreakout = new Breakouts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Breakouts array and include the Breakout
			scope.breakouts = [sampleBreakout];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/breakouts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBreakout);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.breakouts.length).toBe(0);
		}));
	});
}());