const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '1e0c8c73-3f1b-4301-b908-c6ed06962457',
    'Content-Type': 'application/json'
  }
}

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getMe() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse)
  .catch((err) => {
    console.error('Ошибка при получении профиля:', err);
  });
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
  .catch((err) => {
    console.error('Ошибка при получении карточек:', err);
  });
}

export function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(handleResponse)
  .catch((err) => {
    console.error('Ошибка при редактировании профиля:', err);
  });
}

export function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(handleResponse);
}

export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT'
  })
  .then(handleResponse)
  .catch((err) => {
    console.error('Ошибка при удалении карточки:', err);
  });
}

export function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
  .then(handleResponse);
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
  .then(handleResponse)
  .catch((err) => {
    console.error('Ошибка при удалении карточки:', err);
  });
}

export function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({ avatar: avatar })
  })
  .then(handleResponse)
  .catch((err) => {
    console.error('Ошибка при обновлении аватара:', err);
  });
}

