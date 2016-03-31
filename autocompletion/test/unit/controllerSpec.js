'use strict';

describe('Testing AngularJS AutoComplete Project', function() {

	beforeEach(module('app'));

	describe('Testing AngularJS Controller - MainCtrl', function() {
		var scope, ctrl, compile, element;

		beforeEach(inject(function ($controller, $rootScope, $compile) {
	        scope = $rootScope.$new();
	        scope.keydown = jasmine.createSpy('keydown($event)');
	        scope.keyup = jasmine.createSpy('keyup($event)');
	        ctrl = $controller('MainCtrl', {$scope: scope});
	        compile = $compile;
   		}));

		it('should sort recipies list and lowercase its items', function() { 
			expect(scope.recipes).toBeDefined();
			expect(scope.recipes.length).toBe(24);

			scope.recipes.sort();

			expect(scope.recipes[0]).toBe("Baked Wrapped Tilapia");

			scope.lowercase = angular.lowercase($scope.recipes[0]);

			expect(scope.lowercase).toBe("baked wrapped tilapia");
		});

		it('should initialize suggestedRecipes list', function() { 
			expect(scope.suggestedRecipes).toBeDefined();
			expect(scope.suggestedRecipes.length).toBe(0);
		});

		beforeEach(function() {
      		var elem = angular.element('<input ng-keydown="keydown($event)">');
      		element = compile(elem)(scope);
  		});

		it('should increase recipeIndex', function () {
		    // given
		    var givenEvent = { keyCode: 40 };
		    scope.$digest();
		    // when
		    element.triggerHandler('keydown', givenEvent);
		    // then
		    if(scope.recipeIndex + 1 !== scope.suggestedRecipes.length){
        		expect(scope.recipeIndex).toBe(scope.recipeIndex + 1);
      		}
		});

		it('should decrease recipeIndex', function () {
		    // given
		    var givenEvent = { keyCode: 38 };
		    scope.$digest();
		    // when
		    element.triggerHandler('keydown', givenEvent);
		    // then
		    if(scope.recipeIndex - 1 !== -1){
        		expect(scope.recipeIndex).toBe(scope.recipeIndex - 1);
      		}
		});

		it('should empty suggestedRecipes array', function () {
		    // given
		    var givenEvent = { keyCode: 13 };
		    scope.$digest();
		    // when
		    element.triggerHandler('keydown', givenEvent);
		    // then
        	expect(scope.suggestedRecipes.length).toBe(0);
		});

		beforeEach(function() {
      		var elem = angular.element('<input ng-keyup="keyup($event)">');
      		element = compile(elem)(scope);
  		});

  		it('should delete or backspace', function () {
		    // given
		    var givenEvent1 = { keyCode: 8 };
		    var givenEvent2 = { keyCode: 46 };
		    scope.$digest();
		    // when
		    element.triggerHandler('keyup', givenEvent1);
		    // then
		    if(scope.recipeText === ""){
        		expect(scope.suggestedRecipes.length).toBe(0);
      		}
      		// when
		    element.triggerHandler('keyup', givenEvent2);
		    // then
		    if(scope.recipeText === ""){
        		expect(scope.suggestedRecipes.length).toBe(0);
      		}
		});

	});
});