'use strict';

// Malte 
const winScore = 100;

const score0Element = document.getElementById('score1');
const score1Element = document.getElementById('score2');
const playerZero = document.querySelector('.player1');
const playerOne = document.querySelector('.player2');
const playerZeroScores = document.getElementById('current1');
const playerOneScores = document.getElementById('current2');

const diceImg = document.querySelector('.dice');
const newGame = document.querySelector('.btnNew');
const rollDice = document.querySelector('.btnRoll');
const holdDice = document.querySelector('.btnHold');

let scores, currentScore, activePlayer, playing;

// Christopher

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  playerZeroScores.textContent = 0;
  playerOneScores.textContent = 0;
  diceImg.classList.add('hidden');
  playerZero.classList.remove('playerWinner');
  playerOne.classList.remove('playerWinner');
  playerZero.classList.add('playerActive');
  playerOne.classList.remove('playerActive');
};

init();

// Kevin

const playerSwitching = function () {
  document.getElementById(`current${activePlayer + 1}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerZero.classList.toggle('playerActive');
  playerOne.classList.toggle('playerActive');
};

rollDice.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    diceImg.src = `images/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current${activePlayer + 1}`).textContent =
        currentScore;
    } else {
      playerSwitching();
    }
  }
});

// Maksym

holdDice.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score${activePlayer + 1}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= winScore) {
      playing = false;
      document
        .querySelector(`.player${activePlayer + 1}`)
        .classList.add('playerWinner');
      document
        .querySelector(`.player${activePlayer + 1}`)
        .classList.remove('playerActive');
      diceImg.classList.add('hidden');
      
      // Display winner popup
      const winnerPopup = document.createElement('div');
      winnerPopup.classList.add('winner-popup');
      winnerPopup.textContent = `Player ${activePlayer + 1} wins!`;
      document.body.appendChild(winnerPopup);
    } else {
      playerSwitching();
    }
  }
});

// Christopher

newGame.addEventListener('click', function () {
  const winnerPopup = document.querySelector('.winner-popup');
  if (winnerPopup) {
    winnerPopup.remove();
  } 

  init();
});


newGame.addEventListener('click', init);
