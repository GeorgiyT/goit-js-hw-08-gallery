import gallery from "./gallery-items.js";

const galleryList = document.querySelector(".js-gallery");
const galleryModal = document.querySelector(".js-lightbox");
// const galleryModalCloseButton = document.querySelector(".lightbox__button");
const galleryModalImage = document.querySelector(".lightbox__image");

let galleryItems = [];

gallery.forEach((el, index) => {
  const tempElementString = `<li class="gallery__item">
    <a href = "${el.original}" class="gallery__link">
        <img
        class="gallery__image"
        src="${el.preview}"
        data-source="${el.original}"
        alt="${el.description}"
        id="${index}">
    </a>
  </li>`;
  galleryItems.push(tempElementString);
});
galleryList.insertAdjacentHTML("afterbegin", galleryItems.join(""));

const makeMarkup = function (e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }
  galleryModalImage.setAttribute("src", `${e.target.dataset.source}`);
  galleryModalImage.setAttribute("alt", `${e.target.getAttribute("alt")}`);
  galleryModalImage.setAttribute("id", `${e.target.getAttribute("id")}`);
  openModal();
};

// Думал вытащить из galleryItems, но что - то так и не понял как, это можно сделать,
// по сути картинку я могу выбирать по положению массива, а вот как потом адекватно выбарть
// из строки нужные данные я так и не придумал.. Если есть возможность можете подсказать ?
// Это нормально если я после того как загрузил разметку через insertAdjacentHTML и
// потом из нее же выбираю объекты картинок
// imageList = galleryList.querySelectorAll("img") ?

const keyboardFunction = (e) => {
  // console.log(e.target.firstElementChild.id);
  const imageList = galleryList.querySelectorAll("img");
  let nextImageId = +imageList[
    galleryModalImage.getAttribute("id")
  ].getAttribute("id");

  if (e.code === "Escape") {
    closeModal(e);
  } else if (e.code === "ArrowRight") {
    nextImageId++;
    if (nextImageId < imageList.length) {
      galleryModalImage.setAttribute(
        "src",
        `${imageList[nextImageId].dataset.source}`
      );
      galleryModalImage.setAttribute("alt", `${imageList[nextImageId].alt}`);
      galleryModalImage.setAttribute("id", `${imageList[nextImageId].id}`);
    }
  } else if (e.code === "ArrowLeft") {
    nextImageId--;
    if (nextImageId >= 0) {
      galleryModalImage.setAttribute(
        "src",
        `${imageList[nextImageId].dataset.source}`
      );
      galleryModalImage.setAttribute("alt", `${imageList[nextImageId].alt}`);
      galleryModalImage.setAttribute("id", `${imageList[nextImageId].id}`);
    }
  }
};

const openModal = () => {
  galleryModal.classList.add("is-open");
  galleryModal.addEventListener("click", closeModal);
  window.addEventListener("keyup", keyboardFunction);
  galleryList.removeEventListener("click", makeMarkup);
};

const closeModal = (e) => {
  e.preventDefault();
  if (e.target.nodeName === "IMG") {
    return;
  }
  galleryModal.classList.remove("is-open");
  galleryList.addEventListener("click", makeMarkup);
  galleryModal.removeEventListener("click", closeModal);
  window.removeEventListener("keyup", keyboardFunction);
  galleryModalImage.setAttribute("src", "");
  galleryModalImage.setAttribute("alt", "");
};

galleryList.addEventListener("click", makeMarkup);

// -------------------------------------

// import gallery from "./gallery-items.js";

// const galleryList = document.querySelector(".js-gallery");
// const galleryModal = document.querySelector(".js-lightbox");
// const bigPicture = document.querySelector(".lightbox__image");
// const overlay = document.querySelector(".lightbox__overlay");
// const closeBtn = document.querySelector(".lightbox__button");
// gallery.forEach((el, index) => {
//   const listRef = `<li class="gallery__item">
// <a
//   class="gallery__link"
//   href="${el.original}"
// >
//   <img
//     class="gallery__image"
//     src="${el.preview}"
//     data-source="${el.original}"
//     alt="${el.description}"
//     data-index="${index}"
//   />
// </a>
// </li>`;

//   galleryList.insertAdjacentHTML("beforeend", listRef);
// });
// const makeMarkupModal = (e) => {
//   e.preventDefault();
//   if (e.target.nodeName !== "IMG") {
//     return;
//   }
//   bigPicture.src = e.target.dataset.source;
//   bigPicture.alt = e.target.alt;
//   onModalOpen();
// };
// const onModalOpen = () => {
//   galleryModal.classList.add("is-open");
//   window.addEventListener("keydown", onEscClick);
//   window.addEventListener("keydown", onkeyboardsClick);
// };
// const closeModal = (e) => {
//   galleryModal.classList.remove("is-open");
//   bigPicture.src = "";
//   bigPicture.alt = "";
//   window.removeEventListener("keydown", onEscClick);
//   window.removeEventListener("keydown", onkeyboardsClick);
// };
// const onEscClick = (e) => {
//   if (e.key === "Escape") {
//     closeModal();
//   }
// };
// const onOverlayClick = (e) => {
//   if (e.target === overlay) {
//     closeModal();
//   }
// };
// const onkeyboardsClick = (e) => {
//   let i = +e.target.firstElementChild.dataset.index;
//   console.log(e.target.firstElementChild);
//   if (e.key === "keyboardLeft" && i > 0) {
//     i -= 1;
//     slider(e, i);
//   } else if (e.key === "keyboardLeft" && i === 0) {
//     i = gallery.length - 1;
//     slider(e, i);
//   } else if (e.key === "keyboardRight" && i < gallery.length - 1) {
//     i += 1;
//     slider(e, i);
//   } else if (e.key === "keyboardRight" && i === gallery.length - 1) {
//     i = 0;
//     slider(e, i);
//   }
// };
// const slider = (e, index) => {
//   e.target.firstElementChild.dataset.index = index;
//   bigPicture.src = gallery[index].original;
// };
// galleryList.addEventListener("click", makeMarkupModal);
// closeBtn.addEventListener("click", closeModal);
// galleryModal.addEventListener("click", onOverlayClick);
