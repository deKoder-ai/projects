'use strict'
function randomPlayer1() {
    let player1 = null;
    if (Math.floor(Math.random() * 2) < 1) {
        player1 = '0';
    } else {
        player1 = 'X';
    }
    return player1;
}

// initialise game
const iGame = (function() {
    // initialise game array with null fill
    let sq = [];
    for (let i = 0; i < 9; i++) {
        sq[i] = null;
    }
    // set player1 randomly to x or o
    const player1 = randomPlayer1();
    document.getElementById('status').innerText = `Current Player: ${player1}`;
    const xScore = 0;
    const oScore = 0;
    document.getElementById('o-SCORE').innerText = `${oScore}`;
    document.getElementById('x-SCORE').innerText = `${xScore}`;
    return { player1, sq, xScore, oScore };
})();
// game logic

const Game = {
    player: iGame.player1,
    sq: iGame.sq,
    xScore: iGame.xScore,
    oScore: iGame.oScore,
    winner: null,
    gameOver: false,
    switchPlayer: function() {
        if (this.player === '0') {
            this.player = 'X';
        } else {
            this.player = '0';
        }
        document.getElementById('status').innerText = `Current Player: ${this.player}`;
    },
    displayChoice: function(i, value) {
        const element = document.getElementById(`board-0${i + 1}`)
        element.innerText = value;
        if (value === '0') { 
            element.style.color = 'white';
        } else {
            element.style.color = 'var(--red)';
        }
    },
    sqClick: function(i) {
        if (!this.sq[i]) {
            console.log(this.winner);
            this.sq[i] = this.player;
            this.displayChoice(i, this.player);
            this.checkWinner();
            // check for draw
            if (!this.winner && !this.sq.includes(null)) {
                document.getElementById('status').innerText = `It's a draw`;
                this.gameOver = true;
            } else if (!this.gameOver) {
                this.switchPlayer();
            }
        }
    },
    checkWinner: function() {
        function processWin(a, b, c) {
            function updateScore() {
                if (Game.winner === '0') {
                    Game.oScore ++;
                    document.getElementById('o-SCORE').innerText = `${Game.oScore}`;
                } else if (Game.winner === 'X') {
                    Game.xScore ++;
                    document.getElementById('x-SCORE').innerText = `${Game.xScore}`;
                }
            }
            function fillWinSquares(a, b, c) {
                let sq1 = document.getElementById(`board-0${a + 1}`)
                let sq2 = document.getElementById(`board-0${b + 1}`)
                let sq3 = document.getElementById(`board-0${c + 1}`)
                sq1.style.backgroundColor = 'var(--sq-hover-col)';
                sq2.style.backgroundColor = 'var(--sq-hover-col)';
                sq3.style.backgroundColor = 'var(--sq-hover-col)';
            }
            Game.gameOver = true;
            Game.winner = Game.sq[a];
            updateScore();
            fillWinSquares(a, b, c);
            document.getElementById('status').innerText = `${Game.winner} Wins!`;
        }
        function winCheck(a, b, c) {
            if (Game.sq[a]) {
                if (Game.sq[a] === Game.sq[b] && Game.sq[b] === Game.sq[c]) {
                    processWin(a, b, c);
                }
            }
        }
        // rows
        winCheck(0, 1, 2);
        winCheck(3, 4, 5);
        winCheck(6, 7, 8);
        // columns
        winCheck(0, 3, 6);
        winCheck(1, 4, 7);
        winCheck(2, 5, 8);
        // diagonals
        winCheck(0, 4, 8);
        winCheck(2, 4, 6);
    }
}

const playGame = (function() {
    // event listeners and game logic
    // reset game event handler
    function resetGame() {
        for (let i = 0; i < 9; i++) {
            Game.sq[i] = null;
            Game.displayChoice(i, null);
            let x = document.getElementById(`board-0${i + 1}`);
            x.style.backgroundColor = '';
            Game.gameOver = false;
            Game.player = randomPlayer1();
            Game.winner = null;
        }
        document.getElementById('status').innerText = `Current Player: ${Game.player}`
    }
    const resetBtn = document.getElementById('reset-game-btn');
    resetBtn.addEventListener('click', function() {
        resetGame();
    })
    // reset score event handler
    function resetScore() {
        Game.xScore = 0;
        Game.oScore = 0;
        document.getElementById('o-SCORE').innerText = `${Game.oScore}`;
        document.getElementById('x-SCORE').innerText = `${Game.xScore}`;
    }
    const resetScoreBtn = document.getElementById('reset-score-btn');
    resetScoreBtn.addEventListener('click', function() {
        resetScore();
    })
    // game play event handler
    const body = document.querySelector('body');
    body.addEventListener('click', function(e) {
        if (!Game.gameOver) {
            switch (e.target.id) {
                case 'board-01':
                    Game.sqClick(0);
                    break;
                case 'board-02':
                    Game.sqClick(1);
                    break;
                case 'board-03':
                    Game.sqClick(2);
                    break;
                case 'board-04':
                    Game.sqClick(3);
                    break;
                case 'board-05':
                    Game.sqClick(4);
                    break;
                case 'board-06':
                    Game.sqClick(5);
                    break;
                case 'board-07':
                    Game.sqClick(6);
                    break;
                case 'board-08':
                    Game.sqClick(7);
                    break;
                case 'board-09':
                    Game.sqClick(8);
                    break;
            }
        }
    })
})();