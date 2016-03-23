'use strict';

// Declare app level module which depends on views, and components
angular.module('yu­gi­ohApp', [
  'ngRoute',
  'yu­gi­ohApp.cards'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/cards'});
}]);
