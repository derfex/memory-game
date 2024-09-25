(function () {
  'use strict';

  window.module.GameBoardComponent = (function () {
    class GameBoardComponent {
      #element;
      #locked = false;
      #lockerElement;

      constructor() {
        this.#createElement();
      }

      // # Public API
      getElement() {
        return this.#element;
      }

      lock() {
        this.#locked = true;
        this.#lockerElement.hidden = false;
      }

      unlock() {
        this.#locked = false;
        this.#lockerElement.hidden = true;
      }

      // # Private
      #createElement() {
        const baseElement = this.#element = document.createElement('section');
        baseElement.classList.add(gameBoardCSSClass);

        const lockerElement = this.#lockerElement = document.createElement('div');
        lockerElement.classList.add(gameBoardLockerCSSClass);
        lockerElement.hidden = true;
        baseElement.appendChild(lockerElement);
      }
    }

    return GameBoardComponent;
  })();

  const gameBoardCSSClass = 'app-game-board';
  const gameBoardLockerCSSClass = 'app-game-board__locker';
})();
