import "../pages/index.css";
import {
  initialCards,
  createCard,
  toggleLikePlace,
  deleteCard,
} from "./card.js";
import {
  openModal,
  closeModal,
  addModalEscEvent,
  removeModalEscEvent,
} from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const places = content.querySelector(".places");
const placesList = places.querySelector(".places__list");

function openCardImage(card) {
  const popupTypeImage = document.querySelector(".popup_type_image");
  const popupImage = popupTypeImage.querySelector(".popup__image");
  popupImage.src = card.link;
  const popupCaption = popupTypeImage.querySelector(".popup__caption");
  popupCaption.textContent = card.name;
  openModal(popupTypeImage);
  addModalEscEvent();
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

const profileEditButton = content.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", function () {
  const profileTitle = content.querySelector(".profile__title");
  const profileDescription = content.querySelector(".profile__description");
  const popupTypeEdit = document.querySelector(".popup_type_edit");
  const popupInputTypeName = popupTypeEdit.querySelector(
    ".popup__input_type_name"
  );
  const popupInputTypeDescription = document.querySelector(
    ".popup__input_type_description"
  );
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  openModal(popupTypeEdit);
  addModalEscEvent();
});

const newCardButton = content.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
newCardButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
  addModalEscEvent();
});

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupCloseEdit = popupTypeEdit.querySelector(".popup__close");
popupCloseEdit.addEventListener("click", function () {
  closeModal(popupTypeEdit);
  removeModalEscEvent();
});

const formPopupTypeEdit = popupTypeEdit.querySelector(".popup__form");

function handleProfileInfoSubmit(evt) {
  evt.preventDefault();
  const popupInputTypeName = popupTypeEdit.querySelector(
    ".popup__input_type_name"
  );
  const popupInputTypeDescription = popupTypeEdit.querySelector(
    ".popup__input_type_description"
  );
  const profileTitle = content.querySelector(".profile__title");
  const profileDescription = content.querySelector(".profile__description");
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(popupTypeEdit);
  removeModalEscEvent();
}
formPopupTypeEdit.addEventListener("submit", handleProfileInfoSubmit);

const popupCloseNewCard = popupTypeNewCard.querySelector(".popup__close");
popupCloseNewCard.addEventListener("click", function () {
  closeModal(popupTypeNewCard);
  removeModalEscEvent();
});

const formPopupTypeNewCard = popupTypeNewCard.querySelector(".popup__form");

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const popupInputTypeCardName = popupTypeNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  const popupInputTypeUrl = popupTypeNewCard.querySelector(
    ".popup__input_type_url"
  );

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
  removeModalEscEvent();
}

formPopupTypeNewCard.addEventListener("submit", handleNewCardSubmit);

const popupTypeImage = document.querySelector(".popup_type_image");
const popupCloseTypeImage = popupTypeImage.querySelector(".popup__close");

popupCloseTypeImage.addEventListener("click", function () {
  closeModal(popupTypeImage);
  removeModalEscEvent();
});

function closePopupByOverlay(popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closeModal(popup);
      removeModalEscEvent();
    }
  });
}

closePopupByOverlay(popupTypeEdit);
closePopupByOverlay(popupTypeNewCard);
closePopupByOverlay(popupTypeImage);
