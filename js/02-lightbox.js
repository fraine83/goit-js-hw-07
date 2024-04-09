import { galleryItems } from './gallery-items.js';
// Change code below this line


const galleryList = document.querySelector(".gallery");

const createGallery = (el) => {
    return el.map (({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
       <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
 </li>`
 ;   
    })
    .join("");
};

const photosMarkup = createGallery(galleryItems);
galleryList.insertAdjacentHTML("beforeend", photosMarkup);


document.addEventListener('DOMContentLoaded', () => {
    // Initialize SimpleLightbox
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt', // Use alt attribute for captions
        captionDelay: 250 // Caption delay in milliseconds
    });
});



// console.log(galleryItems);
