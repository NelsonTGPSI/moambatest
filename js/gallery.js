document.addEventListener('DOMContentLoaded', () => {
  // Immediately load all images
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });

  // Lightbox functionality (guarded)
  const lightbox = document.getElementById('lightbox');
  if(lightbox){
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const galleryItems = document.querySelectorAll('.m-item img');
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        if(lightboxImg){
          lightboxImg.src = item.src;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});

// (no duplicate handlers)
