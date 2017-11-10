var inquirer = require('inquirer');

var progress = '';
var score = 0;
var guesses = 15;
var correctIndices = [];
var randomWord = Word();

var question = {
    type: 'input',
    message: 'Guess a letter!',
    name: 'letter',
    default: 'a'
}

//Prompt
inquirer.prompt([question]).then(response => {
  Game(response);
});

function Game(response) {
    var response = new Letter(response.letter, randomWord);
    progress = response.check();
    if (!randomWord.includes(response.letter)) guesses--;
    console.log('Guesses remaining: ', guesses);
    console.log(progress);
    if (!progress.includes('_')) {
        score++;
        correctIndices = [];
        randomWord = Word();
        console.log('Great job! Current score:', score);
        console.log('Next word...');
    }
    else if (guesses < 1) {
        score--;
        console.log("Out of guesses :( the word was", randomWord);
        console.log('Current score:', score);
        console.log('Next word...');
    }
    inquirer.prompt(question).then(response => {
        Game(response);
    });
}

//Word:  Generates a random word
function Word() {
    var wordArray = ['LIZARD', 'BEAR', 'SQUID', 'CAMEL', 'TURTLE', 'FOX', 'OSTRICH', 'PLATYPUS', 'CROCODILE', 'KANGAROO', 'BANDICOOT'];
    var randomIndex = Math.floor(Math.random() * wordArray.length);
    return wordArray[randomIndex];
}

//Letter:  Used for each letter in the current word. Each letter object should either display an underlying character, or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. This should contain letter specific logic and data.
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
            else if(!correctIndices.includes(i)) {
                splitWord[i] = ' _ ';
            }
        }
        this.word = splitWord.join('');
        return this.word;
    }
}