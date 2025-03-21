(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{sT:()=>T,xJ:()=>C});var r=document.querySelector(".popup_type_image");function n(e){e.classList.add("popup_is-opened")}function o(e){e.classList.remove("popup_is-opened")}function c(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&(o(t),document.removeEventListener("keydown",c))}}function u(e,t){var o=e.name,c=e.link,u=e._id,a=e.owner,l=e.likes,p=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);p.setAttribute("data-id",u);var d=p.querySelector(".card__image"),s=p.querySelector(".card__title"),_=p.querySelector(".card__delete-button"),f=p.querySelector(".card__like-button"),m=p.querySelector(".card__like-count");return d.src=c,d.alt=o,s.textContent=o,m.textContent=l.length,t!==a._id?_.style.display="none":_.addEventListener("click",(function(){var e;y("/cards/".concat(e=u),{method:"DELETE"}).then((function(){var t=document.querySelector('[data-id="'.concat(e,'"]'));t&&t.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e),alert("Не удалось удалить карточку. Пожалуйста, попробуйте ещё раз.")}))})),l.some((function(e){return e._id===t}))&&f.classList.add("card__like-button_is-active"),f.addEventListener("click",(function(){var e=p.getAttribute("data-id");f.classList.contains("card__like-button_is-active")?function(e){y("/cards/likes/".concat(e),{method:"DELETE"}).then((function(e){i(e)}))}(e):function(e){y("/cards/likes/".concat(e),{method:"PUT"}).then((function(e){i(e)}))}(e)})),d.addEventListener("click",(function(){return function(e,t){var o=r.querySelector(".popup__image"),c=r.querySelector(".popup__caption");o.src=e,o.alt=t,c.textContent=t,n(r)}(c,o)})),p}function i(e){var t=document.querySelector('[data-id="'.concat(e._id,'"]')),r=t.querySelector(".card__like-button");t.querySelector(".card__like-count").textContent=e.likes.length,f().then((function(t){e.likes.some((function(e){return e._id===t._id}))?r.classList.add("card__like-button_is-active"):r.classList.remove("card__like-button_is-active")}))}function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){d(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t,r){return(t=function(e){var t=function(e){if("object"!=a(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,"string");if("object"!=a(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==a(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s={baseUrl:"https://nomoreparties.co/v1/apf-cohort-202",headers:{authorization:"e7ed7294-3c81-43c8-872d-a5a1eadbb865","Content-Type":"application/json"}},_=null;function y(e,t){return fetch("".concat(s.baseUrl).concat(e),p(p({},t),{},{headers:s.headers})).then((function(e){return e.ok?e.json():e.json().then((function(t){return Promise.reject("Ошибка: ".concat(e.status," - ").concat(t.message))}))}))}function f(){return _?Promise.resolve(_):y("/users/me",{method:"GET"}).then((function(e){return _=e,e}))}var m=document.querySelector(".popup_type_edit");function v(e){e.preventDefault();var t={name:S.value,about:h.value};y("/users/me",{method:"PATCH",body:JSON.stringify(t)}).then((function(e){q.textContent=e.name,g.textContent=e.about,o(m)})).catch((function(e){return alert("Не удалось обновить профиль.")}))}var b=m.querySelector(".popup__form"),S=b.querySelector(".popup__input_type_name"),h=b.querySelector(".popup__input_type_description"),q=document.querySelector(".profile__title"),g=document.querySelector(".profile__description");b.addEventListener("submit",v);var E=document.querySelector(".popup_type_new-card"),L=E.querySelector(".popup__form"),k=L.querySelector(".popup__input_type_card-name"),O=L.querySelector(".popup__input_type_url"),j=L.querySelector(".popup__button"),P=document.querySelector(".popup_type_edit").querySelector(".popup__form"),w=document.querySelector(".places__list");function C(){P.checkValidity()?(P.querySelector(".popup__button").classList.remove("popup__button_disabled"),P.querySelector(".popup__button").disabled=!1):(P.querySelector(".popup__button").classList.add("popup__button_disabled"),P.querySelector(".popup__button").disabled=!0)}function T(){L.checkValidity()?(j.classList.remove("popup__button_disabled"),j.disabled=!1):(j.classList.add("popup__button_disabled"),j.disabled=!0)}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}L.addEventListener("submit",(function(e){e.preventDefault();var t={name:k.value,link:O.value};y("/cards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){var t=u(e,userData._id);w.prepend(t),o(E),L.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e),alert("Не удалось добавить карточку. Попробуйте снова.")}))}));var A=document.querySelector(".popup_type_edit"),D=document.querySelector(".popup_type_new-card"),I=(document.querySelector(".popup_type_image"),document.querySelector(".profile__edit-button")),J=document.querySelector(".profile__add-button"),M=document.querySelectorAll(".popup__close"),N=A.querySelector(".popup__form"),H=N.querySelector(".popup__input_type_name"),U=N.querySelector(".popup__input_type_description"),V=document.querySelector(".profile__title"),G=document.querySelector(".profile__description");I.addEventListener("click",(function(){H.value=V.textContent,U.value=G.textContent,n(A)})),N.addEventListener("submit",v),H.addEventListener("input",C),U.addEventListener("input",C);var z=D.querySelector(".popup__form"),F=z.querySelector(".popup__input_type_card-name"),$=z.querySelector(".popup__input_type_url");z.querySelector(".popup__button"),F.addEventListener("input",(function(){Z(F),T()})),$.addEventListener("input",(function(){Z($),T()})),J.addEventListener("click",(function(){z.reset(),T(),n(D)})),z.addEventListener("submit",t.handleCardFormSubmit),M.forEach((function(e){e.addEventListener("click",(function(e){o(e.target.closest(".popup"))}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&o(e)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){o(e.closest(".popup")),document.removeEventListener("keydown",c)}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){document.querySelector(".popup_type_edit").classList.add("popup_is-opened"),document.addEventListener("keydown",c)}));var B=null;Promise.all([y("/cards",{method:"GET"}),B?Promise.resolve(B):f().then((function(e){return B=e,e})).catch((function(e){throw console.error("Ошибка при загрузке данных пользователя:",e),alert("Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже."),e}))]).then((function(e){var t,r;!function(e){var t=document.querySelector(".places__list");t.innerHTML="",e.forEach((function(e){var r=u(e,undefined);t.append(r)}))}((t=e,r=1,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,u,i=[],a=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;a=!1}else for(;!(a=(n=c.call(r)).done)&&(i.push(n.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=r.return&&(u=r.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return x(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?x(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0]),V.textContent=B.name,G.textContent=B.about})).catch((function(e){console.error("Ошибка при загрузке данных:",e)}));var K=document.querySelector(".profile__edit-avatar-button"),Q=document.querySelector(".popup_type_edit-avatar"),R=Q.querySelector(".popup__input_type_avatar"),W=Q.querySelector(".popup__form"),X=Q.querySelector(".popup__button"),Y=document.querySelector(".profile__image");function Z(e){var t=document.querySelector('[data-error-for="'.concat(e.name,'"]'));t?e.validity.valid?t.textContent="":t.textContent=e.validationMessage:console.error("Элемент для отображения ошибки не найден: ".concat(e.name))}K.addEventListener("click",(function(){var e=Y.style.backgroundImage;if(e&&"none"!==e){var t=e.match(/url\(["']?(.*?)["']?\)/);R.value=t?t[1]:""}else R.value="";n(Q)})),R.addEventListener("input",(function(){W.checkValidity()?(X.classList.remove("popup__button_disabled"),X.disabled=!1):(X.classList.add("popup__button_disabled"),X.disabled=!0)})),W.addEventListener("submit",(function(e){e.preventDefault();var t={avatar:R.value};y("/users/me/avatar",{method:"PATCH",body:JSON.stringify(t)}).then((function(e){Y.style.backgroundImage="url(".concat(e.avatar,")"),o(Q)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),alert("Не удалось обновить аватар. Пожалуйста, попробуйте позже.")}))})),W.addEventListener("submit",(function(e){if(e.preventDefault(),R)if(R.value){var t={avatar:R.value};y("/users/me/avatar",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){console.log("Аватар успешно обновлен:",e),document.querySelector(".profile__image").style.backgroundImage="url(".concat(e.avatar,")"),o(Q)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),alert("Не удалось обновить аватар. Попробуйте позже.")}))}else alert("Пожалуйста, введите ссылку на аватар.");else console.error("Элемент avatarInput не найден")}))})();