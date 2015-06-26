console.log('player.js loaded');

//player is an object

var Player = function() {
    this.hand = [];
    this.balance = 1000;
    this.bet = 0;
    this.insured = false;
};

Player.prototype.getHand = function() {
    this.hand.push(new Hand());
};

Player.prototype.placeBet = function(amount) {
    this.bet = amount;
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

//code to reset hand
//game.players[0].hand[0] = new Hand();





















































