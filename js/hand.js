console.log("hand loaded");

var Hand = function(owner){
	this.cards = [];
	this.stand = false;
	//this.bust = false; //still needed?
	this.natural = false;
	this.value = 0; 
	//this.outcome = ""; //still needed? 
}

//behaviors
//hit, add cards to the array
Hand.prototype.hit = function(newCard) {
	this.cards.push(newCard);
	this.getValue();
	return this.cards;
};

Hand.prototype.isNatural = function() {
	if(this.cards[0].nValue + this.cards[1].nValue == 21){
		this.natural = true;
		return true;
	} else {
		this.natural = false;
		return false;
	}
};


// //is this even needed? the stand button could just exit a function in the game
Hand.prototype.setStand = function() {
	this.stand = true;
};

Hand.prototype.getValue = function() {
	this.value = 0; 
	for(var i = 0; i < this.cards.length; i++){
		if(this.cards[i].value === "King"|| this.cards[i].value === "Queen" || this.cards[i].value === "Jack"){
			this.value += 10
		} else if(isNaN(this.cards[i].value) == false) { //isNan is needed here so the ace isn't evaluated
			this.value += this.cards[i].value;
		} else if(this.cards[i].value === "Ace"){
			if(this.value > 10) {
				console.log
				this.value += 1
			} 
			else this.value += 11;
		} 
	}
	return this.value;
};

Hand.prototype.renderCards = function(numCards, showTotal) {
	var handString = ""
	for(var i = 0; i < numCards; i++){
		handString += this.cards[i].value + " of " + this.cards[i].suit + " ";
	}

	if(showTotal == true){
			handString += "total: " + this.getValue();
	}

	return handString;
};

Hand.prototype.checkBust = function() {
	console.log('check for a bust');
	
	if(this.getValue() > 21){
		this.bust = true;
		return true;
	} else {
		this.bust = false;
		return false;
	}
};

//still needed?
// Hand.prototype.setOutcome = function() {
// 	if(this.bust == true){
// 		this.outcome = 'bust'
// 	}
// };

Hand.prototype.checkOutcome = function(dealerResult) {
	console.log('checking outcome')
	//if you and dealer both have a natural, you push
	if(this.natural == true && dealerResult.natural == true){
		return 'push';
	}
	//if the dealer has a natural, you lose
	else if(dealerResult.natural == true){ 
		return 'lose';
	} 
	//if you have a natural, return natural
	else if(this.natural == true){
		return 'natural';
	} 
	//if dealer results is greter that 21, you win
	else if(dealerResult.value > 21 && this.result <= 21){
		return 'win';
	}
	//if your value is greater than 21, you lose
	else if(dealerResult.value <= 21 && this.value > 21){
		return 'lose';
	}
	//if both player and dealer bust, you push
	else if(dealerResult.value > 21 && this.value > 21){
		return 'push';
	}
	//if dealer result is less than your result, you win
	else if(dealerResult.value < this.value){
		return 'win';
	}
	//if both are under 21, if the dealer is greater than you, you lose
	else if(dealerResult.value > this.value){
		return 'lose';
	}
	//if your value is equal to the dealers value, you push
	else if(dealerResult.value === this.value){
		return 'push';
	}
	
};


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