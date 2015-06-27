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

        game.round();
		
	});

	var bet_buttons = document.getElementsByTagName('bet_buttons');

	bet_buttons.addEventListener("click", function(){
		//bet!
		//if 1 is pushed, increase a players bet by 1, and so on!

	});
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

