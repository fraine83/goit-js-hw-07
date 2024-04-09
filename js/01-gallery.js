import { galleryItems } from './gallery-items.js';

// Change code below this line

const galleryList = document.querySelector(".gallery");

const createGallery = (el) => {
    return el.map (({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
  `;   
    })
    .join("");
};

const photosMarkup = createGallery(galleryItems);
galleryList.insertAdjacentHTML("beforeend", photosMarkup);

// //  -------------------------------------------

// const handleGalleryClick = (event) => {
//     event.preventDefault();

//     if (event.target.nodeName !== "IMG") {
//         return;
//     }

//     const urlOriginal = event.target.dataset.source;
//     let currentIndex = galleryItems.findIndex(item => item.original === urlOriginal);

//     // Corrected template string usage with backticks
//     const instance = basicLightbox.create(`<img src="${urlOriginal}">`);
//     instance.show();
//     // Add event listener to handle Escape key press
//     document.addEventListener("keydown", handleKeyPress);

//     function handleKeyPress(event) {
//         if (event.key === "Escape") {
//             instance.close(); // Close the lightbox
//             document.removeEventListener("keydown", handleKeyPress); // Remove the event listener
//         }
//     }
   
// };

// galleryList.addEventListener("click", handleGalleryClick);

const handleGalleryClick = (event) => {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
      return;
  }

  const urlOriginal = event.target.dataset.source;
  let currentIndex = galleryItems.findIndex(item => item.original === urlOriginal);

  // Corrected template string usage with backticks
  const instance = basicLightbox.create(`<img src="${urlOriginal}">`);
  instance.show();

  // Add event listeners for left and right arrow key press
  document.addEventListener("keydown", handleKeyPress);

  function handleKeyPress(event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          // Calculate the index of the next or previous image
          if (event.key === "ArrowLeft") {
              currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
          } else {
              currentIndex = (currentIndex + 1) % galleryItems.length;
          }

          // Get the URL of the next or previous image
          const newUrlOriginal = galleryItems[currentIndex].original;

          // Update the lightbox with the new image
          instance.element().querySelector("img").setAttribute("src", newUrlOriginal);

          // Update the current image URL
          urlOriginal = newUrlOriginal;
      } else if (event.key === "Escape") {
          instance.close(); // Close the lightbox
          document.removeEventListener("keydown", handleKeyPress); // Remove the event listener
      }
  }

  // Remove the event listener when the lightbox is closed
  instance.element().addEventListener("lightbox-close", () => {
      document.removeEventListener("keydown", handleKeyPress);
  });
};

galleryList.addEventListener("click", handleGalleryClick);

