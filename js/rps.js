// rock, paper, scissors game

const body = document.querySelector('body');
const gameContainer = document.querySelector('#game_container')
const header = document.querySelector('#header')

// assign human game controls to variables
const hRockBtn = document.querySelector('#h_rock_btn');
const hPaperBtn = document.querySelector('#h_paper_btn');
const hScissorsBtn = document.querySelector('#h_scissors_btn');
// assign computer controls to var
const cRockBtn = document.querySelector('#c_rock_btn');
const cPaperBtn = document.querySelector('#c_paper_btn');
const cScissorsBtn = document.querySelector('#c_scissors_btn');

const roundNumText = document.querySelector('#round_num');
const humanScoreText = document.querySelector('#human_score');
const computerScoreText = document.querySelector('#computer_score');
const compareText = document.querySelector('#compare');
const winnerText = document.querySelector('#winner');

// global variables
let humanScore = 0;
let compScore = 0;
let roundNum = 1;
let h_selection = '';
let c_selection = '';
// let x = null

function getComputerChoice() {
    let choice = null
    let rand1to3 = Math.floor(Math.random() * 3);
    switch(rand1to3) {
        case 0:
            choice = 'Rock';
            cRockBtn.classList.toggle('c_selection');
            break;
        case 1:
            choice = 'Paper';
            cPaperBtn.classList.toggle('c_selection');
            break;
        case 2:
            choice = 'Scissors';
            cScissorsBtn.classList.toggle('c_selection');
            break;
        default:
            choice = 'Rock';
            hRockBtn.classList.toggle('c_selection');
            break;
      }
    return choice;
}

function playRound(human, computer) {
    // const human = getHumanChoice();
    // const computer = getComputerChoice();
    let winner = null
    let compare = null

    // decide winner
    if (human === 'Rock' && computer === 'Rock') {
        compare = 'Rock = Rock';
        winner = 'It\'s a draw :/';
    } else if (human === 'Rock' && computer === 'Paper') {
        compare = 'Paper beats Rock';
        winner = 'Computer wins!!';
        compScore = compScore + 1;
    } else if (human === 'Rock' && computer === 'Scissors') {
        compare = 'Rock beats Scissors';
        winner = 'You win!!';
        humanScore = humanScore + 1;
    } else if (human === 'Paper' && computer === 'Rock') {
        compare = 'Paper beats Rock';
        winner = 'You win!!';
        humanScore = humanScore + 1;
    } else if (human === 'Paper' && computer === 'Paper') {
        compare = 'Paper = Paper';
        winner = 'It\'s a draw :/';
    } else if (human === 'Paper' && computer === 'Scissors') {
        compare = 'Scissors beats Paper';
        winner = 'Computer wins!!';
        compScore = compScore + 1;
    } else if (human === 'Scissors' && computer === 'Rock') {
        compare = 'Rock beats Scissors';
        winner = 'Computer wins!!';
        compScore = compScore + 1;
    } else if (human === 'Scissors' && computer === 'Paper') {
        compare = 'Scissors beats Paper';
        winner = 'You win!!';
        humanScore = humanScore + 1;
    } else {
        compare = 'Scissors = Scissors';
        winner = 'It\'s a draw :/';
    }
    
    let gameInfo = [compare, winner];
    return gameInfo;
}

function updateGameInfo(compare, winner) {
    compareText.textContent = `${compare}`;
    winnerText.textContent = `${winner}`;
}

function removeSelectionStyling() {
    hRockBtn.classList.remove('h_selection')
    hPaperBtn.classList.remove('h_selection')
    hScissorsBtn.classList.remove('h_selection')
    cRockBtn.classList.remove('c_selection')
    cPaperBtn.classList.remove('c_selection')
    cScissorsBtn.classList.remove('c_selection')
}

function displayRndNum() {
    roundNumText.textContent = `${roundNum}`;
}

function displayScores() {
    humanScoreText.textContent = `${humanScore}`;
    computerScoreText.textContent = `${compScore}`;
}

// return value of human selector button
body.addEventListener('click', (event) => {
    let target = event.target;
    switch(target.id) {
        case 'h_rock_btn':
            displayRndNum();
            removeSelectionStyling();
            h_selection = 'Rock';
            hRockBtn.classList.toggle('h_selection');
            gameInfo = playRound(h_selection, getComputerChoice());
            updateGameInfo(gameInfo[0], gameInfo[1]);
            displayScores();
            roundNum++;
            clearAll();
            break;
        case 'h_paper_btn':
            displayRndNum();
            removeSelectionStyling();
            h_selection = 'Paper';
            hPaperBtn.classList.toggle('h_selection');
            gameInfo = playRound(h_selection, getComputerChoice());
            updateGameInfo(gameInfo[0], gameInfo[1]);
            displayScores();
            roundNum++;
            clearAll();
            break;
        case 'h_scissors_btn':
            displayRndNum();
            removeSelectionStyling();
            h_selection = 'Scissors';
            hScissorsBtn.classList.toggle('h_selection');
            gameInfo = playRound(h_selection, getComputerChoice());
            updateGameInfo(gameInfo[0], gameInfo[1]);
            displayScores();
            roundNum++;
            clearAll();
            break;
        case 'play_again_btn':
            location.reload();
    }
});

function clearAll() {
    if (humanScore >= 5 || compScore >= 5) {
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
          }
        gameContainer.style.border = 'none';

        const gameOverDiv = document.createElement('div');
        gameOverDiv.setAttribute("id", "game_over");
        let gameOverMessage = null;
        if (humanScore >= 5) {
            gameOverMessage = 'You Win!!!';
        } else {
            gameOverMessage = 'Computer Wins!!!';
        }
        gameOverDiv.textContent = `${gameOverMessage}`;
        gameContainer.appendChild(gameOverDiv);

        let finalScore = `You: ${humanScore} || Computer: ${compScore}`;
        const finalScoreDiv = document.createElement('div');
        finalScoreDiv.setAttribute('id', 'final_score');
        finalScoreDiv.textContent = finalScore;
        gameContainer.appendChild(finalScoreDiv);
        let finalRounds = `Rounds: ${roundNum}`;
        const finalRoundsDiv = document.createElement('div');
        finalRoundsDiv.setAttribute('id', 'final_score');
        finalRoundsDiv.textContent = finalRounds;
        gameContainer.appendChild(finalRoundsDiv);

        const playAgainBtnDiv = document.createElement('div');
        playAgainBtnDiv.setAttribute('id', 'play_again_div');
        const playAgainBtn = document.createElement('button');
        playAgainBtn.setAttribute('id', 'play_again_btn');
        playAgainBtn.textContent = 'Play Again?';
        playAgainBtnDiv.appendChild(playAgainBtn);
        gameContainer.appendChild(playAgainBtnDiv);
    }
}