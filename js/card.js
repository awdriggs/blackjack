console.log('card.js loaded');

//car constructor
var Card = function(suit, value) {
    this.suit = suit;
    this.value = value;
}

//for testing
Card.prototype.printCard = function(first_argument) {
    console.log(this.suit + " " + this.value);
};