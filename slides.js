const container = document.getElementById('slides-container');
const dotsContainer = document.getElementById('dots');
const counterEl = document.getElementById('counter');

function buildDots() {
  dotsContainer.innerHTML = '';
  slidesData.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot';
    btn.setAttribute('aria-label', `Slide ${i + 1}`);
    btn.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(btn);
  });
}

function updateDots(index) {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function updateCounter(index) {
  const total = slidesData.length;
  counterEl.textContent =
    `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}

function renderCover(data) {
  const namesHtml = data.names.map(n => `<span>${n}</span>`).join('');
  return `
    <div class="cover-content">
      <h1 class="cover-title">${data.title}</h1>
      <div class="cover-accent"></div>
      <p class="cover-subtitle">${data.subtitle}</p>
      <div class="cover-names">${namesHtml}</div>
    </div>
  `;
}

function renderImages(images) {
  if (!images || !images.length) return '';
  const count = images.length;
  const isGrid = count > 2;
  const items = images.map(img => `
    <figure class="slide-figure${isGrid ? ' grid' : count > 1 ? ' multi' : ''}">
      <img src="${img.url}" alt="${img.alt}" loading="lazy" />
      ${img.label ? `<figcaption>${img.label}</figcaption>` : ''}
    </figure>
  `).join('');
  return `<div class="slide-images${isGrid ? ' grid' : count > 1 ? ' multi' : ''}">${items}</div>`;
}

function renderContentSlide(data, index, total) {
  const paragraphs = data.content.split('\n\n').filter(Boolean);
  const contentHtml = paragraphs.map(p =>
    `<p class="slide-content">${p.trim()}</p>`
  ).join('');

  const hasImages = data.images && data.images.length;
  const imageHtml = renderImages(data.images);

  const textColumn = `
    <div class="slide-text${hasImages ? ' has-image' : ''}">
      <div class="slide-header">
        <span class="slide-label">ARQUIVO HISTÓRICO</span>
        <span class="slide-number">${index + 1} / ${total}</span>
      </div>
      <h2 class="slide-title">${data.title}</h2>
      ${contentHtml}
    </div>
  `;

  if (hasImages) {
    return `
      <div class="slide-layout">
        ${textColumn}
        <div class="slide-media">${imageHtml}</div>
      </div>
    `;
  }

  return textColumn;
}

function renderSlide(index) {
  const data = slidesData[index];
  const total = slidesData.length;

  container.innerHTML = '';

  const slide = document.createElement('div');
  slide.className = 'slide';

  if (data.type === 'cover') {
    slide.innerHTML = renderCover(data);
  } else {
    slide.innerHTML = renderContentSlide(data, index, total);
  }

  /* add staple marks */
  const stapleL = document.createElement('div');
  stapleL.className = 'staple-left';
  const stapleR = document.createElement('div');
  stapleR.className = 'staple-right';
  slide.appendChild(stapleL);
  slide.appendChild(stapleR);

  container.appendChild(slide);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      slide.classList.add('active');
    });
  });

  updateDots(index);
  updateCounter(index);
}
