import "../pages/index.css";
import { createCard, toggleLikePlace } from "./card.js";
import { openModal, closeModal, closePopupByOverlay } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { getMe, getInitialCards, editProfile, addCard, likeCard, unlikeCard, deleteCard, updateAvatar } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const places = content.querySelector(".places");
const placesList = places.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const profileEditButton = content.querySelector(".profile__edit-button");
const profileAvatarEditButton = content.querySelector(".profile__avatar-edit-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");
const profileImage = content.querySelector(".profile__image");
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
  ".popup__input_type_place-name"
);
const popupInputTypeUrl = popupTypeNewCard.querySelector(
  ".popup__input_type_link"
);
const popupSubmitNewCardButton = formPopupTypeNewCard.querySelector('.popup__button_type_new-card');
const popupCloseTypeImage = popupTypeImage.querySelector(".popup__close");
const popupTypeDelete = document.querySelector(".popup_type_delete");
const popupCloseDelete = popupTypeDelete.querySelector(".popup__close");
const popupButtonDelete = popupTypeDelete.querySelector(".popup__button_type_delete");

const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupInputTypeAvatarLink = popupTypeAvatar.querySelector(".popup__input_type_avatar-link");
const popupCloseTypeAvatar = popupTypeAvatar.querySelector(".popup__close");
const formPopupTypeAvatar = popupTypeAvatar.querySelector(".popup__form");
const popupSubmitAvatarButton = formPopupTypeAvatar.querySelector('.popup__button_type_avatar');

let cardToDelete = null;
let cardElementToDelete = null;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function openCardImage(card) {
  popupImage.src = card.link;
  popupCaption.textContent = card.name;
  openModal(popupTypeImage);
}

function openDeleteConfirmation(cardElement, cardId) {
  cardToDelete = cardId;
  cardElementToDelete = cardElement;
  openModal(popupTypeDelete);
}

profileEditButton.addEventListener("click", function () {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  clearValidation(popupTypeEdit, validationConfig);
  openModal(popupTypeEdit);
});


newCardButton.addEventListener("click", function () {
  clearValidation(popupTypeNewCard, validationConfig);
  openModal(popupTypeNewCard);
});

popupCloseEdit.addEventListener("click", function () {
  closeModal(popupTypeEdit);
});

function handleProfileInfoSubmit(evt) {
  evt.preventDefault();

  editProfile(popupInputTypeName.value, popupInputTypeDescription.value)
    .then((updatedProfile) => {
      profileTitle.textContent = updatedProfile.name;
      profileDescription.textContent = updatedProfile.about;
      closeModal(popupTypeEdit);
    });
}
formPopupTypeEdit.addEventListener("submit", handleProfileInfoSubmit);

popupCloseNewCard.addEventListener("click", function () {
  closeModal(popupTypeNewCard);
});

function handleNewCardSubmit(evt) {
  evt.preventDefault();


  const originalButtonText = popupSubmitNewCardButton.textContent;

  popupSubmitNewCardButton.textContent = 'Создание...';
  popupSubmitNewCardButton.disabled = true;

  addCard(popupInputTypeCardName.value, popupInputTypeUrl.value)
    .then((newCard) => {
      const cardItem = createCard(
        newCard,
        cardTemplate,
        openDeleteConfirmation,
        (likeButton) => toggleLikePlace(likeButton, newCard._id, likeCard, unlikeCard),
        openCardImage,
        newCard.owner._id
      );
      placesList.prepend(cardItem);
      popupInputTypeCardName.value = "";
      popupInputTypeUrl.value = "";
      closeModal(popupTypeNewCard);
    })
    .finally(() => {
      popupSubmitNewCardButton.textContent = originalButtonText;
      popupSubmitNewCardButton.disabled = false;
    });
}

formPopupTypeNewCard.addEventListener("submit", handleNewCardSubmit);

popupCloseTypeImage.addEventListener("click", function () {
  closeModal(popupTypeImage);
});

popupCloseDelete.addEventListener("click", function () {
  closeModal(popupTypeDelete);
});

popupButtonDelete.addEventListener("click", function () {
  if (cardToDelete && cardElementToDelete) {
    deleteCard(cardToDelete)
      .then(() => {
        cardElementToDelete.remove();
        closeModal(popupTypeDelete);
        cardToDelete = null;
        cardElementToDelete = null;
      })
      .catch((err) => {
        console.error('Ошибка при удалении карточки:', err);
      });
  }
});

profileAvatarEditButton.addEventListener("click", function () {
  openModal(popupTypeAvatar);
});

popupCloseTypeAvatar.addEventListener("click", function () {
  closeModal(popupTypeAvatar);
});

function handleAvatarSubmit(evt) {
  evt.preventDefault();


  const originalButtonText = popupSubmitAvatarButton.textContent;

  popupSubmitAvatarButton.textContent = 'Сохранение...';
  popupSubmitAvatarButton.disabled = true;

  updateAvatar(popupInputTypeAvatarLink.value)
    .then((updatedAvatar) => {
      profileImage.style.backgroundImage = `url(${updatedAvatar.avatar})`;
      popupInputTypeAvatarLink.value = '';
      closeModal(popupTypeAvatar);
    })
    .finally(() => {
      popupSubmitAvatarButton.textContent = originalButtonText;
      popupSubmitAvatarButton.disabled = false;
    });
}
formPopupTypeAvatar.addEventListener("submit", handleAvatarSubmit);

closePopupByOverlay(popupTypeEdit);
closePopupByOverlay(popupTypeNewCard);
closePopupByOverlay(popupTypeImage);
closePopupByOverlay(popupTypeDelete);
closePopupByOverlay(popupTypeAvatar);

enableValidation(validationConfig);

function setupProfileInfo(profileInfo) {
  profileTitle.textContent = profileInfo.name;
  profileDescription.textContent = profileInfo.about;
  profileImage.style.backgroundImage = `url(${profileInfo.avatar})`;
}

function setupInitialCards(initialCards, userId) {
  initialCards.forEach(card => {
    const cardItem = createCard(
      card,
      cardTemplate,
      openDeleteConfirmation,
      (likeButton) => toggleLikePlace(likeButton, card._id, likeCard, unlikeCard),
      openCardImage,
      userId
    );
    placesList.append(cardItem);
  });
}

Promise.all([getMe(), getInitialCards()]).then(([profileInfo, initialCards]) => {
  setupProfileInfo(profileInfo);
  setupInitialCards(initialCards, profileInfo._id);
});
