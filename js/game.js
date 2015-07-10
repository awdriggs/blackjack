console.log('game.js loaded');
//to do
//write the script to flush the hand and restart the game
//make the use play as a function player object Done!

//split is written, not tested enough



//game is an object
/// inside of game we now create a new game which has players and a dealer, the dealer its own object players are also individual objects
//the game starts uses existing logic to deal, currently cant check for any wins. 
var game = {
    players: [], //array to hold players, more players can be added later
    insurance: true, //allows game to be played with or without insurance
    surrender: true, //allows game to be played with or without surrender, casino rules
    dealer: new Dealer(), //create a new dealer object

    startGame: function(numPLayers, numberOfShoes) {
        this.players = []; //purge the players array
        for (var i = 0; i < numPLayers; i++) {
            playerName = i+1;
            this.players.push(new Player("Player " + playerName));
        }
        this.dealer.buildShoe(numberOfShoes)
    },

    dealCards: function() {
        this.dealer.getHand();
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].getHand();
            for (var j = 0; j < 2; j++) {
                this.players[i].hand[0].hit(this.dealer.deal())
                this.dealer.hand[0].hit(this.dealer.deal())
            }
        }
    },


    checkResult: function() {
        var events = "";
        for (var i = 0; i < this.players.length; i++) {
            events = this.players[i].result(this.dealer.hand[0]);
        }

        return events;
    },

    flush: function() {
         for (var i = 0; i < this.players.length; i++) {
            this.players[i].hand = [];
            
        }
        this.dealer.hand = [];
    }
}