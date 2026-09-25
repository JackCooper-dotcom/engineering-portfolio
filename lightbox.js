// Lightbox: click any element with class "project-image" to view it
// enlarged over a darkened background. Closes on: close button, click
// outside the image, or Escape key. No external library required.
document.addEventListener('DOMContentLoaded', function () {
  var images = document.querySelectorAll('.project-image');
  if (!images.length) return;

  // Build the overlay once and reuse it for every image on the page.
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close enlarged image">&times;</button>' +
    '<img class="lightbox-content" src="" alt="">';
  document.body.appendChild(overlay);

  var lightboxImg = overlay.querySelector('.lightbox-content');
  var closeBtn = overlay.querySelector('.lightbox-close');
  var lastFocused = null;

  function openLightbox(src, alt) {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent background scroll
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
    if (lastFocused) lastFocused.focus();
  }

  images.forEach(function (img) {
    // Make each project image behave like a clickable control.
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    var label = img.getAttribute('alt') || 'Project image';
    img.setAttribute('aria-label', label + ' — click to enlarge');

    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img.src, img.alt);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  // Click outside the image (on the dark background) closes it.
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeLightbox();
    }
  });
});
