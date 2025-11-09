document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('icue-murals-main');
  if (!mainImage) return;

  const swatches = document.querySelectorAll('.icue-murals__swatch');
  swatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
      const image = swatch.dataset.image;
      if (!image || mainImage.getAttribute('src') === image) {
        return;
      }

      swatches.forEach((btn) => btn.classList.remove('active'));
      swatch.classList.add('active');

      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.setAttribute('src', image);
        mainImage.style.opacity = '1';
      }, 200);
    });
  });
});


