import { deleteCard } from "./api.js";

export function createCard(
  card,
  cardTemplate,
  deleteCardHandler,
  likeButtonHandler,
  openCard,
  userId
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", function () {
    openCard(card);
  });

  const likeButton = cardElement.querySelector(".card__like-button");

  // Проверяем, лайкнул ли текущий пользователь карточку
  if (card.likes && card.likes.some(like => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", function () {
    likeButtonHandler(likeButton);
  });

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const likeCount = cardElement.querySelector(".card__like-count");
  likeCount.textContent = card.likes ? card.likes.length : 0;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (card.owner._id !== userId) {
    deleteButton.classList.add("card__delete-button_hidden");
  }
  deleteButton.addEventListener("click", function () {
    const cardItem = deleteButton.closest(".card");
    deleteCardHandler(cardItem, card._id);
  });

  return cardElement;
}

export function toggleLikePlace(likeButton, cardId, likeCard, unlikeCard) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeCountElement = likeButton.parentElement.querySelector(".card__like-count");

  if (isLiked) {
    // Убираем лайк
    unlikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = updatedCard.likes.length;
      });
  } else {
    // Добавляем лайк
    likeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCountElement.textContent = updatedCard.likes.length;
      });
  }
}
