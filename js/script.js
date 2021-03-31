import gallery from "./gallery-items.js";

const galleryList = document.querySelector(".js-gallery");
const galleryModal = document.querySelector(".js-lightbox");
// const galleryModalCloseButton = document.querySelector(".lightbox__button");
const galleryModalImage = document.querySelector(".lightbox__image");

let galleryItems = [];

gallery.forEach((el, index) => {
  const tempElementString = `<li>
    <a href = "${el.original}">
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

const arrowFunction = (e) => {
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
  window.addEventListener("keyup", arrowFunction);
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
  window.removeEventListener("keyup", arrowFunction);
  galleryModalImage.setAttribute("src", "");
  galleryModalImage.setAttribute("alt", "");
};

galleryList.addEventListener("click", makeMarkup);
