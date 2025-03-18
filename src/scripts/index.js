import { request, getInitialCards, getUserInfo, unlikeCard, likeCard } from './api.js';
import {renderCards, createCard, deleteCard, updateLikeState} from "./card.js";
import {handleProfileFormSubmit} from "./profile.js";
import {handleCardFormSubmit, checkProfileFormValidity, toggleProfileButtonState, checkCardFormValidity, toggleCardButtonState} from "./form.js";
import { openModal, closeModal, openImagePopup, closeByEsc } from './popup.js';
import '../pages/index.css';
const placesList = document.querySelector('.places__list');

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
getInitialCards().then((cards) => {
    renderCards(cards);
});

getUserInfo()
    .then((userData) => {
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
    })
    .catch((err) => {
        console.error('Ошибка при загрузке данных пользователя:', err);
        alert('Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже.');
    });

const avatarEditButton = document.querySelector('.profile__edit-avatar-button');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarSubmitButton = avatarPopup.querySelector('.popup__button');
const profileImage = document.querySelector('.profile__image');

// Обработчик открытия поп-апа редактирования аватара
avatarEditButton.addEventListener('click', () => {
    const backgroundImage = profileImage.style.backgroundImage;
    if (backgroundImage && backgroundImage !== 'none') {
        const urlRegex = /url\(["']?(.*?)["']?\)/;
        const match = backgroundImage.match(urlRegex);
        avatarInput.value = match ? match[1] : '';
    } else {
        avatarInput.value = '';
    }
    openModal(avatarPopup);
});

// Привязываем обработчик к полю ввода
avatarInput.addEventListener('input', toggleAvatarButtonState);

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

// Обработчик отправки формы редактирования аватара
avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const updatedAvatarData = {
        avatar: avatarInput.value,
    };

    request('/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify(updatedAvatarData),
    })
        .then((userData) => {
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
        })
        .catch((err) => {
            console.error('Ошибка при обновлении аватара:', err);
            alert('Не удалось обновить аватар. Пожалуйста, попробуйте позже.');
        });
});

// Обработчик отправки формы редактирования аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    // Проверяем, что avatarInput существует
    if (!avatarInput) {
        console.error('Элемент avatarInput не найден');
        return;
    }

    // Проверяем, что поле ввода не пустое
    if (!avatarInput.value) {
        alert('Пожалуйста, введите ссылку на аватар.');
        return;
    }

    // Создаем объект с данными для отправки
    const updatedAvatarData = {
        avatar: avatarInput.value, // Используем значение из поля ввода
    };

    // Отправляем данные на сервер
    request('/users/me/avatar', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json', // Указываем, что отправляем JSON
        },
        body: JSON.stringify(updatedAvatarData), // Преобразуем объект в JSON
    })
        .then((userData) => {
            console.log('Аватар успешно обновлен:', userData);
            // Обновляем аватар на странице
            document.querySelector('.profile__image').src = userData.avatar;
            closeModal(avatarPopup);
        })
        .catch((err) => {
            console.error('Ошибка при обновлении аватара:', err);
            alert('Не удалось обновить аватар. Попробуйте позже.');
        });
}

// Привязка обработчика к форме редактирования аватара
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

export function showCardInputError(inputElement) {
    const errorElement = document.querySelector(`[data-error-for="${inputElement.name}"]`);
    if (errorElement) {
        if (!inputElement.validity.valid) {
            errorElement.textContent = inputElement.validationMessage;
        } else {
            errorElement.textContent = '';
        }
    } else {
        console.error(`Элемент для отображения ошибки не найден: ${inputElement.name}`);
    }
}