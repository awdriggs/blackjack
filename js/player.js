console.log('player.js loaded');

//player is an object

//future - use the owner to allow users to give the players name.
var Player = function(owner) {
    this.balance = 1000;
    this.bet = 0;
    this.insured = false;
    this.surrended = false;
    this.owner = owner
};

Player.prototype = new Agent()

Player.prototype.getHand = function() {
    this.hand.push(new Hand());
};

Player.prototype.placeBet = function(amount) {
    this.bet += amount;
    this.balance -= amount;
};

Player.prototype.result = function(dealerHand){
    //hand outcome is given from the had, natural, win, lose, push
    //effect the balance according to the outcome
    var event = this.hand[0].checkOutcome(dealerHand);
    //take action depending on the event
    if(event === 'natural'){
        this.balance += this.bet * 3;
        this.bet = 0;
    } else if(event === 'push'){
        //return bet to balance?
        this.balance += this.bet;
    } else if(event === 'win'){
        this.balance += this.bet * 2;
        this.bet = 0;

    } else if(event === 'lose'){
        this.bet = 0;
    }
    console.log(event);
    return event;

}

Player.prototype.takeInsurance = function(choice){
    if(choice){
        this.balance -= this.bet;
        this.insured = true;
    }
}

Player.prototype.play = function() {
    console.log("player " + this.owner);
    //loop through the hands, check natural, check split, play the hand out.
    for(var j = 0; j<this.hand.length; j++){
        //check natural
        if(this.hand[j].isNatural()){
            //player got a natural, set the natural to true on hand and move on
        } else if(this.hand[j].cards[0].value === this.hand[j].cards[1].value){
            //offer split
            console.log("split available");
            this.hand[j].canSplit = true; //activate split
            var choice = confirm("would you like to split");

            if(choice===true){
                console.log("splitting hand");
                this.hand.push(new Hand()); //push a new hand object to this players hand array
                this.hand[j+1].cards.shift(this.hand[j].cards.pop()); //pop the second card and put into into the cards array for the second hand;
                //deal a card to each hand

                for(var i = 0; i<this.hand.length; i++){
                    this.hand[i].hit(game.dealer.deal());
                }
            }
        } else {
            //offer surrender
            this.surrender();

            //offer double
            this.doubled();

            //loop through the hands
            for(var i = 0; i<this.hand.length; i++){
                while(this.hand[i].stand === false && this.hand[i].value < 21){
                    var move = prompt('enter s to stand, enter h to hit');

                    if(move === 's'){
                        this.hand[i].stand = true;
                    } else if(move === 'h'){
                        this.hand[i].hit(game.dealer.deal());
                        console.log(this.hand[i].renderCards(this.hand[i].cards.length, true));
                    }
                }
            } //end looping through hand array
        }
    } //end outer loop
};

Player.prototype.surrender = function() {
   
    if(game.surrender == true){
        var choice = confirm('would you like to surrender?')

        if(choice == true){
            this.surrended = true;
            this.hand[0].stand = true;
            this.blance += this.bet/2;
            return true;
        } else {
            return false;
        }
    }
};

Player.prototype.doubled = function() {
    var choice = confirm('would you like to double?')
    if(choice == true){
        this.hand[0].stand = true;
        this.balance -= this.bet;
        this.hand[0].hit(game.dealer.deal());
        console.log(this.hand[i].renderCards(this.hand[0].cards.length, true));
    }
};


//code to reset hand
//game.players[0].hand[0] = new Hand();










































