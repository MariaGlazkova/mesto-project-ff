import '../pages/index.css';
import { initialCards } from './cards.js';

const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const places = content.querySelector(".places");
const placesList = places.querySelector(".places__list");

function toggleLikePlace (likeButton) {
  if (likeButton.classList.contains('card__like-button')) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
};

function openCardImage (card) {
  const popupTypeImage = document.querySelector(".popup_type_image");
    popupTypeImage.classList.add("popup_is-opened");
    const popupImage = popupTypeImage.querySelector(".popup__image");
    popupImage.src = card.link;
    const popupCaption = popupTypeImage.querySelector(".popup__caption");
    popupCaption.textContent = card.name;
}

function createCard(card, deleteCard, likeButtonHandler, openCard) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', function(){
    openCard(card);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener('click', function () {
    likeButtonHandler(likeButton);
  })

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
  const cardItem = createCard(card, deleteCard, toggleLikePlace, openCardImage);
  placesList.append(cardItem);
})

const profileEditButton = content.querySelector(".profile__edit-button");
profileEditButton.addEventListener('click', function() {
  const profileTitle = content.querySelector(".profile__title");
  const profileDescription = content.querySelector(".profile__description");
  const popupTypeEdit = document.querySelector(".popup_type_edit");
  const popupInputTypeName = popupTypeEdit.querySelector(".popup__input_type_name");
  const popupInputTypeDescription = document.querySelector(".popup__input_type_description");
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  popupTypeEdit.classList.add("popup_is-opened");
})

const newCardButton = content.querySelector(".profile__add-button");
newCardButton.addEventListener('click', function() {
  const popupTypeNewCard = document.querySelector(".popup_type_new-card");
  popupTypeNewCard.classList.add("popup_is-opened");
});

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupCloseEdit = popupTypeEdit.querySelector(".popup__close");
popupCloseEdit.addEventListener('click', function(){
  popupTypeEdit.classList.remove("popup_is-opened");
});

const formPopupTypeEdit = popupTypeEdit.querySelector(".popup__form");

function handleProfileInfoSubmit(evt) {
  evt.preventDefault();
  const popupInputTypeName = popupTypeEdit.querySelector(".popup__input_type_name");
  const popupInputTypeDescription = popupTypeEdit.querySelector(".popup__input_type_description");
  const profileTitle = content.querySelector(".profile__title");
  const profileDescription = content.querySelector(".profile__description");
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  popupTypeEdit.classList.remove("popup_is-opened");
};
formPopupTypeEdit.addEventListener('submit', handleProfileInfoSubmit);


const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupCloseNewCard = popupTypeNewCard.querySelector(".popup__close");
popupCloseNewCard.addEventListener('click', function(){
  popupTypeNewCard.classList.remove("popup_is-opened");
});

const formPopupTypeNewCard = popupTypeNewCard.querySelector(".popup__form");

function handleNewCardSubmit (evt) {
  evt.preventDefault();
  const popupInputTypeCardName = popupTypeNewCard.querySelector(".popup__input_type_card-name");
  const popupInputTypeUrl = popupTypeNewCard.querySelector(".popup__input_type_url");

  const card = {name: popupInputTypeCardName.value, link: popupInputTypeUrl.value};

  const cardItem = createCard(card, deleteCard, toggleLikePlace, openCardImage);
  placesList.prepend(cardItem);
  popupTypeNewCard.classList.remove("popup_is-opened");
  popupInputTypeCardName.value = "";
  popupInputTypeUrl.value = "";
}

formPopupTypeNewCard.addEventListener('submit', handleNewCardSubmit);

const popupTypeImage = document.querySelector(".popup_type_image");
const popupCloseTypeImage = popupTypeImage.querySelector(".popup__close");
popupCloseTypeImage.addEventListener('click', function(){
  popupTypeImage.classList.remove("popup_is-opened");
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      openedPopup.classList.remove("popup_is-opened");
    }
  }
});

function closePopupByOverlay(popup) {
  popup.addEventListener('click', function(evt) {
    if (evt.target === popup) {
      popup.classList.remove("popup_is-opened");
    }
  });
}

closePopupByOverlay(popupTypeEdit);
closePopupByOverlay(popupTypeNewCard);
closePopupByOverlay(popupTypeImage);
