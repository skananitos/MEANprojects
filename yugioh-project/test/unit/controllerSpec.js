'use strict';

describe('Testing AngularJS Yu­Gi­Oh! Project', function() {

	beforeEach(module('yu­gi­ohApp.cards'));

	describe('Testing AngularJS Controller - CardsCtrl', function() {
		var httpMock, scope, ctrl;

		beforeEach(inject(function ($controller, $rootScope, factoryGetJSONFile, $httpBackend, $q) {
	        httpMock = $httpBackend;
	        scope = $rootScope.$new();

	        //Set up mock
    		myService = jasmine.CreateSpyObj('myService', ['getItem']); 
    		myService.getItem.and.returnValue($q.when(mockItem ));

	        ctrl = $controller('CardsCtrl', {
	            $scope: scope,
	            factoryGetJSONFile: factoryGetJSONFile,
	            $httpBackend: httpMock,
	            myService: myService
	        });
   		}));

		it('should initialize the link data, the link price', function() { 
			expect(scope.link_data).toBeDefined();
			expect(scope.link_data).toBeDefined('https://crossorigin.me/http://yugiohprices.com/api/card_data/');

			expect(scope.link_price).toBeDefined();
			expect(scope.link_price).toBeDefined('https://crossorigin.me/http://yugiohprices.com/api/get_card_prices/');
		});

		it('should get local json data', function() { 
            httpMock.expectGET("json/cards.json");
            httpMock.flush();
		});

		it('should initialize the selected div', function() { 
			expect(scope.selected).toBeDefined();
			expect(scope.selected).toBe(false);
		});

		it('should make API request when app loads', function() {
			var resp;
			scope.cardName = 'Reasoning';

			expect(scope.link_data).toBeDefined();
			expect(scope.link_data).toBeDefined('https://crossorigin.me/http://yugiohprices.com/api/card_data/');

			scope.link_data += scope.cardName;

        	httpMock.expectGET(scope.link_data);
        	myService.getItem(scope.link_data).success(function(response){
            	resp = response.data;
        	});

        	httpMock.flush();   
        	expect(resp.detail).toEqual(456);

        	expect(scope.link_price).toBeDefined();
			expect(scope.link_price).toBeDefined('https://crossorigin.me/http://yugiohprices.com/api/get_card_prices/');

			scope.link_price += scope.cardName;

        	httpMock.expectGET(scope.link_price);
        	myService.getItem(scope.link_price).success(function(response){
            	resp = response.data;
        	});

        	httpMock.flush();   
        	expect(resp.detail).toEqual(456);


		});
	});
});