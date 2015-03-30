'use strict';

// Breakouts controller
angular.module('breakouts').controller('BreakoutsController', ['$scope', '$http', '$stateParams', '$window','$location', 'Authentication', 'Breakouts',
	function($scope, $http, $stateParams, $window, $location, Authentication, Breakouts) {
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

		$scope.goBackToBreakouts = function(){

			$location.path('/breakouts')
			// $route.reload()
			$window.location.reload()
			// $window.location.href = '#!/breakouts';
			// $window.location= '#!/breakouts';
		}



		// Update existing Breakout
		$scope.update = function() {
			var breakout = $scope.breakout;

			breakout.$update(function() {
				$location.path('breakouts/' + breakout._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Breakouts by Session
		$scope.find = function() {
			if($scope.authentication.user.sessions.sessionOne.name != 'Not Signed Up' && $scope.authentication.user.sessions.sessionTwo.name != 'Not Signed Up' && $scope.authentication.user.sessions.sessionThree.name != 'Not Signed Up' && $scope.authentication.user.sessions.sessionFour.name != 'Not Signed Up' && $scope.authentication.user.sessions.sessionFive.name != 'Not Signed Up' && $scope.authentication.user.sessions.sessionSix.name != 'Not Signed Up' && $scope.authentication.user.sessions.sessionSeven.name != 'Not Signed Up'){
				$location.path('schedule/users/' + $scope.authentication.user._id);
			}


		 	$http.post('/findBreakoutsBySession', {sessionNum : 1})
		 		.success(function(data){
		 			// console.log("In breakout client controller. data is:  "+data+" Length is " +data.length)
		 			$scope.sessOne = data;
		 	});
		 	$http.post('/findBreakoutsBySession', {sessionNum : 2})
		 		.success(function(data){
		 			// console.log("In breakout client controller. data is:  "+data+" Length is " +data.length)
		 			$scope.sessTwo = data;
		 	});
		 	$http.post('/findBreakoutsBySession', {sessionNum : 3})
		 		.success(function(data){
		 			// console.log("In breakout client controller. data is:  "+data+" Length is " +data.length)
		 			$scope.sessThree = data;
		 	});
		 	$http.post('/findBreakoutsBySession', {sessionNum : 4})
		 		.success(function(data){
		 			// console.log("In breakout client controller. data is:  "+data+" Length is " +data.length)
		 			$scope.sessFour = data;
		 	});
		 	$http.post('/findBreakoutsBySession', {sessionNum : 5})
		 		.success(function(data){
		 			// console.log("In breakout client controller. data is:  "+data+" Length is " +data.length)
		 			$scope.sessFive = data;
		 	});
		 	$http.post('/findBreakoutsBySession', {sessionNum : 6})
		 		.success(function(data){
		 			// console.log("In breakout client controller. data is:  "+data+" Length is " +data.length)
		 			$scope.sessSix = data;
		 	});
		 	$http.post('/findBreakoutsBySession', {sessionNum : 7})
		 		.success(function(data){
		 			// console.log("In breakout client controller. data is:  "+data+" Length is " +data.length)
		 			$scope.sessSeven = data;
		 	});
		};


		function addUserToSession(sessionID, sessnNumber, sessnName, cmnt, usr){
			$http.post('/addUserToSession', {sessID: sessionID, sessNumber: sessnNumber, sessName: sessnName, usrcmnt: cmnt, usertobeupdated: usr})
			 		.success(function(data){
			 			// console.log("Added user to session")
			 	});
		};



		$scope.submitSchedule = function(){
			var sessionsToBeUpdated = [];
			// console.log("inside breakouts.client.controller. scope.sessionone is: "+ JSON.stringify($scope.sessionform.sessionone))

			if($scope.sessionform.sessionone){sessionsToBeUpdated.push($scope.sessionform.sessionone)};
			if($scope.sessionform.sessiontwo){sessionsToBeUpdated.push($scope.sessionform.sessiontwo)};
			if($scope.sessionform.sessionthree){sessionsToBeUpdated.push($scope.sessionform.sessionthree)};
			if($scope.sessionform.sessionfour){sessionsToBeUpdated.push($scope.sessionform.sessionfour)};
			if($scope.sessionform.sessionfive){sessionsToBeUpdated.push($scope.sessionform.sessionfive)};
			if($scope.sessionform.sessionsix){sessionsToBeUpdated.push($scope.sessionform.sessionsix)};
			if($scope.sessionform.sessionseven){sessionsToBeUpdated.push($scope.sessionform.sessionseven)};

			var tobeupdateduser = $scope.authentication.user;
			var usersemail = $scope.authentication.user.email;

			for(var i=0; i<sessionsToBeUpdated.length; i++){
				var alreadyInSession = false;
				for(var j=0; j<sessionsToBeUpdated[i].users.length; j++){
					if(sessionsToBeUpdated[i].users[j].id === tobeupdateduser){
						alreadyInSession = true;
					}
				}
				if(alreadyInSession === false){
					addUserToSession(sessionsToBeUpdated[i]._id, sessionsToBeUpdated[i].sessionNumber, sessionsToBeUpdated[i]["name"], sessionsToBeUpdated[i]["comment"], tobeupdateduser);
				}

			};

			$location.path('schedule/users/' + tobeupdateduser._id);

		};


		// Find existing Breakout
		$scope.findOne = function() {
			$scope.breakout = Breakouts.get({
				breakoutId: $stateParams.breakoutId
			});
		};

		$scope.getUsersForAdminGrid = function(){

			$http.post('/getUsersForGrid',{}).success(function(data){
				$scope.usersForGrid = data;
			})
		};

		    $scope.usersGridOptions = {
		        data: 'usersForGrid',
		        columnDefs: [{field:'email', width: 200, displayName:'Email',cellTemplate:'<a href="mailto:{{COL_FIELD}}">{{COL_FIELD}}</a>'},
		        				{field:'_id', displayName:'ID',cellTemplate:'<a href="#!/admin/users/{{COL_FIELD}}">{{COL_FIELD}}</a>'},
		        				{field:'lastName', displayName:'Last Name'},
		        				{field:'firstName', displayName:'First Name'},
		        				{field:'sessions.sessionOne.name', displayName:'Session 1'},
		        				{field:'sessions.sessionTwo.name', displayName:'Session 2'},
		        				{field:'sessions.sessionThree.name', displayName:'Session 3'},
		        				{field:'sessions.sessionFour.name', displayName:'Session 4'},
		        				{field:'sessions.sessionFive.name', displayName:'Session 5'},
		        				{field:'sessions.sessionSix.name', displayName:'Session 6'},
		        				{field:'sessions.sessionSeven.name', displayName:'Session 7'}
		        				]
		    };


		$scope.getBreakoutsForAdminGrid = function(){
			var myContent =[];
			var breakoutNames = ["Allergen / Gluten Free Labeling",
									"Canadian vs. US Labeling",
									"Certified/Verified Claims",
									"Clean Labeling",
									"Export to China, Mexico (Cuba…?)",
									"EZ Form Software (Beginner)",
									"EZ Form Software (Advanced)",
									"FDA Labeling Q&A's",
									"FDA Market Trends",
									"Flavor Labeling",
									"Food Safety, Quality & Traceability",
									"Food Service Labeling/ Sample Product Regulations",
									"Generic Labeling Update",
									"GMO Labeling",
									"Natural Labeling",
									"Nutrient Data: Lab vs. Calculation",
									"Nutrient/Health Claims",
									"Organic, Animal Production & Grading Claims",
									"Prepping for the New NFP",
									"Product Naming & Ingredient Labeling",
									"School Lunch (CN) Labeling",
									"USDA Labeling Q&A's",
									"USDA Market Trends"];


			for(var i=0; i < breakoutNames.length; i++){

			 	$http.post('/findBreakoutsByName', {breakoutName: breakoutNames[i]})
			 		.success(function(data){
			 			$scope.objectForMyData={};
			 			$scope.objectForMyData.sessName = data[0].name

			 			for(var j=0; j<data.length;j++){
		 					switch (data[j].sessionNumber) {
							  case 1:
							    $scope.objectForMyData.sessOne = data[j].users.length+"/"+data[j].maxCapacity;
							    break;
							  case 2:
							    $scope.objectForMyData.sessTwo = data[j].users.length+"/"+data[j].maxCapacity;
							    break;
							  case 3:
							    $scope.objectForMyData.sessThree = data[j].users.length+"/"+data[j].maxCapacity;
							    break;
							  case 4:
							    $scope.objectForMyData.sessFour = data[j].users.length+"/"+data[j].maxCapacity;
							    break;
							  case 5:
							    $scope.objectForMyData.sessFive = data[j].users.length+"/"+data[j].maxCapacity;
							    break;
							  case 6:
							    $scope.objectForMyData.sessSix = data[j].users.length+"/"+data[j].maxCapacity;
							    break;
							  case 7:
							    $scope.objectForMyData.sessSeven = data[j].users.length+"/"+data[j].maxCapacity;
							    break;
							  default:
							    console.log("Inside breakout.client.controller, findbreakoutsbymname. Switch statement for sessionnumber has defaulted")
							    break;
							};
			 			};
			 		myContent.push($scope.objectForMyData);
			 		$scope.myData = myContent;
			 		// console.log('Data ARRAY IS: ' + JSON.stringify($scope.myData))
			 	});
		 	};

		 	// console.log('$.scopeData ARRAY IS: ' + JSON.stringify($scope.myData))
		};




$scope.displayBreakoutsWithOneName = function(colfield){
	var urlparameter;
			switch (colfield) {
			  case "Allergen / Gluten Free Labeling":
			    	urlparameter="Allergen";
			    break;
			  case "Certified/Verified Claims":
			    	urlparameter="Certified"
			    break;
			  case "Food Service Labeling/ Sample Product Regulations":
			    	urlparameter="Food Labeling";
			    break;
			  case "Nutrient/Health Claims":
			    	urlparameter="Nutrient";
			    break;
			  default:
			    	urlparameter=colfield;
			    break;
			};
	// console.log("inside showMe. colfield is: "+ colfield)
	$location.path('/admin/grid/breakouts/'+urlparameter);
};

$scope.findBreakoutForAdmin = function(){

	var searchparameter;

			switch ($stateParams.breakoutname) {
			  case "Allergen":
			    	searchparameter="Allergen / Gluten Free Labeling";
			    break;
			  case "Certified":
			    	searchparameter="Certified/Verified Claims";
			    break;
			  case "Food Labeling":
			    	searchparameter="Food Service Labeling/ Sample Product Regulations";
			    break;
			  case "Nutrient":
			    	searchparameter="Nutrient/Health Claims";
			    break;
			  default:
			    	searchparameter=$stateParams.breakoutname;
			    break;
			};

	$http.post('/findBreakoutsByName', {breakoutName: searchparameter})
	.success(function(data){
		// $scope.nameOfBreakout = colfield;
		// console.log("nameofbreakout is: "+ $scope.nameOfBreakout)
		$scope.breakoutsByName = data;


	});
}


$scope.triggerUserView = true;
$scope.toggleBreakoutUsers = function(breakoutusers){

	$http.post('/findUsersOfBreakout', {breakoutUsersArray: breakoutusers})
	.success(function(data){
		// $scope.nameOfBreakout = colfield;
		// console.log("nameofbreakout is: "+ $scope.nameOfBreakout)
		console.log("ARRAY WITH USERS FOR BREAKOUT IS: ")
		$scope.usersForBreakout = data;
	});
	$scope.triggerUserView = $scope.triggerUserView === false ? true: false;
};



    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [{field:'sessName', width: 300, displayName:'Name',cellTemplate:'<a href ng-click="grid.appScope.displayBreakoutsWithOneName(COL_FIELD)">{{COL_FIELD}}</a>'},
        				{field:'sessOne', displayName:'Session 1'},
        				{field:'sessTwo', displayName:'Session 2'},
        				{field:'sessThree', displayName:'Session 3'},
        				{field:'sessFour', displayName:'Session 4'},
        				{field:'sessFive', displayName:'Session 5'},
        				{field:'sessSix', displayName:'Session 6'},
        				{field:'sessSeven', displayName:'Session 7'}]
    };


$scope.findUserForAdmin=function(){
	var searchparameter = $stateParams.uid;


	$http.post('/findUserById', {uid: searchparameter})
	.success(function(data){
		// $scope.nameOfBreakout = colfield;
		// console.log("nameofbreakout is: "+ $scope.nameOfBreakout)
		$scope.userinfo = data[0];


	});


};






	}
]);