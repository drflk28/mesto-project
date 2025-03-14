import { request} from './api.js';
import { createCard} from "./card.js";
import { closeModal } from './popup.js';

// Логика для форм (например, добавление карточки)
const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');
const cardSubmitButton = cardFormElement.querySelector('.popup__button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');

// Обработчик формы
export function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    request('/cards', { method: 'POST', body: JSON.stringify(cardData) })
        .then((newCard) => {
            const cardElement = createCard(newCard);
            placesList.prepend(cardElement);
            closeModal(cardPopup);
        })
        .catch((err) => alert('Не удалось добавить карточку.'));
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

export function checkProfileFormValidity() {
    return profileFormElement.checkValidity();
}

export function toggleProfileButtonState() {
    if (checkProfileFormValidity()) {
        profileFormElement.querySelector('.popup__button').classList.remove('popup__button_disabled');
        profileFormElement.querySelector('.popup__button').disabled = false;
    } else {
        profileFormElement.querySelector('.popup__button').classList.add('popup__button_disabled');
        profileFormElement.querySelector('.popup__button').disabled = true;
    }
}

export function checkCardFormValidity() {
    return cardFormElement.checkValidity();
}

export function toggleCardButtonState() {
    if (checkCardFormValidity()) {
        cardSubmitButton.classList.remove('popup__button_disabled');
        cardSubmitButton.disabled = false;
    } else {
        cardSubmitButton.classList.add('popup__button_disabled');
        cardSubmitButton.disabled = true;
    }
}