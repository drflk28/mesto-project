
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector(".card");

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Функция создания карточки
// Функция создания карточки
// Функция создания карточки
function createCard({ name, link, _id, owner, likes }) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.setAttribute('data-id', _id);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    likeCount.textContent = likes.length; // Инициализируем количество лайков

    // Получаем данные пользователя
    getUserInfo().then((userData) => {
        // Если карточка не ваша, скрыть кнопку удаления
        if (userData._id !== owner._id) {
            deleteButton.style.display = 'none';
        } else {
            // Если это ваша карточка, добавить обработчик для удаления
            deleteButton.addEventListener('click', () => {
                deleteCard(_id);
            });
        }

        // Инициализируем состояние кнопки лайка
        if (likes.some((like) => like._id === userData._id)) {
            likeButton.classList.add('card__like-button_is-active');
        } else {
            likeButton.classList.remove('card__like-button_is-active');
        }

        // Обработчик клика по кнопке лайка
        likeButton.addEventListener('click', () => {
            const cardId = cardElement.getAttribute('data-id');
            if (likeButton.classList.contains('card__like-button_is-active')) {
                unlikeCard(cardId);
            } else {
                likeCard(cardId);
            }
        });
    });

    cardImage.addEventListener('click', () => {
        openImagePopup(link, name);
    });

    return cardElement;
}
// Функция удаления карточки
function deleteCard(cardId) {
    request(`/cards/${cardId}`, {
        method: 'DELETE',
    })
        .then(() => {
            // Удаляем карточку из DOM
            const cardElement = document.querySelector(`[data-id="${cardId}"]`);
            if (cardElement) {
                cardElement.remove();
            }
        })
        .catch((err) => {
            console.error(err);
            alert('Не удалось удалить карточку. Попробуйте позже.');
        });
}

// Открытие изображения в поп-апе
function openImagePopup(link, name) {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openModal(imagePopup);
}

// @todo: Вывести карточки на страницу
function renderCards(cards) {
    cards.forEach((cardData) => {
        const card = createCard(cardData);
        placesList.append(card);
    });
}

// renderCards(initialCards);

// Универсальная функция открытия поп-апа
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.style.visibility = 'visible'; // Обеспечиваем, чтобы поп-ап был видимым
}

// Универсальная функция закрытия поп-апа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
        popup.style.visibility = 'hidden'; // После анимации скрываем поп-ап
    }, 300); // Время анимации
}

// Находим все нужные поп-апы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Кнопки для управления поп-апами
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// Элементы формы редактирования профиля
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

// Элементы на странице, которые нужно обновить
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Обработчик открытия поп-апа редактирования профиля
profileEditButton.addEventListener('click', () => {
    // Заполняем поля формы текущими значениями
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(profilePopup);
});

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const updatedUserData = {
        name: nameInput.value,
        about: jobInput.value
    };

    // Отправка данных на сервер
    request('/users/me', {
        method: 'PATCH',
        body: JSON.stringify(updatedUserData)
    })
        .then((userData) => {
            // Обновляем данные на странице
            profileName.textContent = userData.name;
            profileJob.textContent = userData.about;
            closeModal(profilePopup);
        })
        .catch((err) => {
            console.error(err);
            alert('Не удалось обновить профиль. Попробуйте позже.');
        });
}
// Функция проверки валидности формы редактирования профиля
function checkProfileFormValidity() {
    return profileFormElement.checkValidity();
}

// Функция переключения состояния кнопки "Сохранить"
function toggleProfileButtonState() {
    if (checkProfileFormValidity()) {
        profileFormElement.querySelector('.popup__button').classList.remove('popup__button_disabled');
        profileFormElement.querySelector('.popup__button').disabled = false;
    } else {
        profileFormElement.querySelector('.popup__button').classList.add('popup__button_disabled');
        profileFormElement.querySelector('.popup__button').disabled = true;
    }
}


// Привязываем обработчик к событию submit
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
nameInput.addEventListener('input', toggleProfileButtonState);
jobInput.addEventListener('input', toggleProfileButtonState);

// Элементы формы добавления карточки
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

// Кнопка сохранения
const cardSubmitButton = cardFormElement.querySelector('.popup__button');

// Функция проверки валидности формы
function checkCardFormValidity() {
    return cardFormElement.checkValidity();
}

// Функция переключения состояния кнопки
function toggleCardButtonState() {
    if (checkCardFormValidity()) {
        cardSubmitButton.classList.remove('popup__button_disabled');
        cardSubmitButton.disabled = false;
    } else {
        cardSubmitButton.classList.add('popup__button_disabled');
        cardSubmitButton.disabled = true;
    }
}

// Обработчики для полей ввода
cardNameInput.addEventListener('input', () => {
    showCardInputError(cardNameInput);
    toggleCardButtonState();
});

cardLinkInput.addEventListener('input', () => {
    showCardInputError(cardLinkInput);
    toggleCardButtonState();
});

// Обработчик открытия поп-апа добавления карточки
cardAddButton.addEventListener('click', () => {
    // Очищаем поля формы
    cardFormElement.reset();
    toggleCardButtonState(); // Инициализация состояния кнопки
    openModal(cardPopup);
});


// Привязываем обработчик к событию submit
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Общий обработчик закрытия поп-апов по клику на крестик
// Общий обработчик закрытия поп-апов по клику на оверлей
closeButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup');
        closeModal(popup);
    });
});

// Обработчик закрытия поп-апа по клику на оверлей
document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) { // Проверяем, что клик был именно по оверлею, а не по содержимому поп-апа
            closeModal(popup);
        }
    });
});


// Функция для закрытия поп-апа при нажатии клавиши Esc
function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
            // Удаляем слушателя, когда поп-ап закрыт
            document.removeEventListener('keydown', closeByEsc);
        }
    }
}

// Функция для открытия поп-апа и установки слушателя клавиши Esc
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc); // Добавляем слушателя
}

// Пример закрытия поп-апа при клике на кнопку
document.querySelectorAll('.popup__close').forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        const popup = closeButton.closest('.popup');
        closeModal(popup);
        document.removeEventListener('keydown', closeByEsc); // Убираем слушателя при закрытии поп-апа
    });
});

// Пример открытия поп-апа, например, при клике на кнопку
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    const popup = document.querySelector('.popup_type_edit');
    openPopup(popup);
});

//Получение карточек с сервера
function getInitialCards() {
    return request('/cards', {
        method: 'GET',
    });
}
getInitialCards().then((cards) => {
    renderCards(cards);
});

//Получение инфы о пользователе
function getUserInfo() {
    return request('/users/me', {
        method: 'GET',
    });
}
getUserInfo()
    .then((userData) => {
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
    })
    .catch((err) => {
        console.error(err);
        alert('Не удалось загрузить данные пользователя. Попробуйте позже.');
    });

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    // Получаем данные из полей формы
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    // Отправка данных на сервер
    request('/cards', {
        method: 'POST',
        body: JSON.stringify(cardData)
    })
        .then((newCard) => {
            // Создаём новую карточку и добавляем её в начало списка
            const cardElement = createCard(newCard);
            placesList.prepend(cardElement);

            // Закрываем поп-ап
            closeModal(cardPopup);

            // Сбрасываем форму
            cardFormElement.reset();
            toggleCardButtonState(); // Инициализация состояния кнопки после сброса формы
        })
        .catch((err) => {
            console.error(err);
            alert('Не удалось добавить карточку. Попробуйте позже.');
        });
}
// Функция для постановки лайка
function likeCard(cardId) {
    return request(`/cards/likes/${cardId}`, {
        method: 'PUT',
    })
        .then((updatedCard) => {
            updateLikeState(updatedCard);
        })
        .catch((err) => {
            console.error(err);
            alert('Не удалось поставить лайк. Попробуйте позже.');
        });
}

// Функция для снятия лайка
function unlikeCard(cardId) {
    return request(`/cards/likes/${cardId}`, {
        method: 'DELETE',
    })
        .then((updatedCard) => {
            updateLikeState(updatedCard);
        })
        .catch((err) => {
            console.error(err);
            alert('Не удалось снять лайк. Попробуйте позже.');
        });
}

// Функция для обновления состояния лайков
function updateLikeState(updatedCard) {
    const cardElement = document.querySelector(`[data-id="${updatedCard._id}"]`);
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');

    // Обновление количества лайков
    likeCount.textContent = updatedCard.likes.length;

    // Получаем данные о текущем пользователе
    getUserInfo().then((userData) => {
        // Обновление состояния кнопки лайка
        if (updatedCard.likes.some((like) => like._id === userData._id)) {
            likeButton.classList.add('card__like-button_is-active');
        } else {
            likeButton.classList.remove('card__like-button_is-active');
        }
    });
}

const avatarEditButton = document.querySelector('.profile__edit-avatar-button');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarSubmitButton = avatarPopup.querySelector('.popup__button');
const profileImage = document.querySelector('.profile__image');

// Обработчик открытия поп-апа редактирования аватара
avatarEditButton.addEventListener('click', () => {
    // Заполняем поле ввода текущей ссылкой на аватар
    avatarInput.value = profileImage.style.backgroundImage.slice(5, -2); // Получаем ссылку из background-image
    openModal(avatarPopup);
});

// Проверка валидности формы редактирования аватара
function checkAvatarFormValidity() {
    return avatarForm.checkValidity();
}

// Переключение состояния кнопки "Сохранить"
function toggleAvatarButtonState() {
    if (checkAvatarFormValidity()) {
        avatarSubmitButton.classList.remove('popup__button_disabled');
        avatarSubmitButton.disabled = false;
    } else {
        avatarSubmitButton.classList.add('popup__button_disabled');
        avatarSubmitButton.disabled = true;
    }
}

// Привязываем обработчик к полю ввода
avatarInput.addEventListener('input', toggleAvatarButtonState);

// Обработчик отправки формы редактирования аватара
avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const updatedAvatarData = {
        avatar: avatarInput.value,
    };

    // Отправка PATCH-запроса на сервер для обновления аватара
    request('/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify(updatedAvatarData),
    })
        .then((userData) => {
            // Обновляем аватар на странице
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
        })
        .catch((err) => {
            console.error(err);
            alert('Не удалось обновить аватар. Попробуйте позже.');
        });
});

// Обработчик отправки формы редактирования аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData();
    formData.append('avatar', avatarInput.files[0]); // Получаем файл из input

    request('/users/me/avatar', {
        method: 'PATCH',
        body: formData
    })
        .then((userData) => {
            // Обновляем аватар на странице
            document.querySelector('.profile__avatar').src = userData.avatar;
            closeModal(avatarPopup); // Закрытие поп-апа
        })
        .catch((err) => {
            console.error(err);
            alert('Не удалось обновить аватар. Попробуйте позже.');
        });
}

// Привязка обработчика к форме редактирования аватара
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
