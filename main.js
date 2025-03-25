(()=>{"use strict";var e=document.querySelector(".popup_type_image");function t(e){e.classList.add("popup_is-opened")}function n(e){e.classList.remove("popup_is-opened")}function r(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&(n(t),document.removeEventListener("keydown",r))}}function o(n,r){var o=n.name,u=n.link,i=n._id,a=n.owner,l=n.likes,p=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);p.setAttribute("data-id",i);var d=p.querySelector(".card__image"),_=p.querySelector(".card__title"),y=p.querySelector(".card__delete-button"),f=p.querySelector(".card__like-button"),m=p.querySelector(".card__like-count");return d.src=u,d.alt=o,_.textContent=o,m.textContent=l.length,r!==a._id?y.style.display="none":y.addEventListener("click",(function(){var e;s("/cards/".concat(e=i),{method:"DELETE"}).then((function(){var t=document.querySelector('[data-id="'.concat(e,'"]'));t&&t.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e),alert("Не удалось удалить карточку. Пожалуйста, попробуйте ещё раз.")}))})),l.some((function(e){return e._id===r}))&&f.classList.add("card__like-button_is-active"),f.addEventListener("click",(function(){var e=p.getAttribute("data-id");f.classList.contains("card__like-button_is-active")?function(e){s("/cards/likes/".concat(e),{method:"DELETE"}).then((function(e){c(e)}))}(e):function(e){s("/cards/likes/".concat(e),{method:"PUT"}).then((function(e){c(e)}))}(e)})),d.addEventListener("click",(function(){return function(n,r){var o=e.querySelector(".popup__image"),c=e.querySelector(".popup__caption");o.src=n,o.alt=r,c.textContent=r,t(e)}(u,o)})),p}function c(e){var t=document.querySelector('[data-id="'.concat(e._id,'"]')),n=t.querySelector(".card__like-button");t.querySelector(".card__like-count").textContent=e.likes.length,_().then((function(t){e.likes.some((function(e){return e._id===t._id}))?n.classList.add("card__like-button_is-active"):n.classList.remove("card__like-button_is-active")}))}function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return(t=function(e){var t=function(e){if("object"!=u(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==u(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p={baseUrl:"https://nomoreparties.co/v1/apf-cohort-202",headers:{authorization:"e7ed7294-3c81-43c8-872d-a5a1eadbb865","Content-Type":"application/json"}},d=null;function s(e,t){return fetch("".concat(p.baseUrl).concat(e),a(a({},t),{},{headers:p.headers})).then((function(e){return e.ok?e.json():e.json().then((function(t){return Promise.reject("Ошибка: ".concat(e.status," - ").concat(t.message))}))}))}function _(){return d?Promise.resolve(d):s("/users/me",{method:"GET"}).then((function(e){return d=e,e}))}var y=document.querySelector(".popup_type_edit");function f(e){e.preventDefault();var t={name:v.value,about:b.value};s("/users/me",{method:"PATCH",body:JSON.stringify(t)}).then((function(e){S.textContent=e.name,h.textContent=e.about,n(y)})).catch((function(e){return alert("Не удалось обновить профиль.")}))}var m=y.querySelector(".popup__form"),v=m.querySelector(".popup__input_type_name"),b=m.querySelector(".popup__input_type_description"),S=document.querySelector(".profile__title"),h=document.querySelector(".profile__description");m.addEventListener("submit",f);var q=document.querySelector(".popup_type_new-card"),E=q.querySelector(".popup__form"),g=E.querySelector(".popup__input_type_card-name"),L=E.querySelector(".popup__input_type_url"),k=E.querySelector(".popup__button"),O=document.querySelector(".popup_type_edit").querySelector(".popup__form"),j=document.querySelector(".places__list");function P(e,t){e.preventDefault();var r={name:g.value,link:L.value};s("/cards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(e){var r=o(e,t._id);j.prepend(r),n(q),E.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e),alert("Не удалось добавить карточку. Попробуйте снова.")}))}function w(){O.checkValidity()?(O.querySelector(".popup__button").classList.remove("popup__button_disabled"),O.querySelector(".popup__button").disabled=!1):(O.querySelector(".popup__button").classList.add("popup__button_disabled"),O.querySelector(".popup__button").disabled=!0)}function C(){E.checkValidity()?(k.classList.remove("popup__button_disabled"),k.disabled=!1):(k.classList.add("popup__button_disabled"),k.disabled=!0)}function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var A=document.querySelector(".popup_type_edit"),x=document.querySelector(".popup_type_new-card"),D=(document.querySelector(".popup_type_image"),document.querySelector(".profile__edit-button")),I=document.querySelector(".profile__add-button"),N=document.querySelectorAll(".popup__close"),H=A.querySelector(".popup__form"),J=H.querySelector(".popup__input_type_name"),U=H.querySelector(".popup__input_type_description"),M=document.querySelector(".profile__title"),V=document.querySelector(".profile__description");D.addEventListener("click",(function(){J.value=M.textContent,U.value=V.textContent,t(A)})),H.addEventListener("submit",f),J.addEventListener("input",w),U.addEventListener("input",w);var G=x.querySelector(".popup__form"),z=G.querySelector(".popup__input_type_card-name"),$=G.querySelector(".popup__input_type_url");G.querySelector(".popup__button"),z.addEventListener("input",(function(){Y(z),C()})),$.addEventListener("input",(function(){Y($),C()})),I.addEventListener("click",(function(){G.reset(),C(),t(x)})),G.addEventListener("submit",P),N.forEach((function(e){e.addEventListener("click",(function(e){n(e.target.closest(".popup"))}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&n(e)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){n(e.closest(".popup")),document.removeEventListener("keydown",r)}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){document.querySelector(".popup_type_edit").classList.add("popup_is-opened"),document.addEventListener("keydown",r)}));var B=null;Promise.all([s("/cards",{method:"GET"}),B?Promise.resolve(B):_().then((function(e){return B=e,e})).catch((function(e){throw console.error("Ошибка при загрузке данных пользователя:",e),alert("Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже."),e}))]).then((function(e){var t,n;!function(e){var t=document.querySelector(".places__list");t.innerHTML="",e.forEach((function(e){var n=o(e,undefined);t.append(n)}))}((t=e,n=1,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,i=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return T(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?T(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0]),M.textContent=B.name,V.textContent=B.about})).catch((function(e){console.error("Ошибка при загрузке данных:",e)}));var F=document.querySelector(".profile__edit-avatar-button"),K=document.querySelector(".popup_type_edit-avatar"),Q=K.querySelector(".popup__input_type_avatar"),R=K.querySelector(".popup__form"),W=K.querySelector(".popup__button"),X=document.querySelector(".profile__image");function Y(e){var t=document.querySelector('[data-error-for="'.concat(e.name,'"]'));t?e.validity.valid?t.textContent="":t.textContent=e.validationMessage:console.error("Элемент для отображения ошибки не найден: ".concat(e.name))}F.addEventListener("click",(function(){var e=X.style.backgroundImage;if(e&&"none"!==e){var n=e.match(/url\(["']?(.*?)["']?\)/);Q.value=n?n[1]:""}else Q.value="";t(K)})),Q.addEventListener("input",(function(){R.checkValidity()?(W.classList.remove("popup__button_disabled"),W.disabled=!1):(W.classList.add("popup__button_disabled"),W.disabled=!0)})),R.addEventListener("submit",(function(e){e.preventDefault();var t={avatar:Q.value};s("/users/me/avatar",{method:"PATCH",body:JSON.stringify(t)}).then((function(e){X.style.backgroundImage="url(".concat(e.avatar,")"),n(K)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),alert("Не удалось обновить аватар. Пожалуйста, попробуйте позже.")}))})),R.addEventListener("submit",(function(e){if(e.preventDefault(),Q)if(Q.value){var t={avatar:Q.value};s("/users/me/avatar",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){console.log("Аватар успешно обновлен:",e),document.querySelector(".profile__image").style.backgroundImage="url(".concat(e.avatar,")"),n(K)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),alert("Не удалось обновить аватар. Попробуйте позже.")}))}else alert("Пожалуйста, введите ссылку на аватар.");else console.error("Элемент avatarInput не найден")})),G.addEventListener("submit",(function(e){P(e,B)}))})();