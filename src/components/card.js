export function createCard(
  card,
  cardTemplate,
  deleteCard,
  likeButtonHandler,
  openCard
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", function () {
    openCard(card);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButtonHandler(likeButton);
  });

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    const cardItem = deleteButton.closest(".card");
    deleteCard(cardItem);
  });

  return cardElement;
}

export function toggleLikePlace(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export function deleteCard(card) {
  card.remove();
}
