console.log('player.js loaded');

//player is an object

//future - use the owner to allow users to give the players name.
var Player = function(owner) {
    this.balance = 1000;
    this.bet = 0;
    this.insured = false;
    this.surrended = false;
    this.owner = owner
    this.doubledBet = false;
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
    var balanceChange = 0;
    //take action depending on the event
    if(event === 'natural'){
        balanceChange = this.bet *3;
        this.balance += balanceChange;
        this.bet = 0;
    } else if(event === 'push'){
        //return bet to balance?
        balanceChange = 0; //no change
        //this.balance += this.bet;
        this.bet = 0;
    } else if(event === 'win'){
        balanceChange = this.bet*2;
        debugger;
        this.balance += balanceChange;
        this.bet = 0;
    } else if(event === 'lose'){
        balanceChange = this.bet;
        this.bet = 0;
    } else if(event === 'surrender'){
        balanceChange = this.bet/2;
        debugger;
        this.balance += balanceChange;
    }
    console.log(event);
    return "You "+ event + " $" + balanceChange + "!";

}

Player.prototype.takeInsurance = function(choice){
    if(choice){
        this.balance -= this.bet;
        this.insured = true;
    }
}

Player.prototype.split = function(){
    if(this.hand[j].cards[0].value === this.hand[j].cards[1].value){
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
    }
}

Player.prototype.surrender = function() {
    this.surrended = true;
    return true;
};

Player.prototype.doubled = function() {
        this.doubledBet = true;
        this.hand[0].stand = true;
        this.balance -= this.bet;
        this.bet *= 2;
        this.hand[0].hit(game.dealer.deal());
};








































