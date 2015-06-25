
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
		console.log('building shoe');
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
		console.log('shuffling');
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
	},

	deal: function(){
		console.log('dealing cards');
		//deal two cards to player and dealer
		for(var i=0; i<2; i++){
			this.player.cards.push(this.shoe.shift());
			this.dealer.cards.push(this.shoe.shift());
		}
	},

	//check to see if the user wants insurance
	checkInsurance: function(){
		console.log('checking to see if insurance should be offered');
		if(this.insurance == true){
			if(dealer.cards[0].fValue == "Ace"){
				//offer insurance
				var unserInsurance = confirm("do you want insurance"); //later, change this to a dom feature
				if(unserInsurance == true){
					//get money from the user wallet, flush this out more and write
				}
			}
		}
	},

	//check to see if either the user or dealer has a natural, 21 with the first two cards
	//if both user and dealer are holding a natural, outcome is a tie, end the hand
	//if the player has a natural, the player wins 3:2 payout, end the hand
	//if the dealer has a natural, the player loses bet, end hand
	//else proceed with hand.
	natural: function(){
		console.log('checking for naturals')
		if(this.player.isNatural() == true &&  this.dealer.isNatural() == true){
			this.outcome = "tie";
			return true;
		} else if(this.player.isNatural() == true){
			this.outcome = "player win";
			return true;
		} else if(this.dealer.isNatural() == true){
			this.outcome = "dealer win";
			return true;
		} else {
			return false;
		}
	},

	//check for a bust, need to add handling for the ace
	bust: function(aHand){ 

		if(aHand.total() > 21){
			console.log(aHand.owner + ' bust');
			return true;
		} else {
			return false;
		}
	},

	//potentiel to handle the ace
	//if there is a bust, check to see if any of the cards are in ace
	//if a card is an ace, set its numeric value to 1, then rerun the bus function

	//new bust function
	//run a hand level bust function
	//if hand bust returns false, there is no bust, return false
	//if hand bust returns ture, loop through the cards in the hand to see if any of the cards are an ace
	//if there is a card that is an ace, change its numeric value to one
	//rerun the bust function again.
	//if it still returns true, there is definately a bust.

	getBet: function(){
		this.bet = prompt("place a bet") //later, change to a dom feature
	},

	userPlay: function(){
		this.getBet();
		this.deal();
		//call insurance function before checking for a natural
		this.natural(); //this is returning true or false, do something if true!
		
		while(this.bust(this.player) == false && this.player.stand == false){
			
			//show the players move
			var playerHand = "";
			for(var i=0; i<this.player.cards.length; i++){
				playerHand += " " + this.player.cards[i].fValue;
			}

			console.log('Player Hand ' + playerHand);
			console.log('Dealer Showing ' + this.dealer.cards[0].fValue);
			
			//get the player move
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
		debugger;
		while(this.bust(this.dealer) == false && this.dealer.total() < 17){ //how to handle soft 17?
			this.dealer.hit(this.shoe.shift());
			
			var dealerHand = ""; //make this a dom feature
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

	//end hand function
	//called from various parts of the program
	//pass it the outcome, function will take action according to outcome
	//possible outcomes
		//user gets a natural, pay out 3:2
		//dealer gets a natural, pay out insurance if chosen
		//user gets a bust, forfeits bet
		//dealer gets a bust, double the bet
		//player winds on hand, double the bet
		//dealer wins on hand, forfeit bet
		//push, there is a tie, bet stays the same

}

//Testing the game
blackjack.buildShoe(1);
//blackjack.userPlay();

