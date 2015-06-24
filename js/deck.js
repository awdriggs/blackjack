console.log("deck loaded");
var cardArray = [];
var suits = ["Spade", "Heart", "Diamond", "Club"];
var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];

var fillDeck = function(){
	for(var i = 0; i<suits.length; i++){
		for(var j = 0; j<values.length; j++){
			if(values[j] == "Ace"){
				//create an ace
				cardArray.unshift(new Card(suits[i], values[j], 1));
			} else if(isNaN(values[j])==true){
				//creat a face card, num value is 10
				cardArray.unshift(new Card(suits[i], values[j], 10));
			} else {
				//num card, value is set to number
				cardArray.unshift(new Card(suits[i], values[j], values[j]));
			}
		}
	}
}

var printDeck = function(){
	
	for(var i = 0; i<cardArray.length; i++){
		console.log(cardArray[i].suit + " " + cardArray[i].fValue + " " + cardArray[i].nValue);
	}
	
}