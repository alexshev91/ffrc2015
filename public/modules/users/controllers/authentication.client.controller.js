'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('schedule/users/' + $scope.authentication.user._id);

		$scope.signup = function() {
			$http.post('/checkIfUserIsInDb', $scope.credentials).success(function(response){
				// console.log('in checkifuserisindb response is: '+JSON.stringify(response));

				if(response === "null"){
					$http.post('/auth/signup', $scope.credentials).success(function(response) {
						// If successful we assign the response to the global user model
						$scope.authentication.user = response;
						// console.log("in response===null registering user")
						// And redirect to the index page
						$location.path('/breakouts');
					}).error(function(response) {
						$scope.error = response.message;
					});
				} else {
					$scope.authentication.user = response;
					$location.path('schedule/users/' + response._id)
				}

			}).error(function(response){
				console.log("in checkifuserisindb error")
				$scope.error = response.message
			})

			// $http.post('/auth/signup', $scope.credentials).success(function(response) {
			// 	// If successful we assign the response to the global user model
			// 	$scope.authentication.user = response;

			// 	// And redirect to the index page
			// 	$location.path('/breakouts');
			// }).error(function(response) {
			// 	$scope.error = response.message;
			// });
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);