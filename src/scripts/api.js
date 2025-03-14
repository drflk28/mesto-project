import { updateLikeState } from "./card.js";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: 'e7ed7294-3c81-43c8-872d-a5a1eadbb865',
        'Content-Type': 'application/json'
    }
};

// Функция для выполнения запросов
export function request(url, options) {
    return fetch(`${config.baseUrl}${url}`, {
        ...options,
        headers: config.headers,
    })
        .then((res) => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(`Ошибка: ${res.status} - ${err.message}`));
            }
            return res.json();
        });
}

export function getUserInfo() {
    return request('/users/me', { method: 'GET' });
}

export function getInitialCards() {
    return request('/cards', { method: 'GET' });
}

export function likeCard(cardId) {
    return request(`/cards/likes/${cardId}`, { method: 'PUT' })
        .then((updatedCard) => {
            updateLikeState(updatedCard);
        });
}

export function unlikeCard(cardId) {
    return request(`/cards/likes/${cardId}`, { method: 'DELETE' })
        .then((updatedCard) => {
            updateLikeState(updatedCard);
        });
}