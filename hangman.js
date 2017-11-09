var inquirer = require('inquirer');

inquirer.prompt([
    {
        type: 'input',
        message: 'Guess a letter',
        name: 'letter',
        default: 'a'
    }
]).then(response => {
    console.log("You guessed", response.letter);
});