let currentIndex = 0;
const totalSlides = slidesData.length;

function goTo(index) {
  if (game.phase !== 'inactive') return;
  if (index < 0 || index >= totalSlides) return;
  if (index === currentIndex) return;
  currentIndex = index;
  renderSlide(currentIndex);
}

function nextSlide() {
  if (game.phase !== 'inactive') return;
  if (currentIndex < totalSlides - 1) goTo(currentIndex + 1);
  else enterGame();
}

function prevSlide() {
  if (game.phase !== 'inactive') return;
  if (currentIndex > 0) goTo(currentIndex - 1);
}

function setupKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    }
    if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      goTo(totalSlides - 1);
    }
  });
}

function setupClickZones() {
  document.getElementById('click-right').addEventListener('click', nextSlide);
  document.getElementById('click-left').addEventListener('click', prevSlide);
}

function setupTouch() {
  let startX = 0;
  let startY = 0;

  document.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - startX;
    const dy = e.changedTouches[0].screenY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });
}
