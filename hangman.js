//Inquirer NPM required
var inquirer = require('inquirer');

//Word progress, score count, guess count
var progress = '', score = 0, guesses = 15;

//Track where user correctly guessed letters in a word
var correctIndices = [];

//Generate random word
var randomWord = Word();

//Inquirer prompt object
var question = { type: 'input', message: 'Guess a letter!', name: 'letter', default: 'a' }

//Receive user input, then...(promise) invoke Game() with user response
inquirer.prompt([question]).then(response => { Game(response); });

//Game: Takes an inquirer response
function Game(response) {
    //Creates a new letter object with response.letter and the current randomWord (for comparison)
    response = new Letter(response.letter, randomWord);
    //Progress gets the result of response.check(), which returns an updated string with the user's guess factored in
    progress = response.check();

    //If user's letter guess (response.letter) is not in the randomWord, decrement guesses
    if (!randomWord.includes(response.letter.toUpperCase())) guesses--;

    //Log guessesRemaining and user's progress
    console.log('Guesses remaining: ', guesses);
    console.log(progress);

    //FIX THIS REPETITION======================
    //If the progress string has no more underscores, increment score and generate new randomWord
    if (progress === randomWord) {
        score++;
        guesses = 15;
        correctIndices = [];
        randomWord = Word();
        console.log('Great job! Current score:', score);
        console.log('Next word...');
    }
    //Else if user has no more guesses, decrement score and generate new random word
    else if (guesses < 1) {
        score--;
        guesses = 15;
        correctIndices = [];
        randomWord = Word();
        console.log('Out of guesses :( Current score:', score);
        console.log('Next word...');
    }
    //FIX THIS REPETITION======================

    //Prompt user for next letter guess, invoke Game() with user response
    inquirer.prompt(question).then(response => { Game(response); });
}

//Word: Generates and returns a random word
function Word() {
    var wordArray = ['LIZARD', 'BEAR', 'SQUID', 'CAMEL', 'TURTLE', 'FOX', 'OSTRICH', 'PLATYPUS', 'CROCODILE', 'KANGAROO', 'BANDICOOT'];
    var randomIndex = Math.floor(Math.random() * wordArray.length);
    return wordArray[randomIndex];
}

//Letter: Takes in a letter and a word. Check method compares letter to all letters within the word
function Letter(letter, word) {
    this.letter = letter;
    this.word   = word;
    //Check() method: iterates through word and checks if it contains the letter guessed.
    this.check  = () => {
        var splitWord = this.word.split('');
        for (var i = 0; i < this.word.length; i++) {
            //True? Retain letter and store index correctly guessed
            if(this.letter.toUpperCase() === splitWord[i]) {
                splitWord[i] = this.letter.toUpperCase();
                correctIndices.push(i);
            }
            //Else if index not correctly guessed before, replace index with underscore
            else if(!correctIndices.includes(i)) splitWord[i] = ' _ ';
        }
        return this.word = splitWord.join(''); //Return updated string
    }
}