console.log('game.js loaded');
//to do
//write the script to flush the hand and restart the game
//make the use play as a function player object
//work on surrender, split, double



//game is an object
/// inside of game we now create a new game which has players and a dealer, the dealer its own object players are also individual objects
//the game starts uses existing logic to deal, currently cant check for any wins. 
var game = {
    players: [], //array to hold players, more players can be added later
    insurance: true, //allows game to be played with or without insurance
    surrender: true, //allows game to be played with or without surrender, casino rules
    dealer: new Dealer(), //create a new dealer object

    startGame: function(numPLayers, numberOfShoes) {
        for (var i = 0; i < numPLayers; i++) {
            this.players.push(new Player())
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

    play: function() {
        //get bet from each player
        for (var i = 0; i < this.players.length; i++) {
            var currentBet = parseInt(prompt('player ' + i + ' place a bet'));
            debugger;
            this.players[i].placeBet(currentBet);
        }

        //deal the cards
        this.dealCards();

        //show some cards
        //show first dealer card
        console.log(this.dealer.hand[0].renderCards(1));

        //show the  cards for each player
        for (var i = 0; i < this.players.length; i++) {
            console.log('player ' + i + this.players[i].hand[0].renderCards(this.players[i].hand[0].cards.length, true));
        }

        //check for insurance
        if (this.insurance === true) {
            //run the offerInsurance method for dealer, if the return is true, offer each player insurance
            if (this.dealer.offerInsurance() == true) {
                //loop through players and offer insurance
                for (var i = 0; i < this.players.length; i++) {
                    var choice = confirm('do you want insurance');
                    this.players[i].takeInsurance(choice);
                }
            }
        };

        //let each player play their hand
        for (var i = 0; i < this.players.length; i++) {
            var currentPlayer = this.players[i].hand[0];

            //check for a natural
            if (currentPlayer.isNatural()) {
                //this is a natural, set the natural and move on
            } else {
                while (currentPlayer.stand === false && currentPlayer.value < 21) {

                    var move = prompt('enter s to stand, enter h to Hit'); //later, change all this to a dom feature

                    if (move == 's') {
                        currentPlayer.stand = true;
                    } else if (move === 'h') {
                        currentPlayer.hit(this.dealer.deal());
                        console.log(currentPlayer.renderCards(currentPlayer.cards.length, true));
                    }
                }; //end of single player while loop
            };
        }; //end of players loop

        //show the two card of the dealer
        console.log(this.dealer.hand[0].renderCards(this.dealer.hand[0].cards.length, true));

        //check is see if the dealer got a natural


        if (this.dealer.hand[0].isNatural()) {
            //if yes, pay our insurance to players who excepted it
            for (var i = 0; i < this.players.length; i++) {
                if (this.players[i].insured) {
                    //if insured, add the bet to the balance
                    this.players[i].balance += this.players[i].bet();
                }
                this.checkResult();
            }
        } else { //if no, continue to dealer play.
            this.dealer.dealerPlay(); //have the dealer play
            this.checkResult();
        }

        //end the hand, flush the cards
        //end of this round, run play again?
    },

    checkResult: function() {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].result(this.dealer.hand[0]);
        }
    },

}