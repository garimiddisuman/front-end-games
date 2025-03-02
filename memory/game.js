const shuffleArray = (colors) => {
  const cardColors = [...colors, ...colors];

  for (let i = cardColors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardColors[i], cardColors[j]] = [cardColors[j], cardColors[i]];
  }

  return cardColors;
};

const assignColorsToCards = (cardColors) => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    card.dataset.color = cardColors[index];
    card.style.backgroundColor = "gray";
  });
};

const removeAllOpenedCards = (openedCards) => {
  for (const card of openedCards) {
    card.style.backgroundColor = "gray";
    card.classList.remove("flipped");
  }

  openedCards.clear();
};

const removeMatchedCards = (openedCards) => {
  for (const card of openedCards) {
    card.style.visibility = "hidden";
  }

  openedCards.clear();
};

const isMatched = (openedCards) => {
  if (openedCards.size !== 2) return false;

  const cardsArray = [...openedCards];
  return cardsArray[0].dataset.color === cardsArray[1].dataset.color;
};

const isCard = (event) => event.target.classList.contains("card");

const attachClickHandler = (event, openedCards) => {
  if (!isCard(event)) {
    return;
  }

  if (openedCards.has(event.target)) {
    return;
  }

  event.target.classList.add("flipped");
  event.target.style.backgroundColor = event.target.dataset.color;
  openedCards.add(event.target);

  if (openedCards.size === 2) {
    setTimeout(() => {
      isMatched(openedCards)
        ? removeMatchedCards(openedCards)
        : removeAllOpenedCards(openedCards);
    }, 500);
  }
};

const runGame = () => {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  const cardColors = shuffleArray(colors);
  assignColorsToCards(cardColors);

  const main = document.querySelector("main");
  const openedCards = new Set();

  main.onclick = (event) => {
    attachClickHandler(event, openedCards);
  };
};

runGame();
