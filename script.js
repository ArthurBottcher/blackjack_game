//create a balck jack game
//config to use fa icons
const icons = {
    'spades': '♠',
    'clubs': '♣',
    'hearts': '♥',
    'diamonds': '♦'
};

//create a div and start the game
var game = document.createElement("div");
game.id = "game";
document.body.appendChild(game);

//create a title of the game
var title = document.createElement("h1");
title.textContent = "Black Jack";
game.appendChild(title);


//create a div for the player
var player = document.createElement("div");
player.id = "player";
game.appendChild(player);

//create a div for the dealer
var dealer = document.createElement("div");
dealer.id = "dealer";
game.appendChild(dealer);

//create a div for the deck
var deck = document.createElement("div");
deck.id = "deck";
game.appendChild(deck);

//create a div for the score
var score = document.createElement("div");
score.id = "score";
game.appendChild(score);

//create a div for the buttons
var buttons = document.createElement("div");
buttons.id = "buttons";
game.appendChild(buttons);

//create a div for the message
var message = document.createElement("div");
message.id = "message";
game.appendChild(message);

//create the deck full of cards
var deck = [];
var suits = ["hearts", "diamonds", "spades", "clubs"];
//create the cards
for (var i = 0; i < suits.length; i++) {
    for (var j = 1; j <= 13; j++) {
        var card = {
        suit: suits[i],
        value: j
        };
        deck.push(card);
    }
}

//function to shuffle the deck
function shuffle(array) {
    //randomize the array
    for (var i = array.length - 1; i > 0; i--) {
        //pick a random index
        var j = Math.floor(Math.random() * (i + 1));
        //swap the cards
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var playerHand = [];
var dealerHand = [];
var playerScore = 0;
var dealerScore = 0;

//function to deal the cards
function deal() {
    deck = shuffle(deck);
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    return [playerHand, dealerHand];
}

//create a deal button into buttons div
var dealButton = document.createElement("button");
dealButton.id = "deal";
dealButton.innerHTML = "Deal";
buttons.appendChild(dealButton);

//create a reset button into buttons div
var resetButton = document.createElement("button");
resetButton.id = "reset";
resetButton.innerHTML = "Reset";
resetButton.style.display = "none";
buttons.appendChild(resetButton);

//create a finish button into buttons div
var finishButton = document.createElement("button");
finishButton.id = "finish";
finishButton.innerHTML = "Finish";
finishButton.style.display = "none";
buttons.appendChild(finishButton);

//add an event listener to the deal button
dealButton.addEventListener("click", function() {
    finishButton.style.display = "block";
    message.innerHTML = "";
    player.innerHTML = "";
    dealer.innerHTML = "";

    //deal the cards
    var hands = deal();
    var playerHand = hands[0];
    var dealerHand = hands[1];

    //create the player hand
    //add subtitle to player div
    var playerSubtitle = document.createElement("h3");
    playerSubtitle.innerHTML = "Your Hand:";
    player.appendChild(playerSubtitle);

    for (var i = 0; i < playerHand.length; i++) {
        var card = playerHand[i];
        console.log(card)
        var cardElement = document.createElement("div");
        cardElement.className = "card " + card.suit;
        cardElement.innerHTML = card.value==1 ? "A" : card.value;
        cardElement.innerHTML += icons[card.suit];
        player.appendChild(cardElement);

        player.style.display = "flex";
        player.style.flexDirection = "row";
        player.style.justifyContent = "flex-start";
        player.style.alignItems = "center";
        player.style.flexWrap = "wrap";
        player.style.marginBottom = "10px";

        //create the score
        playerScore = getScore(playerHand);
        dealerScore = getScore(dealerHand);
        score.innerHTML = "You: " + playerScore;

        //check for blackjack
        if (playerScore == 21 && dealerScore != 21) {
            createDealerHand();
            showTotalScore();

            message.innerHTML = "You got a blackjack! <br>";

            dealButton.style.display = "none";
            finishButton.style.display = "none";
            resetButton.style.display = "block";

            var gif = document.createElement("img");
            gif.src = "https://media.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif";
            message.appendChild(gif);

        } else if (dealerScore == 21 && playerScore != 21) {
            createDealerHand();
            showTotalScore();

            message.innerHTML = "Dealer got a blackjack! <br>";

            dealButton.style.display = "none";
            finishButton.style.display = "none";
            resetButton.style.display = "block";

            var gif = document.createElement("img");
            gif.src = "https://media.giphy.com/media/cr9vIO7NsP5cY/giphy.gif";
            message.appendChild(gif);

        }else if(playerScore == 21 && dealerScore == 21){
            message.innerHTML = "It's tie!";

            dealButton.style.display = "none";
            finishButton.style.display = "none";
            resetButton.style.display = "block";
        }

        //check for bust
        if (playerScore > 21 && dealerScore != 21) {
            createDealerHand();
            showTotalScore();
            message.innerHTML = "You busted!<br>";

            dealButton.style.display = "none";
            finishButton.style.display = "none";
            resetButton.style.display = "block";

        var gif = document.createElement("img");
            gif.src = "https://media.giphy.com/media/cr9vIO7NsP5cY/giphy.gif";
            message.appendChild(gif);


        } else if(dealerScore > 21 && playerScore != 21 ) {
            createDealerHand();
            showTotalScore();
            message.innerHTML = "Dealer busted! <br>";

            dealButton.style.display = "none";
            finishButton.style.display = "none";
            resetButton.style.display = "block";

            var gif = document.createElement("img");
            gif.src = "https://media.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif";
            message.appendChild(gif);

        }
    }
});

function createDealerHand() {
    dealer.innerHTML = "";

    var dealerSubtitle = document.createElement("h3");
    dealerSubtitle.innerHTML = "Dealer Hand:";
    dealer.appendChild(dealerSubtitle);


    for (var i = 0; i < dealerHand.length; i++) {
        var card = dealerHand[i];
        console.log(card)
        var cardElement = document.createElement("div");
        cardElement.className = "card " + card.suit;
        cardElement.innerHTML = card.value;
        cardElement.innerHTML += icons[card.suit];

        dealer.appendChild(cardElement);
        dealer.style.display = "flex";
        dealer.style.flexDirection = "row";
        dealer.style.justifyContent = "flex-start";
        dealer.style.marginBottom = "10px";
    }
}

function showTotalScore(){
    // score.innerHTML = "You: " + playerScore + " Dealer: " + dealerScore;
    score.innerHTML = `You: ${playerScore} Dealer: ${dealerScore}`;
}


function finish() {
    createDealerHand();

    dealButton.style.display = "none";
    resetButton.style.display = "block";
    finishButton.style.display = "none";

    score.innerHTML = "You: " + playerScore + " Dealer: " + dealerScore;

    //check for winner
    console.log(playerScore, dealerScore);
    if (playerScore > dealerScore) {
        console.log("You win!");
        message.innerHTML = "You win!";
    }
    else if (playerScore < dealerScore) {
        message.innerHTML = "Dealer wins!";
        console.log("Dealer wins!");

    }else{
        message.innerHTML = "It's a tie!";
        console.log("It's a tie!");
    }
}

function reset() {
    message.innerHTML = "";
    player.innerHTML = "";
    dealer.innerHTML = "";
    score.innerHTML = "";

    playerScore = 0;
    dealerScore = 0;

    playerHand = [];
    dealerHand = [];

    dealButton.style.display = "block";
    resetButton.style.display = "none";

    console.log(dealerHand)

}


//add an event listener to the finish button
finishButton.addEventListener("click", function() {
    finish();
});




//add an event listener to the reset button
resetButton.addEventListener("click", function() {
   reset()

});



//function to get the score of a hand
function getScore(hand) {
    var score = 0;
    for (var i = 0; i < hand.length; i++) {
        var card = hand[i];
        if (card.value == 1) {
            score += 11;
        } else if (card.value > 10) {
            score += 10;
        } else {
            score += card.value;
        }
    }
    //check for aces
    for (var i = 0; i < hand.length; i++) {
        var card = hand[i];
        if (card.value == 1 && score > 21) {
            score -= 10;
        }
    }
    return score;
}
