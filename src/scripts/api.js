import { updateLikeState } from "./card.js";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: 'e7ed7294-3c81-43c8-872d-a5a1eadbb865',
        'Content-Type': 'application/json'
    }
};
let userInfoCache = null;

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

// Функция для получения данных пользователя
export function getUserInfo() {
    if (userInfoCache) {
        return Promise.resolve(userInfoCache);
    }

    return request('/users/me', { method: 'GET' })
        .then((data) => {
            userInfoCache = data;
            return data;
        });
}

// Остальные функции остаются без изменений
export function getInitialCards() {
    return request('/cards', { method: 'GET' });
}

export function addCardRequest(cardData) {
    return request('/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData)
    });
}

export function updateProfileRequest(updatedUserData) {
    return request('/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUserData)
    });
}

export function deleteCardRequest(cardId) {
    return request(`/cards/${cardId}`, { method: 'DELETE' });
}

export function likeCard(cardId, currentUserId) {
    return request(`/cards/likes/${cardId}`, { method: 'PUT' })
        .then((updatedCard) => {
            updateLikeState(updatedCard, currentUserId);
            return updatedCard;
        });
}

export function unlikeCard(cardId, currentUserId) {
    return request(`/cards/likes/${cardId}`, { method: 'DELETE' })
        .then((updatedCard) => {
            updateLikeState(updatedCard, currentUserId);
            return updatedCard;
        });
}

export function updateUserAvatar(avatarUrl) {
    return request('/users/me/avatar', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: avatarUrl })
    });
}
