(function () {
  'use strict';

  window.module.GameBoard = (function () {
    const GameBoard = Object.create(null);

    GameBoard.createImagesList = function (images, multiplier) {
      multiplier = 2; // TODO.
      let list = [];
      while (multiplier--) {
        list = list.concat(images);
      }
      return GameBoard.shuffleImages(list);
    };

    GameBoard.shuffleImages = function (images) {
      return images.sort(() => 0.5 - Math.random());
    };

    return GameBoard;
  })();
})();
