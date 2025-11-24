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

  // 토글 버튼 기능
  const toggleButton = document.querySelector('.icue-murals__toggle');
  const palette = document.querySelector('.icue-murals__palette');
  
  if (toggleButton && palette) {
    toggleButton.addEventListener('click', () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        // 접기
        toggleButton.setAttribute('aria-expanded', 'false');
        palette.classList.add('collapsed');
      } else {
        // 펼치기
        toggleButton.setAttribute('aria-expanded', 'true');
        palette.classList.remove('collapsed');
      }
    });
  }
});


