angular.module('yu­gi­ohApp.cards', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/cards', {
			templateUrl: 'cards/cards.html',
			controller: 'CardsCtrl'
		})
}])

.controller('CardsCtrl', ['$rootscope', '$scope', '$http', function($rootscope, $scope, $http){

	// Create JSONproxy link
	$scope.link_data = "https://crossorigin.me/http://yugiohprices.com/api/card_data/";
	$scope.link_price = "https://crossorigin.me/http://yugiohprices.com/api/get_card_prices/";
	
	// Get local json data
	$http.get('json/cards.json').success(function(data) {	
		$scope.cards = data;
	});

	$scope.selected = false;

	$scope.getDetails = function (cardName) {

		$scope.link_data += cardName;
		$scope.link_price += cardName;

		// Get API's data
		$http.get($scope.link_data).success(function(result) {
			$scope.details = result;			
		})
		.error(function(data, status){
			console.log(data);
		});

		$http.get($scope.link_price).success(function(result) {
			$scope.price = result;
			$scope.date = $scope.price.data[0].price_data.data.prices.updated_at.substring(0, 10);
		})
		.error(function(data, status){
			console.log(data);
		});



		// Restore link prefix
		$scope.link_data = "https://crossorigin.me/http://yugiohprices.com/api/card_data/";
		$scope.link_price = "https://crossorigin.me/http://yugiohprices.com/api/get_card_prices/";

		$scope.selected = true;
	};
}]);