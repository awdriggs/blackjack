
console.log("blackjack loaded");

var blackjack = {
	shoe: [],
	discard: [],
	insurance: true, //allows game to be played with or without insurance
	surrender: true, //allows game to be played with or without surrender, casino rules
	bet: 0,
	//build the player and the dealer hands, card will be undefined until deal
	player: new Hand('player'),
	dealer: new Hand('dealer'),
	outcome: "",

	//add a deck to the shoe, repeat a specified amount
	buildShoe: function(decksInShoe){
		
		for(var i=0; i<decksInShoe; i++){
			//create a new deck
			var deck = new Deck();

			//loop through deck, push each card object to the shoe
			for(var j=0; j<deck.cardArray.length; j++){
				this.shoe.push(deck.cardArray[j]);	
			}
			
		}
		this.shoe = this.shuffle(this.shoe);
	},
	//shuffle the deck
	shuffle: function(o){
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
	},

	deal: function(){
		//deal two cards to player and dealer
		for(var i=0; i<2; i++){
			this.player.cards.push(this.shoe.shift());
			this.dealer.cards.push(this.shoe.shift());
		}
	},

	//check to see if the user wants insurance
	checkInsurance: function(){
		if(this.insurance == true){
			if(dealer.cards[0].fValue == "Ace"){
				//offer insurance
				var unserInsurance = confirm("do you want insurance"); //later, change this to a dom feature
				if(unserInsurance == true){
					//get money from the user wallet
				}
			}
		}
	},

	//check to see if either the user or dealer has a natural, 21 with the first two cards
	natural: function(){
		if(this.player.isNatural() == true &&  this.player.isNatural() == true){
			this.outcome = "tie";
		} else if(this.player.isNatural() == true){
			this.outcome = "player win";
		} else if(this.player.isNatural() == true){
			this.outcome = "dealer win";
		}
	},

	bust: function(aHand){
		if(aHand.total() > 21){
			debugger;
			console.log(aHand.owner + ' bust');
			return true;
		} else {
			return false;
		}
	},

	getBet: function(){
		this.bet = prompt("place a bet") //later, change to a dom feature
	},

	userPlay: function(){
		this.getBet();
		this.deal();
		this.natural();
		while(this.bust(this.player) == false && this.player.stand == false){
			//get the players move
			var playerHand = "";
			for(var i=0; i<this.player.cards.length; i++){
				playerHand += " " + this.player.cards[i].fValue;
			}
			console.log('Player Hand ' + playerHand);
			console.log('Dealer Showing ' + this.dealer.cards[0].fValue);
			var move = prompt('enter s to stand, enter h to Hit'); //later, change all this to a dom feature

			if(move == 's'){
				this.player.setStand();
				this.dealerPlay();
			} else if(move == 'h'){
				this.player.hit(this.shoe.shift());
			}
		}

	},

	dealerPlay: function(){
		console.log("Dealer showing " + this.dealer.cards[0].fValue + " " + this.dealer.cards[1].fValue);
		
		while(this.bust(this.dealer) == false && this.dealer.total < 17){
			this.dealer.hit();
			
			var dealerHand = "";
			for(var i=0; i<this.dealer.cards.length; i++){
				dealerHand += " " + this.dealer.cards[i].fValue;
			}
			console.log(dealerHand);
		}
		this.checkOutcome();
	},

	checkOutcome: function(){
		console.log('checking outcome');
		if(this.bust(this.dealer) == false && this.dealer.total() > this.player.total()){
			console.log("dealer wins");
		} else if(this.bust(this.player) == false && this.player.total() > this.dealer.total()){
			console.log("player wins");
		} else if(this.player.total() == this.dealer.total()){
			console.log("player tie");
		}
	}

	//work on next, take cards from hand and give to discard pile.
}

//Testing the game
blackjack.buildShoe(1);
blackjack.userPlay();

