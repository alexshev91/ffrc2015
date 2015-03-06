'use strict';

// Breakouts controller
angular.module('breakouts').controller('BreakoutsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Breakouts',
	function($scope, $stateParams, $location, Authentication, Breakouts) {
		$scope.authentication = Authentication;

		// Create new Breakout
		$scope.create = function() {
			// Create new Breakout object
			var breakout = new Breakouts ({
				name: this.name
			});

			// Redirect after save
			breakout.$save(function(response) {
				$location.path('breakouts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Breakout
		$scope.remove = function(breakout) {
			if ( breakout ) { 
				breakout.$remove();

				for (var i in $scope.breakouts) {
					if ($scope.breakouts [i] === breakout) {
						$scope.breakouts.splice(i, 1);
					}
				}
			} else {
				$scope.breakout.$remove(function() {
					$location.path('breakouts');
				});
			}
		};

		// Update existing Breakout
		$scope.update = function() {
			var breakout = $scope.breakout;

			breakout.$update(function() {
				$location.path('breakouts/' + breakout._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Breakouts
		$scope.find = function() {
			$scope.breakouts = Breakouts.query();
		};

		// Find existing Breakout
		$scope.findOne = function() {
			$scope.breakout = Breakouts.get({ 
				breakoutId: $stateParams.breakoutId
			});
		};
	}
]);