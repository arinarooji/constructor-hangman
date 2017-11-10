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

inquirer.prompt([question]).then(response => {
  Game(response);
});

function Game(response) {
    var response = new Letter(response.letter, randomWord);
    progress = response.check();
    if (progress.includes('_')) {
        console.log('Guesses remaining: ', guesses);
        console.log(progress);
    }
    else {
        score++;
        correctIndices = [];
        randomWord = Word();
        console.log(progress, ', Great job! Current score: ', score);
        console.log('Next word...');
    }
    inquirer.prompt(question).then(response => {
        Game(response);
    });
}

//Word:  Used to create an object representing the current word the user is attempting to guess. This should contain word specific logic and data.
function Word() {
    var wordArray = ['hello', 'hi', 'red'];
    var randomIndex = Math.floor(Math.random() * wordArray.length);
    return wordArray[randomIndex];
}

//Letter:  Used for each letter in the current word. Each letter object should either display an underlying character, or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. This should contain letter specific logic and data.
function Letter(letter, word) {
    this.letter = letter;
    this.word   = word;
    
    //Check() method: iterates through word and checks if it contains the letter guessed.
    this.check  = () => {
        var splitter = this.word.split('');
        for (var i = 0; i < this.word.length; i++) {
            //True? Retain letter and store index correctly guessed
            if(this.letter === splitter[i]) {
                splitter[i] = this.letter;
                correctIndices.push(i);
            }
            //Else if index not correctly guessed before, replace index with underscore
            else if(!correctIndices.includes(i)) {
                splitter[i] = ' _ ';
            }
        }
        this.word = splitter.join('');
        return this.word;
    }
}