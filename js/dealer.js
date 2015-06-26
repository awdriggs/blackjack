console.log('dealer.js loaded');

//dealer is an object, extends player object
var Dealer = function() {
    this.shoe = [];
}

//set dealer prototype to inherit player attributes
Dealer.prototype = new Player()

//add a deck to the shoe, repeat a specified amount
Dealer.prototype.buildShoe = function(decksInShoe) {
    console.log('building shoe');
    for (var i = 0; i < decksInShoe; i++) {
        //create a new deck
        var deck = new Deck();

        //loop through deck, push each card object to the shoe
        for (var j = 0; j < deck.cardArray.length; j++) {
            this.shoe.push(deck.cardArray[j]);
        }

    }
    this.shoe = this.shuffle(this.shoe);
};


Dealer.prototype.shuffle = function(o) {
    console.log('shuffling');
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

Dealer.prototype.deal = function() {
    console.log('dealing cards');
    return this.shoe.shift();
};

Dealer.prototype.dealerPlay = function() {
    console.log('Dealer Play');
    
    //check for a dealer natural
    //if this is true, set the dealer natural to true

    while (this.hand[0].getValue() < 17) { //how to handle soft 17?
        this.hand[0].hit(this.deal());
        console.log(this.hand[0].renderCards(this.hand[0].cards.length, true));
    }
};

Dealer.prototype.offerInsurance = function() {
    //if the first card in your hand is an ace, return true
    if(this.hand[0].cards[0].value === "Ace"){
        console.log('dealer first card is an ace, offer insurance');
        return true;
    }
};



