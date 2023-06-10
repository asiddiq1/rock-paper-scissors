function getComputerChoice(){
    //randomly selects computer choice
    let choice = Math.floor(Math.random() * 3);

    if (choice == 0){
        return 'rock';
    }
    else if (choice == 1){
        return 'paper';
    }
    else{
        return 'scissors';
    } 

}

function playRound(playerChoice, computerSelection){
    //plays single round and updates text whether user won or lost
    let getWinnerNote = document.querySelector('.winner_note');
    let winnerText = null;

    if (playerChoice == computerSelection){
        winnerText = `It's a draw! ${playerChoice} ties ${computerSelection}.`;
    }
    else if ((playerChoice == 'rock' && computerSelection == 'scissors') ||
             (playerChoice == 'paper' && computerSelection == 'rock') ||
             (playerChoice == 'scissors' && computerSelection == 'paper'))
    {
            
        winnerText = `You win! ${playerChoice} beats ${computerSelection}.`;
    } 
    else{
        winnerText = `You lose! ${computerSelection} beats ${playerChoice}.`;

    }
    getWinnerNote.textContent = winnerText; //updates note whether user won or lost
    return winnerText;


}

function toggleChoices(computerChoice, playerChoice, count){
    //toggles highlights choices
    let removeSelection = Array.from(document.querySelectorAll('ul li i')); 
    for (const selection of removeSelection){
        selection.classList.remove('computer-active'); 

    }
    
    let comp = document.querySelector(`.computer-rps .${computerChoice}`);
    comp.classList.add('computer-active'); //activates robot selection

    let player = document.querySelector(`.player-rps .${playerChoice}`);

    if (count == 4){      
        player.classList.add('computer-active'); //activates user selection
    }
    else{
        player.classList.toggle('computer-active'); //activates user selection
    }
   
}

function playAgain(){
    window.location.reload();
} 

const choices = document.querySelector('.player-rps');
count = 0 

function playGame(){


    choices.addEventListener("click", (event) => {
        if (event.target.nodeName != "I" || choices.disabled){
            return;
        }

        let playerChoice = event.target.getAttribute("data-option");
        let computerChoice = getComputerChoice(); //get user and robot selection

        toggleChoices(computerChoice, playerChoice, count);
        playRound(playerChoice, computerChoice); //play single round


        let getWinnerNote = document.querySelector('.winner_note');
        let score = document.querySelector('.total_score');
        let total_score = getScore(score, getWinnerNote.textContent); //get total score
        
        document.querySelector('.round').textContent = `Round: ${count + 1}`; //update round
        
        
        if (count == 4){ 
            getWinner(total_score[0], total_score[1]); //display game over
            let hide_score = document.querySelector('.score');
            hide_score.hidden = true;
            let button = document.querySelector('button');
            button.removeAttribute("hidden"); //display play again button
            choices.disabled = true;
            count = 0;
            let hovers = Array.from(document.getElementsByClassName('hover'));
            console.log(hovers);
            for (const hover of hovers){
                hover.setAttribute("class", ""); //disable hover
            }
            button.addEventListener("click", playAgain);
            return;
        }
        count += 1;
        
    });

}


function getScore(score, getWinner){
    //get current score
    let player_count = Number(score.textContent[0]);
    let computer_count = Number(score.textContent.slice(-1));


    if (getWinner.includes("win")){
        player_count += 1;
    }
    else if (getWinner.includes("lose")){
        computer_count += 1; 
    }
    score.textContent = `${player_count} - ${computer_count}`;
    return [player_count, computer_count];

}

function getWinner(player_count, computer_count){
    //updates game over text
    let gameOverNote = document.querySelector('.game_over');
    let gameOver = null;

    if (player_count == computer_count && player_count > 0){
        gameOver = `Game over! It's a tie ${player_count} - ${computer_count}.`;
    }
    else if (player_count < computer_count){
        gameOver = `Game over! You lose ${player_count} - ${computer_count}.`;
    }
    else{
        gameOver = `Game over! You win ${player_count} - ${computer_count}.`;
    }

    gameOverNote.textContent = gameOver;
    return gameOver;


}


playGame();