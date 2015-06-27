//run the dom!
window.onload = function() {
	var w = document.getElementById('wrapper').offsetWidth;
	var h = document.getElementById('wrapper').offsetHeight;

	console.log("app.js built")
	//add a click
	var newGame = document.getElementById('newGame');
	newGame.addEventListener("click", function(){
		
		newGame.className = 'play_screen';

		//build the options selector
		var menu = document.getElementById('menu');
		menu.className = "";
		menu.style.left = w/2-150 + "px";
		menu.style.top = h/2-250+ "px";	
	});

	var start = document.getElementById('start_game');
	start.addEventListener("click", function() {
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

        game.round();
    
		//pass this info to the game and startgame function
	});
	

};