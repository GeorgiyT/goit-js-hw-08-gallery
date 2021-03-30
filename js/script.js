import gallery from "./gallery-items.js";

const galleryList = document.querySelector(".js-gallery");
const galleryModal = document.querySelector(".js-lightbox");
const galleryModalCloseButton = document.querySelector(".lightbox__button");
const galleryModalImage = document.querySelector(".lightbox__image");

let galleryItems = [];

gallery.forEach((el) => {
  const tempElementString = `<li>
    <a href = "${el.original}">
        <img
        class="gallery__image"
        src="${el.preview}"
        data-source="${el.original}"
        alt="${el.description}">
    </a>
  </li>`;
  galleryItems.push(tempElementString);
});
galleryList.insertAdjacentHTML("afterbegin", galleryItems.join(""));

const makeMarkup = function (e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  e.preventDefault();
  galleryModalImage.setAttribute("src", `${e.target.dataset.source}`);
  galleryModalImage.setAttribute("alt", `${e.target.getAttribute("alt")}`);
  openModal();
};

const openModal = () => {
  galleryModal.classList.add("is-open");
  galleryModalCloseButton.addEventListener("click", closeModal);
  galleryList.removeEventListener("click", makeMarkup);
};

const closeModal = () => {
  galleryModal.classList.remove("is-open");
  galleryList.addEventListener("click", makeMarkup);
  galleryModalCloseButton.removeEventListener("click", closeModal);
  galleryModalImage.setAttribute("src", "");
  galleryModalImage.setAttribute("alt", "");
};

galleryList.addEventListener("click", makeMarkup);
