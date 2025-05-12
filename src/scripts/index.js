import { getInitialCards, getUserInfo} from './api.js';
import {renderCards} from "./card.js";
import {toggleProfileButtonState, toggleCardButtonState, showCardInputError} from "./validate.js";
import '../pages/index.css';
import { handleProfileFormSubmit, openModal, closeModal, closeByEsc, handleCardFormSubmit, openPopup,  resetCardFormValidation} from './modal.js';

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');

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

// Обработчики для полей ввода
cardNameInput.addEventListener('input', () => {
    showCardInputError(cardNameInput);
    toggleCardButtonState();
});

cardLinkInput.addEventListener('input', () => {
    showCardInputError(cardLinkInput);
    toggleCardButtonState();
});

cardFormElement.addEventListener('submit', (evt) => {
    if (userData) {
        handleCardFormSubmit(evt, userData._id);
    } else {
        console.error('Данные пользователя не загружены');
        alert('Не удалось загрузить данные пользователя. Пожалуйста, обновите страницу.');
    }
});

// Обработчик открытия поп-апа добавления карточки
cardAddButton.addEventListener('click', () => {
    // Очищаем поля формы
    cardFormElement.reset();
    resetCardFormValidation();
    toggleCardButtonState(); // Инициализация состояния кнопки
    openModal(cardPopup);
});

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

document.querySelectorAll('.popup__close').forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        const popup = closeButton.closest('.popup');
        if (popup === cardPopup) {
            resetCardFormValidation();
        }
        closeModal(popup);
        document.removeEventListener('keydown', closeByEsc); // Убираем слушателя при закрытии поп-апа
    });
});

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    const popup = document.querySelector('.popup_type_edit');
    openPopup(popup);
});

const profileImage = document.querySelector('.profile__image');
let userData = null;

// Функция для загрузки данных пользователя
function loadUserData() {
    if (userData) {
        return Promise.resolve(userData);
    }

    return getUserInfo()
        .then((data) => {
            userData = data;
            // Обновляем аватар при загрузке
            if (data.avatar) {
                profileImage.style.backgroundImage = `url(${data.avatar})`;
            }
            return data;
        })
        .catch((err) => {
            console.error('Ошибка при загрузке данных пользователя:', err);
            alert('Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже.');
            throw err;
        });
}
// Загружаем карточки и данные пользователя
Promise.all([getInitialCards(), loadUserData()])
    .then(([cards, loadedUserData]) => {  // Используем другое имя переменной, чтобы не перезаписать глобальную
        // Сохраняем данные пользователя
        userData = loadedUserData;

        // Рендерим карточки с передачей ID текущего пользователя
        renderCards(cards, userData._id);

        // Обновляем информацию о пользователе
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;

        // Обновляем аватар, если он есть
        if (userData.avatar) {
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
        }
    })
    .catch((err) => {
        console.error('Ошибка при загрузке данных:', err);
    });
