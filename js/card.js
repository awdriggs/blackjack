console.log('card.js loaded');

//car constructor
var Card = function(suit, faceValue, numValue){
	this.suit = suit;
	this.fValue = faceValue;
	this.nValue = numValue;
}

//for testing
Card.prototype.printCard = function(first_argument) {
			console.log(
					this.suit + " " 
					+ this.fValue + " " 
					+ this.nValue);
};