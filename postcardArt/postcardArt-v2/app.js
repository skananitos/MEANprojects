'use strict';

// Declare app level module which depends on views, and components
angular.module('postcardArt', [
  'ngRoute',
  'postcardArt.postcards'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/postcards'});
}]);
