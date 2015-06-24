# BlackJack #

## User Stories ##
1. When starting the app, I want to see a title screen with a start button.
2. Once Game is started, I want to see my balance in $.
3. I want a way to bet in different chip denominations, $1, $5, $25, $100, $500.
4. When I place a bet, I want to see my balance update.
5. I want a way to cancel my bet.
6. Once my bet is placed, I want to see a deal button that would start the current hand.
7. I want to see both my cards.
8. I want to see one of the dealers cards.
9. I want to see two buttons, a hit and a stand.
10. If I hit, I want to get anohter card.
11. If I stand I want to see the dealers hand.
12. at the end of each hand I want to see the result of the hand.
13. I want my winnings to stay on the table as the next bet.
14. I want the option to play another hand.

##Program Structure##
Build a Deck
A deck is an array of card objects. Each Deck with have 52 cards
Each card is an object. It has suit, face_value, numeric_value, and visibility, initially set to false (hidden)

###Hand###
Object, build with a constructor, protoype behaviors

Attributes
+is an object (?)
+It has an array to hold cards
+variable to hold the bet
+insurance, boolean to play with insurance
+surrender, boolean to allow surrender

Behaviors
+Stand, do add any cards to the array, proceed to check
+hit, add a card to the array, check for a bust
+double, multiply the bet by 2, hit with another card, check for a bust
+surrender, dive the bet by 2, end the hand
+split, special case, if the array has two hands with the same value, split will create will create two new hands, passing one card from this hand to start that hand and getting a new random card from the deck. (maybe this should be a function of the game object)
+function to find the value of of the cards in the array
+check natural, see if the value of the cards is equal to 21
+checkbust, see if the value is greater than 21. return a bust if it is, maybe set the value to zero?
!think about how to hand the ace in each function

##BlackJackGame##
Object, single instance

Attributes
+shoe, and array to hold decks of cards
+an array of hands? player hand, dealer hand
+discard, and array to hold discarded cards

Behaviors
+shuffle shoe, shuffle the deck array
+playHand, runs through the game play, the following functions
+deal the cards, give the player and user alternating cards, 
+user play, allow the user to play, should call dealer play when finished
+check insurance, if the dealers first card is an ace, offer insurance to the player, proceed with play.
+a natural, if the user has a natural, game is over unless the dealer also has a natural. continue play.
+dealer play, hit until dealer gets 17 or bust.
+checkoutcome, see who won, if user winds double the bet and run the next hand. If the dealer won set the bet to 0.
+clear hand, remove all the cards from the player and dealers hand, add them to the discard pile.

##HTML Structure##
+wrapper div, screen dimension? 1400 by 800
+title div, absolute position in the top corner?

on start screen
+div in center of page
+checkbox for insurance
+checkbox for surrender








