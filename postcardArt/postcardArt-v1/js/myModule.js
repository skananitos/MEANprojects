
		var app = angular.module("myApp", []);
		app.controller('MainController', function($scope) { 
		  $scope.title = 'Art on a Postcard'; 
		  $scope.subtitle = 'Skananitos';
		  $scope.products = [ 
			  { 
			    name: 'Louvre fountain', 
			    price: 8, 
			    pubdate: new Date('2014', '09', '23'), 
			    cover: 'https://farm6.staticflickr.com/5640/22170971835_8dc48ff363_z.jpg',
			    likes: 0,
			    dislikes:0
			  }, 
			  { 
			    name: 'Arc de Triomphe', 
			    price: 9, 
			    pubdate: new Date('2014', '09', '23'), 
			    cover: 'https://farm1.staticflickr.com/618/21548178484_0741e4cf61_z.jpg',
			    likes: 0,
			    dislikes:0
			  },
			  { 
			    name: 'Louvre', 
			    price: 9, 
			    pubdate: new Date('2014', '09', '23'), 
			    cover: 'https://farm6.staticflickr.com/5691/21982777530_b252b0f300_z.jpg',
			    likes: 0,
			    dislikes:0
			  },
			  { 
			    name: 'Eiffel tower', 
			    price: 10, 
			    pubdate: new Date('2014', '09', '24'), 
			    cover: 'https://farm1.staticflickr.com/635/21983159398_0b6c6dfd48_z.jpg',
			    likes: 0,
			     dislikes:0
			  }
			];
		  $scope.plusOne = function(index) { 
 		  	$scope.products[index].likes += 1; 
		  };
  		  $scope.minusOne = function(index) { 
  		  	$scope.products[index].dislikes += 1; 
		  };
		});