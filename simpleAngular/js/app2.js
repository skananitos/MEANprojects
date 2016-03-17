var app2 = angular.module('app2', [])

.controller('MainCtrl', ['$scope', '$timeout', function($scope, $timeout){

	$scope.name = 'John';

	// Change the value of the view after 3sec

	$timeout(function() {

		$scope.name = 'Everybody';

	}, 3000);
}])

.controller('TwitterCtrl', ['$scope', '$filter', function($scope, $filter){

	$scope.handle = '';

	$scope.lowercasehandle = function(){
		return $filter('lowercase')($scope.handle);
	};

	// Watch changes in a specific value (Digest Loop)

	$scope.$watch('handle', function(newValue, oldValue){

		console.info('Changed!');
		console.log('Old: ' + oldValue);
		console.log('New: ' + newValue);

	});

	// Once you use JS functions or a jQuery library you need to use $apply in order to make AngularJS execute the nested code

	setTimeout(function() { // alternatively use $timeout
		$scope.$apply(function() {
			$scope.handle = 'newtwitterhandle';
			console.log('Scope changed!');
		});

	}, 3000);

	$scope.phone = '';
	$scope.digits = 10;

	$scope.rules = [

		{ rulename: "Must be 10 digits" },
		{ rulename: "Must not be used elsewhere" },
		{ rulename: "Must be cool" }
	];

	$scope.alertClick = function(){
		alert("Here I am!");
	};

	

}]);