var drinks = [ "martini", "mojito", "cosmopolitan", "vodka"];
var letters = /^[A-Za-z]+$/;
var randomDrink = null;
var wins = 0;
var guesses = 12;
var winCount = document.getElementById("wins");
var drinkChosen = document.getElementById("drink");
var guessesCount = document.getElementById("guessesLeft");
var userChoice = document.getElementById("guessLetter");

var game = {
   "drinkArray": [],
    "screenWordArray": [],
    "screenWord": {},
    "guessIncorrect": [],

    updateStats: function() {
    winCount.textContent = "Wins: " + wins;
    drinkChosen.textContent = this.screenWord;
    guessesCount.textContent = "Number of Guesses Remaining: " + guesses;
    userChoice.textContent = "Letters Already Guessed: " + this.guessIncorrect;
    },

    chooseDrink: function() {
        randomDrink = drinks[(Math.floor(Math.random() * 4))];
        this.drinkArray = randomDrink.split("");

        for (var i=0; i<this.drinkArray.length; i++) {
        this.screenWordArray.push("-");
        }

        this.screenWord = this.screenWordArray.join(' ');
    },

    resetStats: function() {
        guesses = 12;
        this.drinkArray = [];
        this.screenWordArray = [];
        this.guessIncorrect = [];
    },

    correctLetter: function(param) {
        for (var j=0; j<this.drinkArray.length; j++){
            if (param == this.drinkArray[j]) {
                    this.screenWordArray.splice(j,1,param);
                }
            }
            this.screenWord = this.screenWordArray.join(' ');
            this.updateStats();
    },

    wrongLetter: function(param) {
        guesses--;
        this.guessIncorrect.push(param);
        this.updateStats();
    },

    winGame: function() {
        alert("You won!");
        wins++;
        this.resetStats();
        this.chooseDrink();
        this.updateStats(); 
    },

    lostGame: function() {
        alert("You lost! The correct answer was " + randomDrink);
        this.resetStats();
        this.chooseDrink();
        this.updateStats();
    }
};

game.chooseDrink();
game.updateStats();

document.onkeyup = function(event) {
    var key = event.key.toLowerCase();

    if (key.match(letters)) {
     
        if ((game.screenWordArray.includes("-") == true) && (guesses > 0)) {

            if (game.drinkArray.includes(key) == true) {

                game.correctLetter(key);

            } else if (game.drinkArray.includes(key) == false) {
                if (game.guessIncorrect.includes(key)){
                    alert("You've already chose that lettet");
                } else {
                game.wrongLetter(key);
            }
            }

        }   else if (game.screenWordArray.includes("-") == false) {
        
            game.winGame();
       
        }   else if (guesses === 0) {
        
            game.lostGame();

        }
    } else {
        alert("Please press only letters");
    }
};