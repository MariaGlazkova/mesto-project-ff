import "../pages/index.css";
import { createCard, toggleLikePlace, deleteCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal, closePopupByOverlay } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const places = content.querySelector(".places");
const placesList = places.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const profileEditButton = content.querySelector(".profile__edit-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupInputTypeName = popupTypeEdit.querySelector(
  ".popup__input_type_name"
);
const popupInputTypeDescription = document.querySelector(
  ".popup__input_type_description"
);
const newCardButton = content.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupCloseEdit = popupTypeEdit.querySelector(".popup__close");
const formPopupTypeEdit = popupTypeEdit.querySelector(".popup__form");
const popupCloseNewCard = popupTypeNewCard.querySelector(".popup__close");
const formPopupTypeNewCard = popupTypeNewCard.querySelector(".popup__form");
const popupInputTypeCardName = popupTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeUrl = popupTypeNewCard.querySelector(
  ".popup__input_type_url"
);
const popupCloseTypeImage = popupTypeImage.querySelector(".popup__close");

function openCardImage(card) {
  popupImage.src = card.link;
  popupCaption.textContent = card.name;
  openModal(popupTypeImage);
}

initialCards.forEach(function (card) {
  const cardItem = createCard(
    card,
    cardTemplate,
    deleteCard,
    toggleLikePlace,
    openCardImage
  );
  placesList.append(cardItem);
});

profileEditButton.addEventListener("click", function () {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

newCardButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

popupCloseEdit.addEventListener("click", function () {
  closeModal(popupTypeEdit);
});

function handleProfileInfoSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(popupTypeEdit);
}
formPopupTypeEdit.addEventListener("submit", handleProfileInfoSubmit);

popupCloseNewCard.addEventListener("click", function () {
  closeModal(popupTypeNewCard);
});

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const card = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value,
  };

  const cardItem = createCard(
    card,
    cardTemplate,
    deleteCard,
    toggleLikePlace,
    openCardImage
  );
  placesList.prepend(cardItem);
  popupInputTypeCardName.value = "";
  popupInputTypeUrl.value = "";
  closeModal(popupTypeNewCard);
}

formPopupTypeNewCard.addEventListener("submit", handleNewCardSubmit);

popupCloseTypeImage.addEventListener("click", function () {
  closeModal(popupTypeImage);
});

closePopupByOverlay(popupTypeEdit);
closePopupByOverlay(popupTypeNewCard);
closePopupByOverlay(popupTypeImage);
