import {addCardRequest, updateProfileRequest, updateUserAvatar} from './api.js';
import {createCard} from "./card.js";
import {toggleAvatarButtonState, resetValidationErrors, toggleCardButtonState} from "./validate.js";

const profilePopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar');
const profileImage = document.querySelector('.profile__image');

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);

    // Сбрасываем валидацию при закрытии
    if (popup === cardPopup) {
        resetCardFormValidation();
    }
}

export function resetCardFormValidation() {
    cardFormElement.reset();
    const errorElements = cardFormElement.querySelectorAll('.popup__error');
    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
    });

    // Также сбрасываем стили ошибок у инпутов
    const inputs = cardFormElement.querySelectorAll('.popup__input');
    inputs.forEach(input => {
        input.classList.remove('popup__input_type_error');
    });

    // Возвращаем кнопку в исходное состояние
    toggleCardButtonState();
}

export function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const updatedUserData = {
        name: nameInput.value,
        about: jobInput.value
    };

    updateProfileRequest(updatedUserData)
        .then((userData) => {
            profileName.textContent = userData.name;
            profileJob.textContent = userData.about;
            closeModal(profilePopup);
        })
        .catch((err) => {
            console.error('Ошибка при обновлении профиля:', err);
            alert('Не удалось обновить профиль.');
        });
}

const imagePopup = document.querySelector('.popup_type_image');

// Открытие и закрытие поп-апов
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
}


export function openImagePopup(link, name) {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openModal(imagePopup);
}

export function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
            // Удаляем слушателя, когда поп-ап закрыт
            document.removeEventListener('keydown', closeByEsc);
        }
    }
}

export function handleCardFormSubmit(evt, currentUserId) {
    evt.preventDefault();

    const name = cardNameInput.value;
    const link = cardLinkInput.value;
    const newCardData = { name, link };

    const submitButton = evt.target.querySelector('.popup__button');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Сохранение...';

    addCardRequest(newCardData)
        .then((newCard) => {
            const newCardElement = createCard(newCard, currentUserId);
            const placesList = document.querySelector('.places__list');
            placesList.prepend(newCardElement);
            closeModal(cardPopup);
            resetCardFormValidation(); // Используем новую функцию
        })
        .catch((err) => {
            console.error('Ошибка при добавлении карточки:', err);
            alert('Не удалось добавить карточку. Попробуйте снова.');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        });
}

// Функция для открытия поп-апа и установки слушателя клавиши Esc
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc); // Добавляем слушателя
}

const avatarEditButton = document.querySelector('.profile__edit-avatar-button');
const avatarForm = avatarPopup.querySelector('.popup__form');

// Обработчик открытия поп-апа редактирования аватара
avatarEditButton.addEventListener('click', () => {
    // Всегда очищаем поле при открытии
    avatarInput.value = '';
    // Сбрасываем валидацию
    toggleAvatarButtonState();
    openModal(avatarPopup);
});

// Привязываем обработчик к полю ввода
avatarInput.addEventListener('input', toggleAvatarButtonState);

// Привязка обработчика к форме редактирования аватара
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

// Обработчик отправки формы редактирования аватара
export function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    const avatarUrl = avatarInput.value.trim();
    if (!avatarUrl) {
        alert('Пожалуйста, введите ссылку на аватар.');
        return;
    }

    // Блокируем кнопку на время отправки
    const submitButton = evt.target.querySelector('.popup__button');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Сохранение...';

    updateUserAvatar(avatarUrl)
        .then((userData) => {
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
            avatarInput.value = '';
        })
        .catch((err) => {
            console.error('Ошибка:', err);
            alert(`Ошибка: ${err.message || 'Не удалось обновить аватар'}`);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        });
}

