var app = angular.module('app', [])

// Define multiple controllers
.controller('quoteCtrl', function($scope) {
  var quoteDay = [
  	"There are no half-truths. (Georges BERNANOS)", 
  	"All for one, one for all. (Alexandre DUMAS)", 
  	"To imagine is to choose. (Jean GIONO)", 
  	"In a great mind everything is great. (Blaise PASCAL)",
  	"We see well only with the heart. (Antoine de SAINT-EXUPÉRY)",
  	"The world is a book - with each step we open a page. (Alphonse de LAMARTINE)",
  	"Science has no homeland. (Louis PASTEUR)"
  	];

  $scope.quote = quoteDay[Math.floor((Math.random() * 4))];
})

.controller('contactCtrl', ['$scope', function($scope){
	$scope.email = "";
	$scope.sbj = {text:"", word: /^\s*\w*\s*$/};
	$scope.msg = "";
	$scope.check = "copy";
	$scope.name = {text:"", word:/^[a-zA-Z]{2,30}$/};
}])

.controller('topCtrl', function($scope) {
  $scope.tops = ["Eiffel Tower", "Notre-Dame", "Arc de Triomphe", "Palais du Louvre", "Sacré-Cœur"];

   // Receives the new item entered in the input box and puts it on the end of the array
  $scope.addItem = function(addNew) {
    // Check that the input box has a value
    if(!(addNew === undefined || addNew === "")){
      $scope.tops.push(addNew);
      $scope.missingError = "";
    } else {
      // Show an error if no item was entered
      $scope.missingError = "Please Enter a new Monument";
    }
  };

});
