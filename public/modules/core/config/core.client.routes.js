'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/2015breakoutsignup');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/2015breakoutsignup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		});
	}
]);