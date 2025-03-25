import { request} from './api.js';
import { createCard} from "./card.js";
import { closeModal } from './popup.js';
import './index.js';

const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');
const cardSubmitButton = cardFormElement.querySelector('.popup__button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const placesList = document.querySelector('.places__list');

export function handleCardFormSubmit(evt, userData) {  // Добавляем параметр userData
    evt.preventDefault();

    const name = cardNameInput.value;
    const link = cardLinkInput.value;

    const newCardData = { name, link };

    request('/cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCardData)
    })
        .then((newCard) => {
            const newCardElement = createCard(newCard, userData._id); // Используем переданный userData
            placesList.prepend(newCardElement);
            closeModal(cardPopup);
            cardFormElement.reset();
        })
        .catch((err) => {
            console.error('Ошибка при добавлении карточки:', err);
            alert('Не удалось добавить карточку. Попробуйте снова.');
        });
}


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
