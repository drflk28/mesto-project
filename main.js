(()=>{"use strict";var e=document.querySelector(".popup_type_image");function t(e){e.classList.add("popup_is-opened")}function n(e){e.classList.remove("popup_is-opened")}function r(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&(n(t),document.removeEventListener("keydown",r))}}function o(n,r){var o=n.name,u=n.link,i=n._id,a=n.owner,l=n.likes,p=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);p.setAttribute("data-id",i);var d=p.querySelector(".card__image"),_=p.querySelector(".card__title"),y=p.querySelector(".card__delete-button"),f=p.querySelector(".card__like-button"),m=p.querySelector(".card__like-count");return d.src=u,d.alt=o,_.textContent=o,m.textContent=l.length,r!==a._id?y.style.display="none":y.addEventListener("click",(function(){var e;s("/cards/".concat(e=i),{method:"DELETE"}).then((function(){var t=document.querySelector('[data-id="'.concat(e,'"]'));t&&t.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e),alert("Не удалось удалить карточку. Пожалуйста, попробуйте ещё раз.")}))})),l.some((function(e){return e._id===r}))&&f.classList.add("card__like-button_is-active"),f.addEventListener("click",(function(){var e=p.getAttribute("data-id");f.classList.contains("card__like-button_is-active")?function(e,t){return s("/cards/likes/".concat(e),{method:"DELETE"}).then((function(e){return c(e,t),e}))}(e,r).then((function(){f.classList.remove("card__like-button_is-active")})):function(e,t){return s("/cards/likes/".concat(e),{method:"PUT"}).then((function(e){return c(e,t),e}))}(e,r).then((function(){f.classList.add("card__like-button_is-active")}))})),d.addEventListener("click",(function(){return function(n,r){var o=e.querySelector(".popup__image"),c=e.querySelector(".popup__caption");o.src=n,o.alt=r,c.textContent=r,t(e)}(u,o)})),p}function c(e,t){var n=document.querySelector('[data-id="'.concat(e._id,'"]'));if(n){var r=n.querySelector(".card__like-button");n.querySelector(".card__like-count").textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))?r.classList.add("card__like-button_is-active"):r.classList.remove("card__like-button_is-active")}}function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return(t=function(e){var t=function(e){if("object"!=u(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==u(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p={baseUrl:"https://nomoreparties.co/v1/apf-cohort-202",headers:{authorization:"e7ed7294-3c81-43c8-872d-a5a1eadbb865","Content-Type":"application/json"}},d=null;function s(e,t){return fetch("".concat(p.baseUrl).concat(e),a(a({},t),{},{headers:p.headers})).then((function(e){return e.ok?e.json():e.json().then((function(t){return Promise.reject("Ошибка: ".concat(e.status," - ").concat(t.message))}))}))}var _=document.querySelector(".popup_type_edit");function y(e){e.preventDefault();var t={name:m.value,about:v.value};s("/users/me",{method:"PATCH",body:JSON.stringify(t)}).then((function(e){b.textContent=e.name,S.textContent=e.about,n(_)})).catch((function(e){return alert("Не удалось обновить профиль.")}))}var f=_.querySelector(".popup__form"),m=f.querySelector(".popup__input_type_name"),v=f.querySelector(".popup__input_type_description"),b=document.querySelector(".profile__title"),S=document.querySelector(".profile__description");f.addEventListener("submit",y);var q=document.querySelector(".popup_type_new-card"),h=q.querySelector(".popup__form"),g=h.querySelector(".popup__input_type_card-name"),L=h.querySelector(".popup__input_type_url"),k=h.querySelector(".popup__button"),E=document.querySelector(".places__list"),O=document.querySelector(".popup_type_edit").querySelector(".popup__form");function j(){O.checkValidity()?(O.querySelector(".popup__button").classList.remove("popup__button_disabled"),O.querySelector(".popup__button").disabled=!1):(O.querySelector(".popup__button").classList.add("popup__button_disabled"),O.querySelector(".popup__button").disabled=!0)}function C(){h.checkValidity()?(k.classList.remove("popup__button_disabled"),k.disabled=!1):(k.classList.add("popup__button_disabled"),k.disabled=!0)}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var w=document.querySelector(".popup_type_edit"),x=document.querySelector(".popup_type_new-card"),T=(document.querySelector(".popup_type_image"),document.querySelector(".profile__edit-button")),A=document.querySelector(".profile__add-button"),D=document.querySelectorAll(".popup__close"),I=w.querySelector(".popup__form"),N=I.querySelector(".popup__input_type_name"),U=I.querySelector(".popup__input_type_description"),H=document.querySelector(".profile__title"),J=document.querySelector(".profile__description");T.addEventListener("click",(function(){N.value=H.textContent,U.value=J.textContent,t(w)})),I.addEventListener("submit",y),N.addEventListener("input",j),U.addEventListener("input",j);var M=x.querySelector(".popup__form"),V=M.querySelector(".popup__input_type_card-name"),G=M.querySelector(".popup__input_type_url");M.querySelector(".popup__button"),V.addEventListener("input",(function(){X(V),C()})),G.addEventListener("input",(function(){X(G),C()})),M.addEventListener("submit",(function(e){z?function(e,t){e.preventDefault();var r={name:g.value,link:L.value},c=e.target.querySelector(".popup__button"),u=c.textContent;c.disabled=!0,c.textContent="Сохранение...",s("/cards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(e){var r=o(e,t);E.prepend(r),n(q),h.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e),alert("Не удалось добавить карточку. Попробуйте снова.")})).finally((function(){c.disabled=!1,c.textContent=u}))}(e,z._id):(console.error("Данные пользователя не загружены"),alert("Не удалось загрузить данные пользователя. Пожалуйста, обновите страницу."))})),A.addEventListener("click",(function(){M.reset(),C(),t(x)})),D.forEach((function(e){e.addEventListener("click",(function(e){n(e.target.closest(".popup"))}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&n(e)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){n(e.closest(".popup")),document.removeEventListener("keydown",r)}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){document.querySelector(".popup_type_edit").classList.add("popup_is-opened"),document.addEventListener("keydown",r)}));var z=null;Promise.all([s("/cards",{method:"GET"}),z?Promise.resolve(z):(d?Promise.resolve(d):s("/users/me",{method:"GET"}).then((function(e){return d=e,e}))).then((function(e){return z=e,e.avatar&&(R.style.backgroundImage="url(".concat(e.avatar,")")),e})).catch((function(e){throw console.error("Ошибка при загрузке данных пользователя:",e),alert("Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже."),e}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,i=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return P(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?P(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],u=r[1];(function(e,t){var n=document.querySelector(".places__list");n.innerHTML="",e.forEach((function(e){var r=o(e,t);n.append(r)}))})(c,(z=u)._id),H.textContent=z.name,J.textContent=z.about,z.avatar&&(R.style.backgroundImage="url(".concat(z.avatar,")"))})).catch((function(e){console.error("Ошибка при загрузке данных:",e)}));var $=document.querySelector(".profile__edit-avatar-button"),B=document.querySelector(".popup_type_edit-avatar"),F=B.querySelector(".popup__input_type_avatar"),K=B.querySelector(".popup__form"),Q=B.querySelector(".popup__button"),R=document.querySelector(".profile__image");function W(){K.checkValidity()?(Q.classList.remove("popup__button_disabled"),Q.disabled=!1):(Q.classList.add("popup__button_disabled"),Q.disabled=!0)}function X(e){var t=document.querySelector('[data-error-for="'.concat(e.name,'"]'));t?e.validity.valid?t.textContent="":t.textContent=e.validationMessage:console.error("Элемент для отображения ошибки не найден: ".concat(e.name))}$.addEventListener("click",(function(){F.value="",W(),t(B)})),F.addEventListener("input",W),K.addEventListener("submit",(function(e){e.preventDefault(),e.stopPropagation();var t=F.value.trim();if(t){var r=e.target.querySelector(".popup__button"),o=r.textContent;r.disabled=!0,r.textContent="Сохранение...",function(e){return s("/users/me/avatar",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({avatar:e})})}(t).then((function(e){R.style.backgroundImage="url(".concat(e.avatar,")"),n(B),F.value=""})).catch((function(e){console.error("Ошибка:",e),alert("Ошибка: ".concat(e.message||"Не удалось обновить аватар"))})).finally((function(){r.disabled=!1,r.textContent=o}))}else alert("Пожалуйста, введите ссылку на аватар.")}))})();