(function () {
  'use strict';

  // # Modules
  const {
    GameBoard,
    GameCardComponent,
  } = window.module;


  // # Configuration
  const gameHTMLIdentifier = 'app-js-game';
  const imagesList = ['🍎', '🍌', '🍒'];


  // # Game
  let boardIsLocked = false;
  let card1 = null;
  let card2 = null;

  createBoard();

  // ## Functions
  function createBoard() {
    const gameBoardElement = document.getElementById(gameHTMLIdentifier);
    const images = GameBoard.shuffle([...imagesList, ...imagesList]);
    images.forEach(image => {
      const gameCardComponent = new GameCardComponent(image);
      gameCardComponent.subscribeToOpen(() => {
        selectCard(gameCardComponent);
      });
      const gameCardElement = gameCardComponent.getElement();
      gameBoardElement.appendChild(gameCardElement);
    });
  }

  function selectCard(gameCardComponent) {
    if (boardIsLocked || gameCardComponent === card1) return;

    if (!card1) {
      card1 = gameCardComponent;
    } else {
      card2 = gameCardComponent;
      boardIsLocked = true;

      checkForMatch(card1, card2);
    }
  }

  function checkForMatch(card1, card2) {
    const isMatch = card1.imageURL === card2.imageURL;
    setTimeout(() => {
      if (isMatch) {
        card1.markAsGuessed();
        card2.markAsGuessed();
        card1.unsubscribeToOpen();
        card2.unsubscribeToOpen();
      } else {
        card1.close();
        card2.close();
      }
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    boardIsLocked = false;
    card1 = null;
    card2 = null;
  }


  // # Auxiliary functions
})();
