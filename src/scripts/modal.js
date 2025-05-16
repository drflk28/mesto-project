import {addCardRequest, updateProfileRequest, updateUserAvatar} from './api.js';
import {createCard} from "./card.js";
import {toggleAvatarButtonState, showProfileInputError, toggleProfileButtonState, resetProfileValidation} from "./validate.js";

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

    if (popup === cardPopup) {
        resetCardFormValidation();
    }
    if (popup === profilePopup) {
        resetProfileValidation();
    }
    if (popup === profilePopup) {
        const form = popup.querySelector('.popup__form');
        form.querySelector('.popup__button').textContent = 'Сохранить';
    }
}

function toggleCardButtonState() {
    const cardSubmitButton = cardFormElement.querySelector('.popup__button');
    if (cardFormElement.checkValidity()) {
        cardSubmitButton.classList.remove('popup__button_disabled');
        cardSubmitButton.disabled = false;
    } else {
        cardSubmitButton.classList.add('popup__button_disabled');
        cardSubmitButton.disabled = true;
    }
}

export function resetCardFormValidation() {
    cardFormElement.reset();
    const errorElements = cardFormElement.querySelectorAll('.popup__error');
    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
    });

    const inputs = cardFormElement.querySelectorAll('.popup__input');
    inputs.forEach(input => {
        input.classList.remove('popup__input_type_error');
    });

    // Используем локальную функцию
    toggleCardButtonState();
}

export function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;
    const submitButton = form.querySelector('.popup__button');

    // Сохраняем оригинальные значения
    const originalValues = {
        name: nameInput.value,
        about: jobInput.value
    };

    // Блокировка формы
    const disableForm = () => {
        submitButton.disabled = true;
        const formInputs = form.querySelectorAll('input, button, textarea');
        formInputs.forEach(input => input.disabled = true);
        form.style.pointerEvents = 'none';
        form.style.opacity = '0.7';
        submitButton.textContent = 'Сохранение...';
    };

    // Разблокировка формы
    const enableForm = () => {
        submitButton.disabled = false;
        const formInputs = form.querySelectorAll('input, button, textarea');
        formInputs.forEach(input => input.disabled = false);
        form.style.pointerEvents = '';
        form.style.opacity = '';
        submitButton.textContent = 'Сохранить';
    };

    disableForm();

    updateProfileRequest({
        name: originalValues.name,
        about: originalValues.about
    })
        .then((userData) => {
            profileName.textContent = userData.name;
            profileJob.textContent = userData.about;
            closeModal(profilePopup);
        })
        .catch((err) => {
            console.error('Ошибка:', err);
            // Восстанавливаем оригинальные значения
            nameInput.value = originalValues.name;
            jobInput.value = originalValues.about;
        })
        .finally(() => {
            enableForm();
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

    const form = evt.target;
    const submitButton = form.querySelector('.popup__button');

    submitButton.disabled = true;
    const formInputs = form.querySelectorAll('input, button');
    formInputs.forEach(input => input.disabled = true);
    form.classList.add('popup__form_disabled');

    const originalText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const name = cardNameInput.value;
    const link = cardLinkInput.value;
    const newCardData = { name, link };

    addCardRequest(newCardData)
        .then((newCard) => {
            const newCardElement = createCard(newCard, currentUserId);
            document.querySelector('.places__list').prepend(newCardElement);
            closeModal(cardPopup);
            form.reset();  // Сброс формы
        })
        .catch((err) => {
            console.error('Ошибка:', err);
        })
        .finally(() => {
            // Разблокируем только после полного завершения
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            formInputs.forEach(input => input.disabled = false);
            form.classList.remove('popup__form_disabled');
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

    const form = evt.target;
    const submitButton = form.querySelector('.popup__button');

    // Блокируем кнопку и все элементы формы
    submitButton.disabled = true;
    const formInputs = form.querySelectorAll('input, button');
    formInputs.forEach(input => input.disabled = true);
    form.classList.add('popup__form_disabled');

    const originalText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const avatarUrl = avatarInput.value.trim();

    // Проверка на пустую строку (перенесена после блокировки)
    if (!avatarUrl) {
        // Разблокируем форму если URL пустой
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        formInputs.forEach(input => input.disabled = false);
        form.classList.remove('popup__form_disabled');
        alert('Пожалуйста, введите ссылку на аватар.');
        return;
    }

    updateUserAvatar(avatarUrl)
        .then((userData) => {
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
            form.reset(); // Сбрасываем форму
        })
        .catch((err) => {
            console.error('Ошибка:', err);
        })
        .finally(() => {
            // Восстанавливаем состояние формы в любом случае
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            formInputs.forEach(input => input.disabled = false);
            form.classList.remove('popup__form_disabled');
        });
}

nameInput.addEventListener('input', () => {
    showProfileInputError(nameInput);
    toggleProfileButtonState();
});

jobInput.addEventListener('input', () => {
    showProfileInputError(jobInput);
    toggleProfileButtonState();
});

