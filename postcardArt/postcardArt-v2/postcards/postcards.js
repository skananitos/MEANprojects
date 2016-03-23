angular.module('postcardArt.postcards', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
	$routeProvider.
		when('/postcards', {
			templateUrl: 'postcards/postcards.html',
			controller: 'PostcardsCtrl'
		}).
		when('/postcards/:postcardId', {
			templateUrl: 'postcards/postcard-details.html',
			controller: 'PostcardDetailsCtrl'
		})
}])

.controller ('PostcardsCtrl', ['$scope', '$http', function ($scope, $http) {
	$http.get('json/postcards.json').success(function(data){
		$scope.postcards = data;
	});
	$scope.plusOne = function(index) { 
  		$scope.postcards[index].likes += 1; 
	};
  	$scope.minusOne = function(index) { 
  		$scope.postcards[index].dislikes += 1; 
	};
}])

.controller ('PostcardDetailsCtrl', ['$scope', '$routeParams', '$http', '$filter', function ($scope, $routeParams, $http, $filter) {
	var postcardId = $routeParams.postcardId;
	$http.get('json/postcards.json').success(function(data){
		$scope.postcard = $filter('filter')(data, function (d){
			return d.id == postcardId;
		})[0];
		$scope.mainImage = $scope.postcard.images[0].name;
	});
	$scope.setImage = function (image){
		$scope.mainImage = image.name;
	}
}]);
