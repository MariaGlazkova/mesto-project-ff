export function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closeModal(popup);
    }
  }
}

export function addModalEscEvent() {
  document.addEventListener("keydown", handleEscape);
}

export function removeModalEscEvent() {
  document.removeEventListener("keydown", handleEscape);
}

export function closePopupByOverlay(popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closeModal(popup);
      removeModalEscEvent();
    }
  });
}
