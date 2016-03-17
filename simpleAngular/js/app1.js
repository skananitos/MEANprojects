var app1 = angular.module('app1', ['ngMessages', 'ngResource']);

app1.controller('MainCtrl', function($scope, $log, $filter, $resource){

	$scope.name = 'John';
	$scope.formattedUp = $filter('uppercase')($scope.name);
	$scope.formattedLw = $filter('lowercase')($scope.name);

	$log.log($scope.name);
	$log.info($scope.formattedLw);
	$log.warn($scope.formattedUp);
	$log.debug("Some debug information while writing this code.");
	$log.error("This was an error!");

	console.log($resource);
});

/*
In case of use of a javascript minifier, you have to use the code as it is shown below.

ATTENTION: Here the order of the function's params REALLY matters!


app1.controller('MainCtrl', ['$scope', '$log', '$filter', '$resource', function($scope, $log, $filter, $resource){

	$scope.name = 'John';
	$scope.formattedUp = $filter('uppercase')($scope.name);
	$scope.formattedLw = $filter('lowercase')($scope.name);

	$log.log($scope.name);
	$log.info($scope.formattedLw);
	$log.warn($scope.formattedUp);
	$log.debug("Some debug information while writing this code.");
	$log.error("This was an error!");

	console.log($resource);
}]);

*/