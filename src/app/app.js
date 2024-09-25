(function () {
  'use strict';

  // # Modules
  const {
    GameBoard,
    GameBoardComponent,
    GameCardComponent,
    ImagesList,
  } = window.module;


  // # Configuration
  const gameRootHTMLIdentifier = 'app-js-game';


  // # Game
  let boardIsLocked = false;
  let card1 = null;
  let card2 = null;

  createBoard();

  // ## Functions
  function createBoard() {
    const images = GameBoard.createImagesList(ImagesList);
    const gameRootElement = document.getElementById(gameRootHTMLIdentifier);
    const gameBoardComponent = new GameBoardComponent();
    const gameBoardElement = gameBoardComponent.getElement();
    images.forEach(image => {
      const gameCardComponent = new GameCardComponent(image);
      gameCardComponent.subscribeToOpen(() => {
        selectCard(gameBoardComponent, gameCardComponent);
      });
      const gameCardElement = gameCardComponent.getElement();
      gameBoardElement.appendChild(gameCardElement);
    });
    gameRootElement.appendChild(gameBoardElement);
  }

  function selectCard(gameBoardComponent, gameCardComponent) {
    if (boardIsLocked || gameCardComponent === card1) return;

    if (!card1) {
      card1 = gameCardComponent;
    } else {
      card2 = gameCardComponent;
      gameBoardComponent.lock();
      boardIsLocked = true;

      checkForMatch(gameBoardComponent, card1, card2);
    }
  }

  function checkForMatch(gameBoardComponent, card1, card2) {
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
      resetBoard(gameBoardComponent);
    }, 1000);
  }

  function resetBoard(gameBoardComponent) {
    gameBoardComponent.unlock();
    boardIsLocked = false;
    card1 = null;
    card2 = null;
  }
})();
