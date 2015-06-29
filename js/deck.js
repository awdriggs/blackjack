console.log("deck loaded");

var Deck = function(){
	this.cardArray = [];
	this.suits = ["Spade", "Heart", "Diamond", "Club"];
	this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
	this.fillDeck();
}

Deck.prototype.fillDeck = function() {
	var array = []
	for(var i = 0; i<this.suits.length; i++){
		for(var j = 0; j<this.values.length; j++){
			if(this.values[j] == "Ace"){
				//create an ace
				this.cardArray.unshift(new Card(this.suits[i], this.values[j], 11)); //how am I going to handle the ace value?
			} else if(isNaN(this.values[j])==true){
				//creat a face card, num value is 10
				this.cardArray.unshift(new Card(this.suits[i], this.values[j], 10));
			} else {
				//num card, value is set to number
				this.cardArray.unshift(new Card(this.suits[i], this.values[j], this.values[j]));
			}
		}
	}
};

//for testing!
Deck.prototype.printDeck = function() {
	for(var i = 0; i<this.cardArray.length; i++){
		console.log(this.cardArray[i].suit + " " 
					+ this.cardArray[i].fValue + " " 
					+ this.cardArray[i].nValue);
	}
	
};