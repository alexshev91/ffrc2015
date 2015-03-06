'use strict';

//Breakouts service used to communicate Breakouts REST endpoints
angular.module('breakouts').factory('Breakouts', ['$resource',
	function($resource) {
		return $resource('breakouts/:breakoutId', { breakoutId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);