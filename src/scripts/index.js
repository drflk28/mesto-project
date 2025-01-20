
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector(".card");

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Функция создания карточки
function createCard({ name, link }) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // Удаление карточки
    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    // Лайк карточки
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Открытие изображения в поп-апе
    cardImage.addEventListener('click', () => {
        openImagePopup(link, name);
    });

    return cardElement;
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

renderCards(initialCards);

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

    // Обновляем данные на странице
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    // Закрываем поп-ап
    closeModal(profilePopup);

    // Сбрасываем форму
    profileFormElement.reset();
}

// Привязываем обработчик к событию submit
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

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

// Функция отображения ошибок
function showCardInputError(input) {
    const errorElement = cardFormElement.querySelector(`.popup__error_type_${input.name}`);

    // Проверка наличия элемента ошибки
    if (errorElement) {
        if (!input.validity.valid) {
            errorElement.textContent = input.validationMessage;
            input.classList.add('popup__input_type_error');
        } else {
            errorElement.textContent = '';
            input.classList.remove('popup__input_type_error');
        }
    } else {
        console.error(`Не найден элемент для ошибки для поля: ${input.name}`);
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

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    // Получаем данные из полей формы
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    // Создаём новую карточку и добавляем её в начало списка
    const cardElement = createCard(cardData);
    placesList.prepend(cardElement);

    // Закрываем поп-ап
    closeModal(cardPopup);

    // Сбрасываем форму
    cardFormElement.reset();
    toggleCardButtonState(); // Инициализация состояния кнопки после сброса формы
}

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


