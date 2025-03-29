(()=>{"use strict";var e=document.querySelector(".popup_type_edit"),t=document.querySelector(".popup_type_new-card").querySelector(".popup__form"),r=t.querySelector(".popup__button"),n=e.querySelector(".popup__form"),o=document.querySelector(".popup_type_edit-avatar"),c=o.querySelector(".popup__form"),u=o.querySelector(".popup__button");function i(){n.checkValidity()?(n.querySelector(".popup__button").classList.remove("popup__button_disabled"),n.querySelector(".popup__button").disabled=!1):(n.querySelector(".popup__button").classList.add("popup__button_disabled"),n.querySelector(".popup__button").disabled=!0)}function a(){t.checkValidity()?(r.classList.remove("popup__button_disabled"),r.disabled=!1):(r.classList.add("popup__button_disabled"),r.disabled=!0)}function l(){c.checkValidity()?(u.classList.remove("popup__button_disabled"),u.disabled=!1):(u.classList.add("popup__button_disabled"),u.disabled=!0)}function p(e){var t=document.querySelector('[data-error-for="'.concat(e.name,'"]'));t?e.validity.valid?t.textContent="":t.textContent=e.validationMessage:console.error("Элемент для отображения ошибки не найден: ".concat(e.name))}var d=document.querySelector(".popup_type_edit"),s=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),y=d.querySelector(".popup__form"),f=y.querySelector(".popup__input_type_name"),m=y.querySelector(".popup__input_type_description"),v=document.querySelector(".popup_type_new-card"),b=v.querySelector(".popup__form"),S=b.querySelector(".popup__input_type_card-name"),q=b.querySelector(".popup__input_type_url"),h=document.querySelector(".popup_type_edit-avatar"),g=h.querySelector(".popup__input_type_avatar"),k=document.querySelector(".profile__image");function L(e){e.classList.remove("popup_is-opened")}var E=document.querySelector(".popup_type_image");function j(e){e.classList.add("popup_is-opened")}function C(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&(L(t),document.removeEventListener("keydown",C))}}var O=document.querySelector(".profile__edit-avatar-button"),w=h.querySelector(".popup__form");function P(e,t){var r=e.name,n=e.link,o=e._id,c=e.owner,u=e.likes,i=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);i.setAttribute("data-id",o);var a=i.querySelector(".card__image"),l=i.querySelector(".card__title"),p=i.querySelector(".card__delete-button"),d=i.querySelector(".card__like-button"),s=i.querySelector(".card__like-count");return a.src=n,a.alt=r,l.textContent=r,s.textContent=u.length,t!==c._id?p.style.display="none":p.addEventListener("click",(function(){var e;(function(e){return H("/cards/".concat(e),{method:"DELETE"})})(e=o).then((function(){var t=document.querySelector('[data-id="'.concat(e,'"]'));t&&t.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e),alert("Не удалось удалить карточку. Пожалуйста, попробуйте ещё раз.")}))})),u.some((function(e){return e._id===t}))&&d.classList.add("card__like-button_is-active"),d.addEventListener("click",(function(){var e=i.getAttribute("data-id");d.classList.contains("card__like-button_is-active")?function(e,t){return H("/cards/likes/".concat(e),{method:"DELETE"}).then((function(e){return x(e,t),e}))}(e,t).then((function(){d.classList.remove("card__like-button_is-active")})):function(e,t){return H("/cards/likes/".concat(e),{method:"PUT"}).then((function(e){return x(e,t),e}))}(e,t).then((function(){d.classList.add("card__like-button_is-active")}))})),a.addEventListener("click",(function(){return function(e,t){var r=E.querySelector(".popup__image"),n=E.querySelector(".popup__caption");r.src=e,r.alt=t,n.textContent=t,j(E)}(n,r)})),i}function x(e,t){var r=document.querySelector('[data-id="'.concat(e._id,'"]'));if(r){var n=r.querySelector(".card__like-button");r.querySelector(".card__like-count").textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))?n.classList.add("card__like-button_is-active"):n.classList.remove("card__like-button_is-active")}}function T(e){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(e)}function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(Object(r),!0).forEach((function(t){I(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function I(e,t,r){return(t=function(e){var t=function(e){if("object"!=T(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,"string");if("object"!=T(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==T(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}O.addEventListener("click",(function(){g.value="",l(),j(h)})),g.addEventListener("input",l),w.addEventListener("submit",(function(e){e.preventDefault(),e.stopPropagation();var t=g.value.trim();if(t){var r=e.target.querySelector(".popup__button"),n=r.textContent;r.disabled=!0,r.textContent="Сохранение...",function(e){return H("/users/me/avatar",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({avatar:e})})}(t).then((function(e){k.style.backgroundImage="url(".concat(e.avatar,")"),L(h),g.value=""})).catch((function(e){console.error("Ошибка:",e),alert("Ошибка: ".concat(e.message||"Не удалось обновить аватар"))})).finally((function(){r.disabled=!1,r.textContent=n}))}else alert("Пожалуйста, введите ссылку на аватар.")}));var N={baseUrl:"https://nomoreparties.co/v1/apf-cohort-202",headers:{authorization:"e7ed7294-3c81-43c8-872d-a5a1eadbb865","Content-Type":"application/json"}},U=null;function H(e,t){return fetch("".concat(N.baseUrl).concat(e),D(D({},t),{},{headers:N.headers})).then((function(e){return e.ok?e.json():e.json().then((function(t){return Promise.reject("Ошибка: ".concat(e.status," - ").concat(t.message))}))}))}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var M=document.querySelector(".popup_type_edit"),V=document.querySelector(".popup_type_new-card"),G=document.querySelector(".profile__edit-button"),z=document.querySelector(".profile__add-button"),$=document.querySelectorAll(".popup__close"),B=M.querySelector(".popup__form"),F=B.querySelector(".popup__input_type_name"),K=B.querySelector(".popup__input_type_description"),Q=document.querySelector(".profile__title"),R=document.querySelector(".profile__description");G.addEventListener("click",(function(){F.value=Q.textContent,K.value=R.textContent,j(M)})),B.addEventListener("submit",(function(e){var t;e.preventDefault(),(t={name:f.value,about:m.value},H("/users/me",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).then((function(e){s.textContent=e.name,_.textContent=e.about,L(d)})).catch((function(e){console.error("Ошибка при обновлении профиля:",e),alert("Не удалось обновить профиль.")}))})),F.addEventListener("input",i),K.addEventListener("input",i);var W=V.querySelector(".popup__form"),X=W.querySelector(".popup__input_type_card-name"),Y=W.querySelector(".popup__input_type_url");X.addEventListener("input",(function(){p(X),a()})),Y.addEventListener("input",(function(){p(Y),a()})),W.addEventListener("submit",(function(e){ee?function(e,t){e.preventDefault();var r,n={name:S.value,link:q.value},o=e.target.querySelector(".popup__button"),c=o.textContent;o.disabled=!0,o.textContent="Сохранение...",(r=n,H("/cards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).then((function(e){var r=P(e,t);document.querySelector(".places__list").prepend(r),L(v),b.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e),alert("Не удалось добавить карточку. Попробуйте снова.")})).finally((function(){o.disabled=!1,o.textContent=c}))}(e,ee._id):(console.error("Данные пользователя не загружены"),alert("Не удалось загрузить данные пользователя. Пожалуйста, обновите страницу."))})),z.addEventListener("click",(function(){W.reset(),a(),j(V)})),$.forEach((function(e){e.addEventListener("click",(function(e){L(e.target.closest(".popup"))}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&L(e)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){L(e.closest(".popup")),document.removeEventListener("keydown",C)}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){document.querySelector(".popup_type_edit").classList.add("popup_is-opened"),document.addEventListener("keydown",C)}));var Z=document.querySelector(".profile__image"),ee=null;Promise.all([H("/cards",{method:"GET"}),ee?Promise.resolve(ee):(U?Promise.resolve(U):H("/users/me",{method:"GET"}).then((function(e){return U=e,e}))).then((function(e){return ee=e,e.avatar&&(Z.style.backgroundImage="url(".concat(e.avatar,")")),e})).catch((function(e){throw console.error("Ошибка при загрузке данных пользователя:",e),alert("Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже."),e}))]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,u,i=[],a=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;a=!1}else for(;!(a=(n=c.call(r)).done)&&(i.push(n.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=r.return&&(u=r.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return J(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?J(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];(function(e,t){var r=document.querySelector(".places__list");r.innerHTML="",e.forEach((function(e){var n=P(e,t);r.append(n)}))})(o,(ee=c)._id),Q.textContent=ee.name,R.textContent=ee.about,ee.avatar&&(Z.style.backgroundImage="url(".concat(ee.avatar,")"))})).catch((function(e){console.error("Ошибка при загрузке данных:",e)}))})();