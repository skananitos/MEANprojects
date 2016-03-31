angular.module('app',[])

.controller('MainCtrl', function($scope){
  
  //sea food recipes (data)
  $scope.recipes = [
    "Seafood Cocktail",
    "Seafood Cataplana",
    "Mixed Seafood Grill",
    "Bouillabaisse",
    "Lobster and Stone Crab Enchilado",
    "Lobster Bisque",
    "Crab Cakes",
    "Oven-Roasted Dungeness Crab",
    "Shrimp and Mango Skewers",
    "Prawn Tandoori",
    "Old-Fashioned Crawfish",
    "Sauteed Langoustine",
    "Octopus Salad",
    "Octopus",
    "Fried Calamari",
    "Spicy Calamari",
    "Linguine",
    "Oyster Po Boys",
    "Mussels",
    "Seared Scallops",
    "Halibut",
    "Baked Wrapped Tilapia",
    "Sea Bass",
    "Mahi-Mahi Ceviche"
  ];
  
  //sort the array of data
  $scope.recipes.sort();

  //define a list of suggested recipes
  $scope.suggestedRecipes = [];

  //define selected suggestion recipe
  $scope.recipeIndex = -1;
  
  //search() is calling on ng-change
  $scope.search = function(){
    $scope.suggestedRecipes = []; //empty the array each time we call the function
    var recipesList = 0; // suggested recipes list length

    for(var i = 0; i < $scope.recipes.length; i++) { //look on the main array
      //convert array's content to lowercase
      var recipesLowercase = angular.lowercase($scope.recipes[i]); 
      //convert the search term to lowercase so that the indexOf() is case insensitive
      var recipeTextLowercase = angular.lowercase($scope.recipeText); 
      if(recipesLowercase.indexOf(recipeTextLowercase) !== -1){
        $scope.suggestedRecipes.push(recipesLowercase); //push the item on the array if we find it
        recipesList += 1;
        if(recipesList == 10){ //the array will contain maximum 10 recipes
          break;
        }
      }
    }
  }
  
  //watch the recipe text value during the selection from the suggested recipes list  
  $scope.$watch('recipeIndex',function(val){
    if(val !== -1) {
      $scope.recipeText = $scope.suggestedRecipes[$scope.recipeIndex];
    }
  });
   
  //keyboard arrow controls - text field events
  //============================================

  //keydown() is called on ng-keydown
  $scope.keydown = function(event){
    if(event.keyCode === 40){ //down key, increment recipeIndex
      event.preventDefault();
      if($scope.recipeIndex+1 !== $scope.suggestedRecipes.length){
        $scope.recipeIndex++;
      }
    }else if(event.keyCode === 38){ //up key, decrement recipeIndex
      event.preventDefault();
      if($scope.recipeIndex-1 !== -1){
        $scope.recipeIndex--;
      }
    }else if(event.keyCode === 13){ //enter key, empty suggestedRecipes array
      event.preventDefault();
      $scope.suggestedRecipes = [];
    }
  }
  //keyup() is called on ng-keyup
  $scope.keyup = function(event){ 
    if(event.keyCode !== 8 || event.keyCode !== 46){ //delete or backspace
      if($scope.recipeText === ""){
        $scope.suggestedRecipes = [];
      }
    }
  }
  //======================================
  
  //assign() is called on ng-click - list item event
  $scope.assign = function(index){
     $scope.recipeText = $scope.suggestedRecipes[index];
     $scope.suggestedRecipes=[];
  }
});