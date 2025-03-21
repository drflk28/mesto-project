(()=>{"use strict";var e=document.querySelector(".popup_type_image");function t(e){e.classList.add("popup_is-opened")}function n(e){e.classList.remove("popup_is-opened")}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&(n(t),document.removeEventListener("keydown",o))}}function r(n){var o=n.name,r=n.link,u=n._id,i=n.owner,a=n.likes,p=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);p.setAttribute("data-id",u);var l=p.querySelector(".card__image"),_=p.querySelector(".card__title"),y=p.querySelector(".card__delete-button"),f=p.querySelector(".card__like-button"),m=p.querySelector(".card__like-count");return l.src=r,l.alt=o,_.textContent=o,m.textContent=a.length,s().then((function(e){e._id!==i._id?y.style.display="none":y.addEventListener("click",(function(){var e;d("/cards/".concat(e=u),{method:"DELETE"}).then((function(){var t=document.querySelector('[data-id="'.concat(e,'"]'));t&&t.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e),alert("Не удалось удалить карточку. Пожалуйста, попробуйте ещё раз.")}))})),a.some((function(t){return t._id===e._id}))&&f.classList.add("card__like-button_is-active"),f.addEventListener("click",(function(){var e=p.getAttribute("data-id");f.classList.contains("card__like-button_is-active")?function(e){d("/cards/likes/".concat(e),{method:"DELETE"}).then((function(e){c(e)}))}(e):function(e){d("/cards/likes/".concat(e),{method:"PUT"}).then((function(e){c(e)}))}(e)}))})),l.addEventListener("click",(function(){return function(n,o){var r=e.querySelector(".popup__image"),c=e.querySelector(".popup__caption");r.src=n,r.alt=o,c.textContent=o,t(e)}(r,o)})),p}function c(e){var t=document.querySelector('[data-id="'.concat(e._id,'"]')),n=t.querySelector(".card__like-button");t.querySelector(".card__like-count").textContent=e.likes.length,s().then((function(t){e.likes.some((function(e){return e._id===t._id}))?n.classList.add("card__like-button_is-active"):n.classList.remove("card__like-button_is-active")}))}function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return(t=function(e){var t=function(e){if("object"!=u(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==u(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l={baseUrl:"https://nomoreparties.co/v1/apf-cohort-202",headers:{authorization:"e7ed7294-3c81-43c8-872d-a5a1eadbb865","Content-Type":"application/json"}};function d(e,t){return fetch("".concat(l.baseUrl).concat(e),a(a({},t),{},{headers:l.headers})).then((function(e){return e.ok?e.json():e.json().then((function(t){return Promise.reject("Ошибка: ".concat(e.status," - ").concat(t.message))}))}))}function s(){return d("/users/me",{method:"GET"})}var _=document.querySelector(".popup_type_edit");function y(e){e.preventDefault();var t={name:m.value,about:v.value};d("/users/me",{method:"PATCH",body:JSON.stringify(t)}).then((function(e){b.textContent=e.name,S.textContent=e.about,n(_)})).catch((function(e){return alert("Не удалось обновить профиль.")}))}var f=_.querySelector(".popup__form"),m=f.querySelector(".popup__input_type_name"),v=f.querySelector(".popup__input_type_description"),b=document.querySelector(".profile__title"),S=document.querySelector(".profile__description");f.addEventListener("submit",y);var q=document.querySelector(".popup_type_new-card"),h=q.querySelector(".popup__form"),L=h.querySelector(".popup__input_type_card-name"),E=h.querySelector(".popup__input_type_url"),k=h.querySelector(".popup__button"),g=document.querySelector(".popup_type_edit").querySelector(".popup__form");function O(e){e.preventDefault();var t={name:L.value,link:E.value};d("/cards",{method:"POST",body:JSON.stringify(t)}).then((function(e){var t=r(e);placesList.prepend(t),n(q),h.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e),alert("Не удалось добавить карточку. Пожалуйста, попробуйте ещё раз.")}))}function j(){g.checkValidity()?(g.querySelector(".popup__button").classList.remove("popup__button_disabled"),g.querySelector(".popup__button").disabled=!1):(g.querySelector(".popup__button").classList.add("popup__button_disabled"),g.querySelector(".popup__button").disabled=!0)}function C(){h.checkValidity()?(k.classList.remove("popup__button_disabled"),k.disabled=!1):(k.classList.add("popup__button_disabled"),k.disabled=!0)}h.addEventListener("submit",O),document.querySelector(".places__list");var P=document.querySelector(".popup_type_edit"),w=document.querySelector(".popup_type_new-card"),T=(document.querySelector(".popup_type_image"),document.querySelector(".profile__edit-button")),x=document.querySelector(".profile__add-button"),D=document.querySelectorAll(".popup__close"),A=P.querySelector(".popup__form"),N=A.querySelector(".popup__input_type_name"),H=A.querySelector(".popup__input_type_description"),I=document.querySelector(".profile__title"),J=document.querySelector(".profile__description");T.addEventListener("click",(function(){N.value=I.textContent,H.value=J.textContent,t(P)})),A.addEventListener("submit",y),N.addEventListener("input",j),H.addEventListener("input",j);var U=w.querySelector(".popup__form"),V=U.querySelector(".popup__input_type_card-name"),G=U.querySelector(".popup__input_type_url");U.querySelector(".popup__button"),V.addEventListener("input",(function(){R(V),C()})),G.addEventListener("input",(function(){R(G),C()})),x.addEventListener("click",(function(){U.reset(),C(),t(w)})),U.addEventListener("submit",O),D.forEach((function(e){e.addEventListener("click",(function(e){n(e.target.closest(".popup"))}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&n(e)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){n(e.closest(".popup")),document.removeEventListener("keydown",o)}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){document.querySelector(".popup_type_edit").classList.add("popup_is-opened"),document.addEventListener("keydown",o)})),d("/cards",{method:"GET"}).then((function(e){!function(e){var t=document.querySelector(".places__list");t.innerHTML="",e.forEach((function(e){var n=r(e);t.append(n)}))}(e)})),s().then((function(e){I.textContent=e.name,J.textContent=e.about})).catch((function(e){console.error("Ошибка при загрузке данных пользователя:",e),alert("Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже.")}));var M=document.querySelector(".profile__edit-avatar-button"),z=document.querySelector(".popup_type_edit-avatar"),B=z.querySelector(".popup__input_type_avatar"),F=z.querySelector(".popup__form"),K=z.querySelector(".popup__button"),Q=document.querySelector(".profile__image");function R(e){var t=document.querySelector('[data-error-for="'.concat(e.name,'"]'));t?e.validity.valid?t.textContent="":t.textContent=e.validationMessage:console.error("Элемент для отображения ошибки не найден: ".concat(e.name))}M.addEventListener("click",(function(){var e=Q.style.backgroundImage;if(e&&"none"!==e){var n=e.match(/url\(["']?(.*?)["']?\)/);B.value=n?n[1]:""}else B.value="";t(z)})),B.addEventListener("input",(function(){F.checkValidity()?(K.classList.remove("popup__button_disabled"),K.disabled=!1):(K.classList.add("popup__button_disabled"),K.disabled=!0)})),F.addEventListener("submit",(function(e){e.preventDefault();var t={avatar:B.value};d("/users/me/avatar",{method:"PATCH",body:JSON.stringify(t)}).then((function(e){Q.style.backgroundImage="url(".concat(e.avatar,")"),n(z)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),alert("Не удалось обновить аватар. Пожалуйста, попробуйте позже.")}))})),F.addEventListener("submit",(function(e){if(e.preventDefault(),B)if(B.value){var t={avatar:B.value};d("/users/me/avatar",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){console.log("Аватар успешно обновлен:",e),document.querySelector(".profile__image").style.backgroundImage="url(".concat(e.avatar,")"),n(z)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),alert("Не удалось обновить аватар. Попробуйте позже.")}))}else alert("Пожалуйста, введите ссылку на аватар.");else console.error("Элемент avatarInput не найден")}))})();