const game = {
  status: false,
  score: 0,
  cardLength: 0,
  userMaxCardLength: 50,
  userMinCardLength: 10,
  selectCardOne: null,
  selectCardTwo: null,
  numbers: [],
  foundNumbers: [],

  /**
   * Starts a new game with the given card length.
   * @param {number} cardLength The card length of the game.
   */
  start: function (cardLength) {
    document.querySelector('.header').style.display = 'none';
    document.getElementById('app-cardLengthForm').style.display = 'none';
    document.getElementById('card-table').innerText = '';
    let oneCardList = [],
      twoCardList = [];
    this.cardLength = cardLength;
    this.status = true;
    for (let index = 0; index <= cardLength; index++) {
      oneCardList.push(index);
      twoCardList.push(index);
    }
    this.numbers = [...oneCardList, ...twoCardList].sort(
      () => Math.random() - 0.5
    );

    for (let number of this.numbers) {
      document
        .getElementById('card-table')
        .insertAdjacentHTML(
          'beforeend',
          `<div class="card" onclick="${game.end}"><div class="face back"></div><div class="face front">${number}</div></div>`
        );
    }

    document.querySelector('.app-view').style.display = 'flex';
  },
  setCardElement: function (cardElement) {
    if (this.selectCardOne === null) {
      this.selectCardOne = cardElement;
    } else {
      if (this.selectCardTwo === null) {
        this.selectCardTwo = cardElement;
      }
    }
  },
  cardControl: function (card1, card2) {
    let cardOneNumber = parseInt(card1.childNodes[1].textContent);
    let cardTwoNumber = parseInt(card2.childNodes[1].textContent);
    if (cardOneNumber === cardTwoNumber) {
      console.log(cardOneNumber, cardTwoNumber);
      game.numberFound(cardOneNumber);
      this.selectCardOne = null;
      this.selectCardTwo = null;
    } else {
      this.selectCardOne = null;
      this.selectCardTwo = null;
      setTimeout(function () {
        card1.classList.remove('focus');
        card2.classList.remove('focus');
      }, 1500);
    }

    console.log(this);
  },
  numberFound: function (number) {
    this.foundNumbers.push(number);
    document
      .querySelector('#scoreBoardList')
      .insertAdjacentHTML('beforeend', `<li class="card-item">${number}</li>`);
    if (this.foundNumbers.length === this.cardLength) {
      alert('Kazandınız !');
    }
  },
  end: () => {
    document.querySelector('.header').style.display = 'none';
    document.getElementById('app-cardLengthForm').style.display = 'none';
    document.getElementById('card-table').innerText = '';
  },
};

document
  .querySelector('#userCardLength')
  .setAttribute('max', game.userMaxCardLength);
document
  .querySelector('#userCardLength')
  .setAttribute('min', game.userMinCardLength);
document
  .querySelector('#userCardLength')
  .setAttribute(
    'placeholder',
    `Min:${game.userMinCardLength} - Max:${game.userMaxCardLength}`
  );

document.querySelector('#cardLengthForm').addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.srcElement);

  const cardLength = formData.get('userCardLength');
  game.start(cardLength);

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', e => {
      card.classList.toggle('focus');
      card.classList.forEach(className => {
        if (className !== 'focus') {
          game.setCardElement(card);
        }
      });
      if (game.selectCardTwo !== null) {
        game.cardControl(game.selectCardOne, game.selectCardTwo);
      }
    });
  });
});
