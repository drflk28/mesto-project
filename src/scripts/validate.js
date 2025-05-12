const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardSubmitButton = cardFormElement.querySelector('.popup__button');
const profileFormElement = profilePopup.querySelector('.popup__form');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarSubmitButton = avatarPopup.querySelector('.popup__button');

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

export function checkAvatarFormValidity() {
    return avatarForm.checkValidity();
}

// Переключение состояния кнопки "Сохранить"
export function toggleAvatarButtonState() {
    if (checkAvatarFormValidity()) {
        avatarSubmitButton.classList.remove('popup__button_disabled');
        avatarSubmitButton.disabled = false;
    } else {
        avatarSubmitButton.classList.add('popup__button_disabled');
        avatarSubmitButton.disabled = true;
    }
}

export function showCardInputError(inputElement) {
    const errorElement = document.querySelector(`[data-error-for="${inputElement.name}"]`);
    if (errorElement) {
        if (!inputElement.validity.valid) {
            errorElement.textContent = inputElement.validationMessage;
            inputElement.classList.add('popup__input_type_error');
        } else {
            errorElement.textContent = '';
            inputElement.classList.remove('popup__input_type_error');
        }
    }
}

export function resetValidationErrors(formElement) {
    const errorElements = formElement.querySelectorAll('.popup__error');
    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
    });

    const inputs = formElement.querySelectorAll('.popup__input');
    inputs.forEach(input => {
        input.classList.remove('popup__input_type_error');
    });
}
