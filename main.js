angular.module('moduleOne',[])

angular.module('moduleOne')
	.factory('factoryOne', function(){

var FoodItem = function(name, calories, vegan, glutenFree, citrusFree) {
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
}

FoodItem.prototype.stringify = function() {
	return ("Name: " + this.name + ". Calories: " + this.calories + ". Vegan: " + this.vegan + ". Gluten Free: " + this.glutenFree + ". Citrus Free: " + this.citrusFree + ".")
}

var pineapple = new FoodItem('Whole Pineapple', 452, true, true, false)

var potato = new FoodItem('Whole Potato', 163, true, true, true)

var chicken = new FoodItem('Chicken Breast', 231, false, true, true)

// console.log(pineapple.stringify())
// console.log(potato.stringify())
// console.log(chicken.stringify())

var Drink = function(name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
}

var Plate = function(name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
}

var Order = function(plates) {
	this.plates = plates;
}

var Menu = function(plates) {
	this.plates = plates;
}

var DrinkMenu = function(drinks){
	this.drinks = drinks;
}
var Restaurant = function(name, description, menu) {
	this.name = name;
	this.description = description;
	this.menu = menu;
}

var Customer = function(dietaryPreference) {
	this.dietaryPreference = dietaryPreference;
}

Drink.prototype.stringify = function() {
	var iterate = function(ingredients){
		var ingredientArray = []
		for(var i=0; i < ingredients.length; i++){
			ingredientArray.push(ingredients[i].stringify())
		}
		return ingredientArray.join(', ')
	}
	return ("Name: " + this.name + ". Description: " + this.description + ". Price: $" + this.price + ". Ingredients: " + iterate(this.ingredients) + ".")
}

Drink.prototype.nameString = function(){
	var iterate = function(ingredients){
		var names = []
		for(var i=0; i<ingredients.length; i++){
			names.push(ingredients[i].name)
		}
		return names.join(', ')
	}
		return iterate(this.ingredients)
}
Plate.prototype.stringify = function() {
	
	var iterate = function(ingredients){
		var ingredientArray = []
		for(var i=0; i < ingredients.length; i++){
			ingredientArray.push(ingredients[i].stringify())
		}
		return ingredientArray.join(', ')
	}
	

	return  iterate(this.ingredients)
}
Plate.prototype.nameString = function(){
	var iterate = function(ingredients){
		var names = []
		for(var i=0; i<ingredients.length; i++){
			names.push(ingredients[i].name)
		}
		return names.join(', ')
	}
		return iterate(this.ingredients)
}



Order.prototype.stringify = function() {
	var iterate = function(plates) {
		var plateArray = []
		for(var i = 0; i < plates.length; i++){
			plateArray.push(plates[i].stringify())
		}
		return plateArray.join(', ')
	}
	return ("Order: " + iterate(this.plates))
}

Menu.prototype.stringify = function() {
	var iterate = function(plates) {
		var plateArray = []
		for(var i = 0; i < plates.length; i++){
			plateArray.push(plates[i].stringify())
		}
		return plateArray.join(', ')
	}
	return ("Menu: " + iterate(this.plates))
	}

Restaurant.prototype.stringify = function() {
	return ("Name: " + this.name + ". Description: " + this.description + ". Menu: " + menu.stringify() + ".")
}

Customer.prototype.stringify = function() {
	return ("Dietary Preference: " + this.dietaryPreference + ".")
}

Plate.prototype.isVegan = function() {
	for(item in ingredients) {
		if(!item.vegan) {
			return false
		}
	}
	return true
}

Plate.prototype.isGlutenFree = function() {
	for(item in ingredients) {
		if(!item.glutenFree) {
			return false
		}
	}
	return true
}

Plate.prototype.isCitrusFree = function() {
	for(item in ingredients) {
		if(!item.citrusFree) {
			return false
		}
	}
	return true
}

var tortilla = new FoodItem('Tortilla', 300, true, false, true)

var rice = new FoodItem('Rice', 210, true, false, true, true)

var beans = new FoodItem('Beans', 120, true, true, true)

var meat = new FoodItem('Meat', 180, false, true, true)

var burritoPlate = new Plate('Burrito', 'Rice, beans, and meat in a tortilla', 9, [rice, beans, meat, tortilla])

var avocado = new FoodItem('Avocado', 230, true, true, true)

var guacamole = new Plate('Guacamole', 'Mashed avocado', 5, [avocado])

var tequila = new FoodItem('Tequila', 68, true, true, false)

var limeJuice = new FoodItem('Lime Juice', 90, true, true, false)

var margarita = new Drink('Margarita', 'Tequila and Lime Juice', 7, [tequila, limeJuice])

var drinkMenu = new DrinkMenu([margarita])

var menu = new Menu([burritoPlate, guacamole])

var chipotle = new Restaurant("Chipotle", "Burrito Joint", menu)

return {	
			menu : menu,
			drinkMenu : drinkMenu
		}




})

angular.module('moduleOne')
	.controller('controllerOne',['$scope', 'factoryOne',function($scope, factoryOne){

		$scope.menu = factoryOne.menu
		console.log($scope.menu)
		$scope.drinkMenu = factoryOne.drinkMenu
		console.log($scope.drinkMenu)
		$scope.order = []
		$scope.totalCost = 0
		$scope.confirmAddFood = function(plate){
			plate.showButton = true
		}
		$scope.confirmAddDrink = function(drink){
			drink.showButton = true
		}
		$scope.addFoodOrder = function(plate, index) {
			plate.showButton = false
			$scope.order.push({name: plate.name, price: plate.price})
			$scope.totalCost += plate.price

		}
		$scope.addDrinkOrder = function(drink, index) {
			drink.showButton = false
			$scope.order.push({name: drink.name, price: drink.price})
			$scope.totalCost += drink.price
		}
		$scope.confirmRemove = function(index) {
			$scope.showRemove = true
			$scope.removeMe = index
		}
		$scope.remove = function(index) {
			$scope.totalCost -= $scope.removeMe.price
			$scope.order.splice($scope.removeMe, 1)
			
			$scope.showRemove = false
		}
	}])














