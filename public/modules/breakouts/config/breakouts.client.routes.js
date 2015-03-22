'use strict';

//Setting up route
angular.module('breakouts').config(['$stateProvider',
	function($stateProvider) {
		// Breakouts state routing
		$stateProvider.
		state('listBreakouts', {
			url: '/breakouts',
			templateUrl: 'modules/breakouts/views/list-breakouts.client.view.html'
		}).
		state('createBreakout', {
			url: '/breakouts/create',
			templateUrl: 'modules/breakouts/views/create-breakout.client.view.html'
		}).
		state('viewAdminGrid', {
			url: '/admin/grid',
			templateUrl: 'modules/breakouts/views/adminGrid-breakout.client.view.html'
		}).
		state('usersGrid', {
			url: '/admin/usersGrid',
			templateUrl: 'modules/breakouts/views/adminUsersGrid.client.view.html'
		}).
		state('viewAdminUserById', {
			url: '/admin/users/:uid',
			templateUrl: 'modules/breakouts/views/adminUserView-breakout.client.view.html'
		}).

		state('viewAdminBreakoutsByName', {
			url: '/admin/grid/breakouts/:breakoutname',
			templateUrl: 'modules/breakouts/views/adminBreakoutsWithOneName-breakout.client.view.html'
		}).
		state('thanksForSigningUp', {
			url: '/schedule/users/:uid',
			templateUrl: 'modules/breakouts/views/thanksForSigningUp-breakouts.client.view.html'
		}).
		state('viewBreakout', {
			url: '/breakouts/:breakoutId',
			templateUrl: 'modules/breakouts/views/view-breakout.client.view.html'
		}).
		state('editBreakout', {
			url: '/breakouts/:breakoutId/edit',
			templateUrl: 'modules/breakouts/views/edit-breakout.client.view.html'
		});
	}
]);