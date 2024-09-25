(function() {
  'use strict';

  window.module.GameCardComponent = (function() {
    class GameCardComponent {
      constructor(imageURL) {
        this.createElement(imageURL)
        this.imageURL = imageURL; // TODO.
        this.guessed = false;
        this.opened = false;
      }

      // # Public API
      close() {
        this.element.classList.remove(gameCardCSSClassOpenedModifier);
        this.opened = false;
        this.element.textContent = ''; // TODO.
      }

      getElement() {
        return this.element;
      }

      markAsGuessed() {
        this.element.classList.add(gameCardCSSClassGuessedModifier);
        this.guessed = true;
        this.element.removeEventListener('click', this.openCardFn);
        this.openCardFn = null;
      }

      open() {
        this.element.classList.add(gameCardCSSClassOpenedModifier);
        this.opened = true;
        this.element.textContent = this.imageURL; // TODO.
        if (this.openCallback) {
          this.openCallback();
        }
      }

      subscribeToOpen(openCallback) {
        this.openCallback = openCallback;
      }

      unsubscribeToOpen() {
        this.openCallback = null;
      }

      // # Private
      createElement(imageURL) {
        const element = this.element = document.createElement('article');
        element.classList.add(gameCardCSSClass);
        element.dataset.imageURL = imageURL;
        this.openCardFn = this.openCard.bind(this);
        element.addEventListener('click', this.openCardFn);
      }

      openCard() {
        this.open();
      }
    }

    return GameCardComponent
  })();

  const gameCardCSSClass = 'app-game-card';
  const gameCardCSSClassGuessedModifier = 'app-js-game-card_guessed';
  const gameCardCSSClassOpenedModifier = 'app-js-game-card_opened';
})();
