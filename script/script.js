'use strict';
/**
 *
 *
 *    PIG GAME (ROLE DICE)
 *
 * By Alexander Pekker
 *
 *
 */

// State
let whoIsPlaying = 1;
let player1score = 0;
let player2score = 0;
let currentScore = 0;
let dice = 0;

// Player 1
const player1Section = document.querySelector('.player-0');
const player1ScoreP = document.querySelector('#score--0');
const player1CurrentScoreP = document.querySelector('#current--0');
// Player 2
const player2Section = document.querySelector('.player-1');
const player2ScoreP = document.querySelector('#score--1');
const player2CurrentScoreP = document.querySelector('#current--1');

// IMGS DICE
const diceImg = document.querySelector('.dice');
diceImg.classList.add('hidden');

// Buttons
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const roleDice = () => {
    return 1 + Math.trunc(Math.random() * 6);
};

// Working with Classes
const addClass = (component, cls) => {
    if (!component.classList.contains(cls)) {
        component.classList.add(cls);
    }
};

const removeClass = (component, cls) => {
    if (component.classList.contains(cls)) {
        component.classList.remove(cls);
    }
};

const setWinnerPlayer = (winnerSection, playerScore) => {
    addClass(winnerSection, 'player--winner');

    if (whoIsPlaying === 1) {
        player1ScoreP.textContent = String(playerScore);
        player1CurrentScoreP.textContent = String(0);
    } else {
        player2ScoreP.textContent = String(playerScore);
        player2CurrentScoreP.textContent = String(0);
    }

    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
    diceImg.classList.add('hidden');
};

const switchToPlayer = (player, playerScore) => {
    currentScore = 0;
    if (player === 1) {
        whoIsPlaying = 1;
        removeClass(player2Section, 'player--active');
        addClass(player1Section, 'player--active');
        player2ScoreP.textContent = String(
            +player2ScoreP.textContent + playerScore
        );
        player2CurrentScoreP.textContent = 0;
    } else if (player === 2) {
        whoIsPlaying = 2;
        removeClass(player1Section, 'player--active');
        addClass(player2Section, 'player--active');
        player1ScoreP.textContent = String(
            +player1ScoreP.textContent + playerScore
        );
        player1CurrentScoreP.textContent = 0;
    }
};

// Buttons Handlers
const newGameClickHandler = (event) => {
    whoIsPlaying = 1;
    player1score = 0;
    player2score = 0;
    currentScore = 0;
    dice = 0;

    player1ScoreP.textContent = player1score;
    player1CurrentScoreP.textContent = currentScore;
    player2ScoreP.textContent = player2score;
    player2CurrentScoreP.textContent = currentScore;
    rollDiceBtn.disabled = false;
    holdBtn.disabled = false;

    addClass(diceImg, 'hidden');
    addClass(player1Section, 'player--active');
    removeClass(player2Section, 'player--active');
    removeClass(player1Section, 'player--winner');
    removeClass(player2Section, 'player--winner');
};

const holdClickHandler = (event) => {
    if (whoIsPlaying === 1) {
        player1score += currentScore;

        // Player 1 Wins
        if (player1score >= 100) {
            setWinnerPlayer(player1Section, player1score);
        } else {
            // Switch PLayer 2
            switchToPlayer(2, currentScore);
        }
    } else if (whoIsPlaying === 2) {
        player2score += currentScore;

        if (player2score >= 100) {
            setWinnerPlayer(player2Section, player2score);
        } else {
            // Switch PLayer 1
            switchToPlayer(1, currentScore);
        }
    }
};

const rollDiceClickHandle = (event) => {
    dice = roleDice();
    diceImg.src = `../img/dice-${dice}.png`;
    removeClass(diceImg, 'hidden');

    if (dice === 1) {
        switchToPlayer(whoIsPlaying === 1 ? 2 : 1, 0);
    } else {
        currentScore += dice;

        if (whoIsPlaying === 1) {
            player1CurrentScoreP.textContent = currentScore + '';
        } else {
            player2CurrentScoreP.textContent = currentScore + '';
        }
    }
};

holdBtn.addEventListener('click', holdClickHandler);
newGameBtn.addEventListener('click', newGameClickHandler);
rollDiceBtn.addEventListener('click', rollDiceClickHandle);
