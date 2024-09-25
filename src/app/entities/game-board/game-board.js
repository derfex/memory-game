(function () {
  'use strict';

  window.module.GameBoard = (function () {
    const GameBoard = Object.create(null);

    GameBoard.shuffle = function (images) {
      return images.sort(() => 0.5 - Math.random());
    };

    return GameBoard;
  })();
})();
