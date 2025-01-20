const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: 'e7ed7294-3c81-43c8-872d-a5a1eadbb865',
        'Content-Type': 'application/json',
    },
};

// Базовая функция для отправки запросов
function request(endpoint, options, customConfig = {}) {
    const baseUrl = customConfig.baseUrl || config.baseUrl;
    const headers = { ...config.headers, ...customConfig.headers };

    return fetch(`${baseUrl}${endpoint}`, {
        headers,
        ...options,
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.error(err);
        });
}
