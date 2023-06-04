function getComputerChoice(){
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

function playRound(playerSelection, computerSelection){
    let playerChoice = playerSelection.toLowerCase();

    if (playerChoice == computerSelection){
        return "It's a draw!";
    }
    else if ((playerChoice == 'rock' && computerSelection == 'scissors') ||
             (playerChoice == 'paper' && computerSelection == 'rock') ||
             (playerChoice == 'scissors' && computerSelection == 'paper'))
    {
            
        return `You win! ${playerChoice} beats ${computerSelection}`;
    } 
    else{
        return `You lose! ${computerSelection} beats ${playerChoice}`;

    }

}

const playerChoice = 'scissors';
const computerChoice = getComputerChoice();

console.log(playRound(playerChoice, computerChoice)); 

function game(){
    let player_count = 0;
    let computer_count = 0; 
    for (let i = 0; i < 5; i++){
        let playerChoice = prompt("Enter a choice (rock/paper/scissors):");
        let computerChoice = getComputerChoice(); 
        let getWinner = playRound(playerChoice, computerChoice); 
        if (getWinner.includes("win")){
            player_count += 1;
        }
        else if (getWinner.includes("lose")){
            computer_count += 1; 
        }

    }
    
    if (player_count == computer_count && player_count > 0){
        return `It's a tie ${player_count} - ${computer_count}`;
    }
    else if (player_count < computer_count){
        return `You lose ${player_count} - ${computer_count}`;
    }
    else{
        return `You win ${player_count} - ${computer_count}`;
    }

}
