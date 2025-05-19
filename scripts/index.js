const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const places = content.querySelector(".places");
const placesList = places.querySelector(".places__list");

function createCard(card, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener('click', function() {
    const cardItem = deleteButton.closest('.card');
    deleteCard(cardItem);
  });

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach(function(card){
  const cardItem = createCard(card, deleteCard);
  placesList.append(cardItem);
})
