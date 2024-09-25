(function () {
  'use strict';

  window.module.GameCardComponent = (function () {
    class GameCardComponent {
      #element;
      #guessed = false;
      #openCallback = null;
      #openCardFn = null;
      #opened = false;

      constructor(imageURL) {
        this.#createElement(imageURL);
        this.imageURL = imageURL;
        this.#guessed = false;
        this.#opened = false;
      }

      // # Public API
      close() {
        this.#element.classList.remove(gameCardCSSClassOpenedModifier);
        this.#opened = false;
      }

      getElement() {
        return this.#element;
      }

      markAsGuessed() {
        this.#element.classList.add(gameCardCSSClassGuessedModifier);
        this.#guessed = true;
        this.#element.removeEventListener('click', this.#openCardFn);
        this.#openCardFn = null;
      }

      open() {
        this.#element.classList.add(gameCardCSSClassOpenedModifier);
        this.#opened = true;
        if (this.#openCallback) {
          this.#openCallback();
        }
      }

      subscribeToOpen(openCallback) {
        this.#openCallback = openCallback;
      }

      unsubscribeToOpen() {
        this.#openCallback = null;
      }

      // # Private
      #createElement(imageURL) {
        const articleElement = this.#element = document.createElement('article');
        articleElement.classList.add(gameCardCSSClass);
        this.#openCardFn = this.#openCard.bind(this);
        articleElement.addEventListener('click', this.#openCardFn);

        const imageElement = document.createElement('div');
        imageElement.classList.add(gameCardImageCSSClass);
        imageElement.style.backgroundImage = `url('${imageURL}')`;

        articleElement.appendChild(imageElement);
      }

      #openCard() {
        this.open();
      }
    }

    return GameCardComponent;
  })();

  const gameCardCSSClass = 'app-game-card';
  const gameCardCSSClassGuessedModifier = 'app-js-game-card_guessed';
  const gameCardCSSClassOpenedModifier = 'app-js-game-card_opened';
  const gameCardImageCSSClass = 'app-game-card__image';
})();
