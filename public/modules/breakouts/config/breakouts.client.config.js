'use strict';

// Configuring the Articles module
angular.module('breakouts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Breakouts', 'breakouts', 'dropdown', '/breakouts(/create)?');
		Menus.addSubMenuItem('topbar', 'breakouts', 'List Breakouts', 'breakouts');
		Menus.addSubMenuItem('topbar', 'breakouts', 'New Breakout', 'breakouts/create');
	}
]);