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
const closeButtons = document.querySelectorAll('.popup__close-button');

// Элементы формы редактирования профиля
const profileFormElement = document.querySelector('.popup__form_type_edit');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_job');

// Элементы на странице, которые нужно обновить
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

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
const cardFormElement = document.querySelector('.popup__form_type_new-card');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_card-link');

// Обработчик открытия поп-апа добавления карточки
cardAddButton.addEventListener('click', () => {
    // Очищаем поля формы
    cardFormElement.reset();
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
}

// Привязываем обработчик к событию submit
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Общий обработчик закрытия поп-апов по клику на крестик
closeButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup');
        closeModal(popup);
    });
});
