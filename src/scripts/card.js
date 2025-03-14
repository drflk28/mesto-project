import {getInitialCards, getUserInfo, request, likeCard, unlikeCard} from './api.js';
import { openImagePopup } from './popup.js';


// Функция удаления карточки
export function deleteCard(cardId) {
    request(`/cards/${cardId}`, { method: 'DELETE' })
        .then(() => {
            const cardElement = document.querySelector(`[data-id="${cardId}"]`);
            if (cardElement) {
                cardElement.remove();
            }
        })
        .catch((err) => alert('Не удалось удалить карточку.'));
}

// Функция создания карточки
export function createCard({ name, link, _id, owner, likes }) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector(".card");
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
    likeCount.textContent = likes.length;

    getUserInfo().then((userData) => {
        if (userData._id !== owner._id) {
            deleteButton.style.display = 'none';
        } else {
            deleteButton.addEventListener('click', () => deleteCard(_id));
        }

        if (likes.some((like) => like._id === userData._id)) {
            likeButton.classList.add('card__like-button_is-active');
        }

        likeButton.addEventListener('click', () => {
            const cardId = cardElement.getAttribute('data-id');
            if (likeButton.classList.contains('card__like-button_is-active')) {
                unlikeCard(cardId);
            } else {
                likeCard(cardId);
            }
        });
    });

    cardImage.addEventListener('click', () => openImagePopup(link, name));

    return cardElement;
}

export function renderCards(cards) {
    const placesList = document.querySelector('.places__list');
    cards.forEach((cardData) => {
        const card = createCard(cardData);
        placesList.append(card);
    });
}

export function updateLikeState(updatedCard) {
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