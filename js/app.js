var currentPlayerIndex = 0;
var currentHand = 0;

//run the dom!
window.onload = function() {
	var w = document.getElementById('wrapper').offsetWidth;
	var h = document.getElementById('wrapper').offsetHeight;

	console.log("app.js built")
	
	///////////////////////////////////////////// add a click tot the title, 
	//////////////////////////////////////// effect the title button after click
	var newGame = document.getElementById('newGame');
	newGame.addEventListener("click", function(){

		newGame.className = 'play_screen';

		var gameboard = document.getElementById('gameboard');
		gameboard.className = "hidden";

		//build the options selector
		var menu = document.getElementById('menu');
		menu.className = "";
		menu.style.left = w/2-150 + "px";
		menu.style.top = h/2-350+ "px";	
	});

	///////////////////////////////////////////////////////// start button features
	var start = document.getElementById('start_game');
	start.addEventListener("click", function() {

		setOptions();

		//make the gameboard visible
		var gameboard = document.getElementById('gameboard');
		gameboard.className = "active";	

		//make deal button active
		var deal = document.getElementById('deal');
		deal.className = 'active';


		makePlayersDivs();
		makeDealerDivs();
	});


	////////////////////////////////////////////////////handle the betting buttons
	var getBets = document.getElementById('bet_box');
	getBets.addEventListener("click", bet);

	//handle the deal button
	var deal = document.getElementById('deal');
	deal.addEventListener("click", dealing);

	//////////////////////////////////////////////////////////// play menu buttons
	var play_menu = document.getElementById('play_menu');
	play_menu.addEventListener("click", play);

	var replay = document.getElementById('replay');
	replay.addEventListener("click", playAgain);
};



/////////////////////////////////////////////////////////////////// functions
var setOptions = function(){
	//get the value of all the value boxes

		//clear any previous game
		
		var numPlayers = parseInt(document.getElementsByTagName('input')[0].value);
		var decks = parseInt(document.getElementsByTagName('input')[1].value);

		
		//start game with the values
		game.startGame(numPlayers, decks);

		//set the  insurance feature
        var checkbox = document.getElementById('insure');
        if(checkbox.checked){
        	game.insurance = true;
        }

        //hide the options
        var menu = document.getElementById('menu');
		menu.className = "hidden";
};

var showBetMenu = function() {
	//show the bet menu
	var betBox = document.getElementById('bet_box');
	var balance = document.getElementById('balance_box');

	betBox.style.display = 'flex';
	balance.style.display = 'block';
}

var	hideBetMenu = function(){
	//hide the bet menu
	var betBox = document.getElementById('bet_box');
	var balance = document.getElementById('balance_box');

	betBox.style.display = 'none';
	balance.style.display = 'none';
}

var showdealButton = function(){
	//make deal button active
	var deal = document.getElementById('deal');
	deal.className = 'active';
}

var updatePlayer = function(){
	var playerBox = document.getElementById('indicate_player');
	var balanceBox = document.getElementById('balance_box');

	playerBox.innerHTML = game.players[currentPlayerIndex].owner;
	balanceBox.innerHTML = "$" + game.players[currentPlayerIndex].balance;
}

//function that is called when a bet button is clicked
var bet = function(){
	
	var clicked = event.target.className
	console.log(clicked);
	
	var amount = 0;


	if(clicked === 'bet_button one'){
		amount = 1;
	} else if(clicked === 'bet_button five'){
		amount = 5;
	} else if(clicked === 'bet_button twentyFive'){
		amount = 25;
	} else if(clicked === 'bet_button hundred'){
		amount = 100;
	} else if(clicked === 'bet_button fiveHundred'){
		amount = 500;
	}

	//show the bet in the bet box
	var betBox = document.getElementById(game.players[currentPlayerIndex].owner).childNodes[2];
	var chip = document.createElement('div')
	
	chip.className = clicked;
	betBox.appendChild(chip);

	game.players[currentPlayerIndex].placeBet(amount);
	updatePlayer();
}

//function called when 'deal' button is pressed
var dealing = function(){
	if(currentPlayerIndex < game.players.length-1){
		currentPlayerIndex++;
		updatePlayer();
	} else {

		console.log("DOM: deal a hand now!");
		//hide the deal button
		var deal = document.getElementById('deal');
		deal.className = 'hidden';
		
		//show the dealer box
		document.getElementById('dealer').style.display = "block";
		//call the game deal functinio
		game.dealCards();

		//pop the player cards to the dom
		showCards();
		dealerCards(true); //true will hid the second card.
		hideBetMenu();
		showPlayMenu();
		currentPlayerIndex = 0;
		updatePlayer();
		
		var message = document.getElementById('message');
		message.innerHTML = "";
	}
}

var makePlayersDivs = function(){	
	//player divs
	var players_box = document.getElementById('players_box');

	for(var i = 0; i<game.players.length; i++){
		var node = document.createElement('div');
		node.className = "single_player";
		node.id = game.players[i].owner;
		node.innerHTML = game.players[i].owner;
		
		var cards = document.createElement('div');
		cards.className = 'cards';
		node.appendChild(cards);
		var chips = document.createElement('div');
		chips.className = 'bet_chips';
		//chips.innerHTML = "bet";
		node.appendChild(chips)
		players_box.appendChild(node);

	}
}

var clearDivs = function(){
	var players_box = document.getElementById('players_box');
	players_box.removeChild(players_box.children[0]);

	var dealer_box = document.getElementById('dealer_box');
	dealer_box.removeChild(dealer_box.children[1]);
}

var makeDealerDivs = function(){
		//player divs
	var dealer_box = document.getElementById('dealer_box');

	for(var i = 0; i<game.players.length; i++){
		var node = document.createElement('div');
		

		node.className = "single_player";
		node.id = "dealer";
		node.style.display = 'none';
		//node.innerHTML = game.players[i].owner;
		
		var cards = document.createElement('div');
		cards.className = 'cards';
		node.appendChild(cards);
		
		dealer_box.appendChild(node);

	}
}

//populate cards
var showCards = function() {
	//update the cards of each player
	for(var i=0; i<game.players.length; i++){
		
		var currentPlayer = game.players[i];
		var node = document.getElementById(currentPlayer.owner);
		var cards = node.getElementsByClassName('cards');
		//needed for the for loop
		var handLength = cards[0].childNodes.length;
		//remove the previous cards, go backwards through because otherwise index changes
		for(var j=handLength-1; j>=0; j--){
			cards[0].removeChild(cards[0].childNodes[j]);
		}

		//loop through each card and create elements
		for(var j=0; j<currentPlayer.hand[0].cards.length; j++){
			var stringSuite = game.players[i].hand[0].cards[j].suit;

			var color = getColor(stringSuite)
		
			var single = document.createElement('div');
			single.className = "single_card";

			var value = document.createElement('div');
			value.className = 'value ' + color;
			
			var suit = document.createElement('div');
			suit.className = 'suit ' + color;

			single.appendChild(value);
			single.appendChild(suit);

			
			var symbol = '';
			symbol = getSymbol(stringSuite)

			suit.innerHTML = symbol;
			value.innerHTML = game.players[i].hand[0].cards[j].value;
			
			

			cards[0].appendChild(single);
		}
	}
}

var getSymbol = function(stringSuite){
		var symbol = '';

		if(stringSuite == 'Heart'){
				symbol = '&#9825';
			} else if(stringSuite == "Spade"){
				symbol = '&#x2664';
			} else if(stringSuite == 'Club'){
				symbol = '&#9831';
			} else if(stringSuite =='Diamond'){
				symbol = '&#x25c7';
			}

			return symbol
}

var getColor = function(stringSuite){
			var color = '';
			if(stringSuite == "Heart" || stringSuite == "Diamond"){
				//set classname to red
				return 'red';
			} else if(stringSuite == "Spade" || stringSuite == "Club"){
				//set classname to black
				return 'black';
			}
}

var dealerCards = function(hide) {
	//control is to handle whether the second card should be shown or not!
	
	dealer = game.dealer.hand[0];
	var cards = document.getElementById('dealer').getElementsByClassName('cards');

	var handLength = cards[0].childNodes.length;
		//remove the previous cards, go backwards through because otherwise index changes
		for(var j=handLength-1; j>=0; j--){
			cards[0].removeChild(cards[0].childNodes[j]);
		}

	for(var i=0; i<dealer.cards.length; i++){
		var single = document.createElement('div');
		single.className = 'single_card';
		
		var stringSuite = dealer.cards[i].suit;
		var symbol = getSymbol(stringSuite);
		var color = getColor(stringSuite);

		var value = document.createElement('div');
		value.className = 'value ' + color;
		single.appendChild(value);

		var suit = document.createElement('div');
		suit.className = 'suit ' + color;
		single.appendChild(suit);

		value.innerHTML = dealer.cards[i].value;
		
		

		suit.innerHTML = symbol;

		if(i == 1 && hide == true){
			//hide the cards suit and value
			value.className = 'hidden';
			suit.className = 'hidden';
			//show the background image
			single.className += ' face-down'	
		}
		cards[0].appendChild(single);
	}
}


var showPlayMenu = function(){
	//bring up buttons for hit, stand, double, split, surrender 
	var play_menu = document.getElementById('play_menu');
	play_menu.className = 'visible';
	play_menu.style.display = 'flex';
}

var hidePlayMenu = function(){
	//bring up buttons for hit, stand, double, split, surrender 
	var play_menu = document.getElementById('play_menu');
	play_menu.className = 'hidden';
	play_menu.style.display = 'none';
}


//set the play buttons

//called when one of the play buttons is clicked
var play = function(){
	activateButtons();

	currentPlayer = game.players[currentPlayerIndex];
	updatePlayer();

	var clicked = event.target.id;
	console.log(clicked);

	if(clicked == 'hit'){
		currentPlayer.hand[currentHand].hit(game.dealer.deal());
		deactivateButtons();
		showCards();

		if(currentPlayer.hand[currentHand].value > 21){
			if(game.players.length > 1 && currentPlayerIndex < game.players.length-1){
				currentPlayerIndex++;
				updatePlayer();
			} else {
				activateButtons();
				finishRound();	
			}
		}
	} else if(clicked == 'double'){
		//run the double function
		currentPlayer.doubled();
		showCards();
		//see if there are more players to play
		if(game.players.length > 1 && currentPlayerIndex < game.players.length-1){
			currentPlayerIndex++;
			updatePlayer();
		} else {
			finishRound();	
		}

	} else if(clicked == 'surrender'){
		game.players[0].hand[0].surrender();
		
		//see if there are more players to play
		if(game.players.length > 1 && currentPlayerIndex < game.players.length-1){
			currentPlayerIndex++;
			updatePlayer();
		} else {
			finishRound();	
		}		
	} else if(clicked == 'split'){
		//run the split function, what a fucking pain
	} else if(clicked == 'stand'){
		if(game.players.length > 1 && currentPlayerIndex < game.players.length-1){
			currentPlayerIndex++;
			updatePlayer();
		} else {
			finishRound();	
		}
	}
}



//deactivate the buttons that can't be used
 var deactivateButtons = function(){
 	var surrender = document.getElementById('surrender');
	var doubleBet = document.getElementById('double');
	var split = document.getElementById('split');

	surrender.disabled = true;
	doubleBet.disabled = true;
	split.disabled = true;
 }

//activate buttons dependeing on criteria i.e. double and split
var activateButtons = function(){
	var surrender = document.getElementById('surrender');
	var doubleBet = document.getElementById('double');
	var split = document.getElementById('split');

	surrender.disabled = false;
	doubleBet.disabled = false;

	//only activate split if the current hand has too matching cards.
	if(game.players[currentPlayerIndex].hand[currentHand].canSplit == true){
		split.disabled = false;
	}

}

//doesn't support multiple hands
var CheckForNatural = function(playerIndex, handIndex){
	return game.players[playerIndex].hand[handIndex].isNatural();
}

var finishRound = function(){
	dealerCards(false);

	//remove the play menu
	var play_menu = document.getElementById('play_menu');
	play_menu.style.display = 'none';

	game.dealer.dealerPlay();
	outcome = game.checkResult();

	var message = document.getElementById('message');
		message.innerHTML = outcome;

	updatePlayer();

	var replayMenu = document.getElementById('replayMenu');
	replayMenu.className = '';
}
	
var playAgain = function() {
	game.flush();
	
	var message = document.getElementById('message');
		message.innerHTML = "";

	//hide the replay button
	var replayMenu = document.getElementById('replayMenu');
	replayMenu.className = 'hidden';
	//clear the players dives
	clearDivs();
	//call the functions to make divs again
	makeDealerDivs();
	makePlayersDivs();

	//we the global player counter to 0.
	currentPlayerIndex = 0;

	//show the bet box again
	showBetMenu();

	//show the deal button
	showdealButton();

	var message = document.getElementById('message');
		message.innerHTML = "Make a Bet";

}







