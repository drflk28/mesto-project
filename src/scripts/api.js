const token = 'e7ed7294-3c81-43c8-872d-a5a1eadbb865'; // Замените на ваш реальный токен
const cohortId = 'apf-cohort-202'; // Укажите свой идентификатор группы
const apiBaseUrl = `https://nomoreparties.co/v1/${cohortId}`;

function request(endpoint, options) {
    return fetch(`${apiBaseUrl}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        ...options
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
}
