var currentPlayerIndex = 0;

//run the dom!
window.onload = function() {
	var w = document.getElementById('wrapper').offsetWidth;
	var h = document.getElementById('wrapper').offsetHeight;

	console.log("app.js built")
	
	//add a click tot the title, effect the title button after click
	var newGame = document.getElementById('newGame');
	newGame.addEventListener("click", function(){
		
		newGame.className = 'play_screen';

		//build the options selector
		var menu = document.getElementById('menu');
		menu.className = "";
		menu.style.left = w/2-150 + "px";
		menu.style.top = h/2-350+ "px";	
	});

	//start button features
	var start = document.getElementById('start_game');
	start.addEventListener("click", function() {
		setOptions();
		makePlayersDivs();
	});


	//handle the betting buttons
	var getBets = document.getElementById('bet_box');
	getBets.addEventListener("click", bet);

	//handle the deal button
	var deal = document.getElementById('deal');
	deal.addEventListener("click", dealing);
};

var setOptions = function(){
	//get the value of all the value boxes
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

		//make the gameboard visible
		var gameboard = document.getElementById('gameboard');
		gameboard.className = "active";	
};

var updatePlayer = function(index){
	var playerBox = document.getElementById('indicate_player');
	var balanceBox = document.getElementById('balance_box');

	playerBox.innerHTML = game.players[currentPlayerIndex].owner;
	balanceBox.innerHTML = "$" + game.players[currentPlayerIndex].balance;
}

//function that is called when a button is clicked
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

	game.players[currentPlayerIndex].placeBet(amount);
	updatePlayer();
}

//function called when 'deal' button is pressed
var dealing = function(){
	if(currentPlayerIndex < game.players.length-1){
		currentPlayerIndex++;
		updatePlayer(currentPlayerIndex);
	} else {
		console.log("deal a hand now!");
		deal.className = 'hidden';
	}
}

var makePlayersDivs = function(){
		
	//player divs
	var players_box = document.getElementById('players_box');

	for(var i = 0; i<game.players.length; i++){
		var node = document.createElement('div');
		node.className = "single_player";
		
		var cards = document.createElement('div');
		cards.className = 'cards';
		node.appendChild(cards);
		var chips = document.createElement('div');
		chips.className = 'bet_chips';
		node.appendChild(chips)
		
		players_box.appendChild(node);

	}
}
// var playRound = function(){
// 	//turn on event listeners for the bet buttons
// 	//change theplayer
// 	//add a button to indicate when the pl
// 	get bet from each player
//         for (var i = 0; i < this.players.length; i++) {
//             var currentBet = parseInt(prompt('player ' + i + ' place a bet'));
//             game.players[i].placeBet(currentBet);
//         }

//         //deal the cards
//         game.dealCards();

//         //show some cards
//         //show first dealer card
//         console.log(game.dealer.hand[0].renderCards(1));

//         //show the  cards for each player
//         for (var i = 0; i < game.players.length; i++) {
//             console.log('player ' + i + " " + game.players[i].hand[0].renderCards(game.players[i].hand[0].cards.length, true));
//         }

//         //check for insurance
//         if (game.insurance === true) {
//             //run the offerInsurance method for dealer, if the return is true, offer each player insurance
//             if (game.dealer.offerInsurance() == true) {
//                 //loop through players and offer insurance
//                 for (var i = 0; i < game.players.length; i++) {
//                     var choice = confirm('do you want insurance');
//                     game.players[i].takeInsurance(choice);
//                 }
//             }
//         };
//         //let each player play their hand
//         for (var i = 0; i < game.players.length; i++) {
//             game.players[i].play(); //let each player play
//         }; //end of players loop

//         //show the two card of the dealer
//         console.log(game.dealer.hand[0].renderCards(game.dealer.hand[0].cards.length, true));

//         //check is see if the dealer got a natural
//         if (game.dealer.hand[0].isNatural()) {
//             //if yes, pay our insurance to players who excepted it
//             for (var i = 0; i < game.players.length; i++) {
//                 if (game.players[i].insured) {
//                     //if insured, add the bet to the balance
//                     game.players[i].balance += game.players[i].bet;
//                 }
//                 game.checkResult();
//             }
//         } else { //if no, continue to dealer play.
//             game.dealer.dealerPlay(); //have the dealer play
//             game.checkResult();
//         }

//         //end the hand, flush the cards
//         game.flush();
//         //end of this round, run play again?
//         var choice = confirm('play again?');

//         if(choice === true){
//             round();
//         }
// };


