angular.module('app.cells', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.
        when('/views', {
            templateUrl: 'views/cells.html',
            controller: 'mainCtrl'
        })
        .when('/views/:cellId', {
            templateUrl: 'views/cellcomments.html',
            controller: 'cellComCtrl'
        })
}])

.controller('mainCtrl', ['$scope', '$http', function($scope, $http){
        
    $scope.tab = 1;
    $scope.filtText = '';

    $http.get('json/dataset.json').success(function(data){
      $scope.cells = data;
    });


        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2)
                $scope.filtText = "apple";
            else if (setTab === 3)
                $scope.filtText = "blu";
            else if (setTab === 4)
                $scope.filtText = "lg";
            else if (setTab === 5)
                $scope.filtText = "samsung";
            else
                $scope.filtText = "";
        }

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        }
}])


.controller ('cellComCtrl', ['$scope', '$http', '$routeParams', '$filter', function ($scope, $http, $routeParams, $filter) {
    
    var cellId = $routeParams.cellId;
    $http.get('json/dataset.json').success(function(data){
        $scope.cell = $filter('filter')(data, function (d){
            return d.id == cellId;
        })[0];
    });

    $scope.acceptedInput = function(commentValue) {                
             var commentValueSmall = angular.lowercase(commentValue);  
             
              if (commentValueSmall === 'rating' || 
                  commentValueSmall === '-rating' || 
                  commentValueSmall === 'author' || 
                  commentValueSmall === '-author' || 
                  commentValueSmall === 'date' || 
                  commentValueSmall === '-date') {

                  return commentValueSmall;
              } 
              
            };
}]);