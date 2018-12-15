// ==========================================================================
// GLOBAL VARIABLES
// ==========================================================================
//The computer is going to choose randomly an element of an array of drinks at the beginning of the game
var drinks = ["martini", "mojito", "cosmopolitan", "caipirinha", "sidecar",
"negroni", "margarita", "daiquiri", "manhattan", "gimlet", "sazerac", "screwdriver",
"americano", "bellini", "mimosa"];
var randomDrink = null;
var drinkIndex;
//We need a variable of letters to check that the user presses only letters
var letters = /^[A-Za-z]+$/;
//We need a counter to display the number of times the user wins 
var wins = 0;
//When the game starts you have 12 guesses
var guesses = 12;
//When the user wins the image displayed changes, so we need an array of images of each drink
var drinkImg = ["assets/images/mojito.jpeg", "assets/images/martini.png", "assets/images/cosmopolitan.jpg", "assets/images/caipirinha.jpg",
"assets/images/sidecar.png", "assets/images/negroni.jpg", "assets/images/margarita.jpg", "assets/images/daiquiri.jpg",
"assets/images/manhattan.jpg", "assets/images/gimlet.jpg", "assets/images/sazerac.jpg", "assets/images/screwdriver.jpg", 
"assets/images/americano.jpg", "assets/images/bellini.jpg", "assets/images/mimosa.jpg"];
//The stats are written to the screen
var winCount = document.getElementById("wins");
var drinkChosen = document.getElementById("drink");
var guessesCount = document.getElementById("guessesLeft");
var userChoice = document.getElementById("guessLetter");
var drinkImage = document.getElementById("drinkPic");
var image = document.getElementById("drinkPic");
// ==========================================================================
//GAME OBJECT
// ==========================================================================
var game = {
    //The randomly chosen drink is going to be transformed to an array of strings
    "drinkArray": [],
    //Based on the number of letters of the state, 
    //the screen shows the same number of - to be replaced when the
    //user guesses a correct letter. We need two variables to do that, an array and a string
    "screenWordArray": [],
    "screenWord": {},
    //The screen will also display the letters that don't belong in the word picked by the computer
    "guessIncorrect": [],
    //Update initial stats
    updateStats: function() {
    winCount.textContent = "Your Wins: " + wins;
    drinkChosen.textContent = this.screenWord;
    guessesCount.textContent = "Number of Guesses Remaining: " + guesses;
    userChoice.textContent = "Letters Already Guessed: " + this.guessIncorrect;
    },
    //At the beginning of each game a new word is picked randomly
    chooseDrink: function() {
        randomDrink = drinks[(Math.floor(Math.random() * drinks.length))];
        drinkIndex = drinks.indexOf(randomDrink);
        this.drinkArray = randomDrink.split("");

        for (var i=0; i<this.drinkArray.length; i++) {
        this.screenWordArray.push("-");
        }

        this.screenWord = this.screenWordArray.join(' ');
    },
    //After game ends (because the user lost or won), thisfunction reset the counter and the word
    resetStats: function() {
        guesses = 12;
        this.drinkArray = [];
        this.screenWordArray = [];
        this.guessIncorrect = [];
    },
    //Function called when user presses a letter included in the random word
    correctLetter: function(param) {
        for (var j=0; j<this.drinkArray.length; j++){
            if (param == this.drinkArray[j]) {
                    this.screenWordArray.splice(j,1,param);
                }
            }
            this.screenWord = this.screenWordArray.join(' ');
            this.updateStats();
    },
    //Function called when user presses a letter not included in the random word
    wrongLetter: function(param) {
        guesses--;
        this.guessIncorrect.push(param);
        this.updateStats();
    },
    //Function called when user guesses the word
    winGame: function() {
        alert("You won!");
        //drinkImage.src = "martini.png";
        //this.screenWord;
        wins++;
        this.resetStats();
        this.chooseDrink();
        this.updateStats(); 
    },
    //Function called when user runs out of guesses
    lostGame: function() {
        alert("You lost! The correct answer was " + randomDrink);
        this.resetStats();
        this.chooseDrink();
        this.updateStats();
    },
    //Function to change image when user wins
    changeImage: function() {
        drinkImage.src = drinkImg[drinkIndex];
    }
};

// ==========================================================================
// FUNCTIONS
// ==========================================================================
//Game starts with computer picking a word
game.chooseDrink();
//And we send the info to the screen so the user can start the game
game.updateStats();
// Then the user chooses a letter, 
document.onkeyup = function(event) {
    var key = event.key.toLowerCase();
    //This function checks that the letter is included in the computer word
    if (key.match(letters)) {
        //If word is still incomplete and there are guesses left, execute
        if ((game.screenWordArray.includes("-") == true) && (guesses > 0)) {
            //If the letter pressed belongs to the word execute
            if (game.drinkArray.includes(key) == true) {
                //If the user hits a letter already chosen
                if (game.screenWordArray.includes(key)){
                    alert("You've already chose that lettet");
                } else {
                //else execute function to fill the word with the correct letter
                    game.correctLetter(key);
                }
                //If letter is not included in the word, # of guesses go down
            } else if (game.drinkArray.includes(key) == false) {
                if (game.guessIncorrect.includes(key)){
                    alert("You've already chose that lettet");
                } else {
                game.wrongLetter(key);
            }
            }
            //If user guesses all the letters execute the winning function
        }   else if (game.screenWordArray.includes("-") == false) {
            game.changeImage();
            game.winGame();
            //If not and he ran out of guesses, execute the loosing function
        }   else if (guesses === 0) {
            game.lostGame();
        }

        
    } else {
        //If user presses a key that is not a letter, alert him
        alert("Please press only letters");
    }
};