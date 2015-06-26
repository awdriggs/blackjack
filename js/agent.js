var Agent = function() {
    this.hand = [];
  
};

Agent.prototype.getHand = function() {
    this.hand.push(new Hand());
};
