console.log("hand loaded");

var Hand = function(card1, card2){
	this.cards = [card1, card2];
}

//behaviors
//stand, add cards to the array
Hand.prototype.stand = function(newCard) {
	this.cards.push(newCard);
	return this.cards;
};


//find total
Hand.prototype.total = function() {
	var sum = 0;
	for(var i = 0; i<this.cards.length; i++){
		sum += this.cards[i].nValue;
	}

	return sum;
};

// //is this even needed? the stand button could just exit a function in the game
// Hand.prototype.stand = function() {
// 	var this.total();
// };


//Testing 
// var testDeck = new Deck();

// //random grabber
// var testHand = new Hand(testDeck.cardArray[Math.floor(Math.random()*52)], testDeck.cardArray[Math.floor(Math.random()*52)]);

// for(var i = 0; i<testHand.cards.length; i++){
// 	console.log(i + " card in hand ");
// 	testHand.cards[i].printCard();
// }

// var testTotal = testHand.total();
// console.log("testHand total is "+ testTotal);