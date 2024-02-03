import { galleryItems } from './gallery-items.js';


document.addEventListener('DOMContentLoaded', function () {
  const galleryList = document.querySelector('.gallery');

  // Dynamically generate gallery items
  galleryItems.forEach(item => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');

    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery__link');
    galleryLink.href = item.original;

    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery__image');
    galleryImage.src = item.preview;
    galleryImage.alt = item.description;
    galleryImage.dataset.source = item.original;

    galleryLink.appendChild(galleryImage);
    galleryItem.appendChild(galleryLink);
    galleryList.appendChild(galleryItem);
  });

  // Add event listener for opening the modal
  galleryList.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.classList.contains('gallery__image')) {
      const largeImageURL = event.target.dataset.source;

      // Use basicLightbox to create and show the modal
      const lightbox = basicLightbox.create(`
        <img src="${largeImageURL}" width="800" height="600">
      `);

      // Open the modal
      lightbox.show();

      // Add event listener for closing the modal on Escape key press
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          lightbox.close();
        }
      });
    }
  });
});
