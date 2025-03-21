(()=>{"use strict";var e={};(e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})})(e);var t=document.querySelector(".popup_type_image");function o(e){e.classList.add("popup_is-opened")}function n(e){e.classList.remove("popup_is-opened")}function r(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&(n(t),document.removeEventListener("keydown",r))}}function c(e){var n=e.name,r=e.link,c=e._id,i=e.owner,a=e.likes,p=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);p.setAttribute("data-id",c);var l=p.querySelector(".card__image"),d=p.querySelector(".card__title"),y=p.querySelector(".card__delete-button"),f=p.querySelector(".card__like-button"),m=p.querySelector(".card__like-count");return l.src=r,l.alt=n,d.textContent=n,m.textContent=a.length,_().then((function(e){e._id!==i._id?y.style.display="none":y.addEventListener("click",(function(){var e;s("/cards/".concat(e=c),{method:"DELETE"}).then((function(){var t=document.querySelector('[data-id="'.concat(e,'"]'));t&&t.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e),alert("Не удалось удалить карточку. Пожалуйста, попробуйте ещё раз.")}))})),a.some((function(t){return t._id===e._id}))&&f.classList.add("card__like-button_is-active"),f.addEventListener("click",(function(){var e=p.getAttribute("data-id");f.classList.contains("card__like-button_is-active")?function(e){s("/cards/likes/".concat(e),{method:"DELETE"}).then((function(e){u(e)}))}(e):function(e){s("/cards/likes/".concat(e),{method:"PUT"}).then((function(e){u(e)}))}(e)}))})),l.addEventListener("click",(function(){return function(e,n){var r=t.querySelector(".popup__image"),c=t.querySelector(".popup__caption");r.src=e,r.alt=n,c.textContent=n,o(t)}(r,n)})),p}function u(e){var t=document.querySelector('[data-id="'.concat(e._id,'"]')),o=t.querySelector(".card__like-button");t.querySelector(".card__like-count").textContent=e.likes.length,_().then((function(t){e.likes.some((function(e){return e._id===t._id}))?o.classList.add("card__like-button_is-active"):o.classList.remove("card__like-button_is-active")}))}function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function p(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){l(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function l(e,t,o){return(t=function(e){var t=function(e){if("object"!=i(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var o=t.call(e,"string");if("object"!=i(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==i(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var d={baseUrl:"https://nomoreparties.co/v1/apf-cohort-202",headers:{authorization:"e7ed7294-3c81-43c8-872d-a5a1eadbb865","Content-Type":"application/json"}};function s(e,t){return fetch("".concat(d.baseUrl).concat(e),p(p({},t),{},{headers:d.headers})).then((function(e){return e.ok?e.json():e.json().then((function(t){return Promise.reject("Ошибка: ".concat(e.status," - ").concat(t.message))}))}))}function _(){return s("/users/me",{method:"GET"})}var y=document.querySelector(".popup_type_edit").querySelector(".popup__form");y.querySelector(".popup__input_type_name"),y.querySelector(".popup__input_type_description"),document.querySelector(".profile__title"),document.querySelector(".profile__description"),y.addEventListener("submit",handleProfileFormSubmit);var f=document.querySelector(".popup_type_new-card"),m=f.querySelector(".popup__form"),v=m.querySelector(".popup__input_type_card-name"),b=m.querySelector(".popup__input_type_url"),S=m.querySelector(".popup__button"),q=document.querySelector(".popup_type_edit").querySelector(".popup__form");function h(e){e.preventDefault();var t={name:v.value,link:b.value};s("/cards",{method:"POST",body:JSON.stringify(t)}).then((function(e){var t=c(e);placesList.prepend(t),n(f),m.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e),alert("Не удалось добавить карточку. Пожалуйста, попробуйте ещё раз.")}))}function L(){q.checkValidity()?(q.querySelector(".popup__button").classList.remove("popup__button_disabled"),q.querySelector(".popup__button").disabled=!1):(q.querySelector(".popup__button").classList.add("popup__button_disabled"),q.querySelector(".popup__button").disabled=!0)}function E(){m.checkValidity()?(S.classList.remove("popup__button_disabled"),S.disabled=!1):(S.classList.add("popup__button_disabled"),S.disabled=!0)}m.addEventListener("submit",h),document.querySelector(".places__list");var g=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_type_new-card"),O=(document.querySelector(".popup_type_image"),document.querySelector(".profile__edit-button")),j=document.querySelector(".profile__add-button"),P=document.querySelectorAll(".popup__close"),w=g.querySelector(".popup__form"),C=w.querySelector(".popup__input_type_name"),T=w.querySelector(".popup__input_type_description"),x=document.querySelector(".profile__title"),D=document.querySelector(".profile__description");O.addEventListener("click",(function(){C.value=x.textContent,T.value=D.textContent,o(g)})),w.addEventListener("submit",e.handleProfileFormSubmit),C.addEventListener("input",L),T.addEventListener("input",L);var A=k.querySelector(".popup__form"),I=A.querySelector(".popup__input_type_card-name"),M=A.querySelector(".popup__input_type_url");A.querySelector(".popup__button"),I.addEventListener("input",(function(){G(I),E()})),M.addEventListener("input",(function(){G(M),E()})),j.addEventListener("click",(function(){A.reset(),E(),o(k)})),A.addEventListener("submit",h),P.forEach((function(e){e.addEventListener("click",(function(e){n(e.target.closest(".popup"))}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&n(e)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){n(e.closest(".popup")),document.removeEventListener("keydown",r)}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){document.querySelector(".popup_type_edit").classList.add("popup_is-opened"),document.addEventListener("keydown",r)})),s("/cards",{method:"GET"}).then((function(e){!function(e){var t=document.querySelector(".places__list");t.innerHTML="",e.forEach((function(e){var o=c(e);t.append(o)}))}(e)})),_().then((function(e){x.textContent=e.name,D.textContent=e.about})).catch((function(e){console.error("Ошибка при загрузке данных пользователя:",e),alert("Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже.")}));var N=document.querySelector(".profile__edit-avatar-button"),H=document.querySelector(".popup_type_edit-avatar"),J=H.querySelector(".popup__input_type_avatar"),U=H.querySelector(".popup__form"),V=H.querySelector(".popup__button"),F=document.querySelector(".profile__image");function G(e){var t=document.querySelector('[data-error-for="'.concat(e.name,'"]'));t?e.validity.valid?t.textContent="":t.textContent=e.validationMessage:console.error("Элемент для отображения ошибки не найден: ".concat(e.name))}N.addEventListener("click",(function(){var e=F.style.backgroundImage;if(e&&"none"!==e){var t=e.match(/url\(["']?(.*?)["']?\)/);J.value=t?t[1]:""}else J.value="";o(H)})),J.addEventListener("input",(function(){U.checkValidity()?(V.classList.remove("popup__button_disabled"),V.disabled=!1):(V.classList.add("popup__button_disabled"),V.disabled=!0)})),U.addEventListener("submit",(function(e){e.preventDefault();var t={avatar:J.value};s("/users/me/avatar",{method:"PATCH",body:JSON.stringify(t)}).then((function(e){F.style.backgroundImage="url(".concat(e.avatar,")"),n(H)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),alert("Не удалось обновить аватар. Пожалуйста, попробуйте позже.")}))})),U.addEventListener("submit",(function(e){if(e.preventDefault(),J)if(J.value){var t={avatar:J.value};s("/users/me/avatar",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){console.log("Аватар успешно обновлен:",e),document.querySelector(".profile__image").style.backgroundImage="url(".concat(e.avatar,")"),n(H)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),alert("Не удалось обновить аватар. Попробуйте позже.")}))}else alert("Пожалуйста, введите ссылку на аватар.");else console.error("Элемент avatarInput не найден")}))})();