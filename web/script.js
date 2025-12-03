// Smooth scroll (native via CSS, extra offset if needed)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href').slice(1);
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Cierra el menú móvil al navegar
      navClose();
    }
  });
});

// Menú móvil
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.nav-toggle');
function navClose() { nav.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); }
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Carrusel sencillo
const carousel = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');
const prev = document.querySelector('.carousel-btn.prev');
const next = document.querySelector('.carousel-btn.next');
let index = 0;
let dots = [];
let galleryImgs = [];
function clampIndex() {
  const items = track?.querySelectorAll('img').length || 0;
  if (items === 0) { index = 0; return; }
  index = Math.max(0, Math.min(items - 1, index));
}
function updateDots() {
  dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
}
function updateCarousel() {
  clampIndex();
  const itemWidth = track.querySelector('img')?.getBoundingClientRect().width || 300;
  const gap = parseFloat(getComputedStyle(track).gap) || 16; // usa gap real
  track.style.transform = `translateX(${-index * (itemWidth + gap)}px)`;
  updateDots();
  // actualizar estado de flechas en extremos
  const total = track.querySelectorAll('img').length;
  if (prev) {
    const disablePrev = index <= 0 || total <= 1;
    prev.disabled = disablePrev;
    prev.setAttribute('aria-disabled', String(disablePrev));
  }
  if (next) {
    const disableNext = index >= total - 1 || total <= 1;
    next.disabled = disableNext;
    next.setAttribute('aria-disabled', String(disableNext));
  }
}
prev?.addEventListener('click', () => { index = Math.max(0, index - 1); updateCarousel(); });
next?.addEventListener('click', () => {
  const items = track.querySelectorAll('img').length;
  index = Math.min(items - 1, index + 1);
  updateCarousel();
});
window.addEventListener('resize', updateCarousel);
updateCarousel();

// Navegación táctil (drag/slide)
let startX = 0;
let currentX = 0;
let dragging = false;
const threshold = 40; // px para considerar swipe

function onTouchStart(e) {
  dragging = true;
  startX = (e.touches?.[0]?.clientX) ?? e.clientX;
  currentX = startX;
}
function onTouchMove(e) {
  if (!dragging) return;
  currentX = (e.touches?.[0]?.clientX) ?? e.clientX;
  const delta = currentX - startX;
  // seguimiento visual suave
  const itemWidth = track.querySelector('img')?.getBoundingClientRect().width || 300;
  const gap = parseFloat(getComputedStyle(track).gap) || 16;
  track.style.transform = `translateX(${-(index * (itemWidth + gap)) + delta}px)`;
}
function onTouchEnd() {
  if (!dragging) return;
  dragging = false;
  const delta = currentX - startX;
  const items = track.querySelectorAll('img').length;
  if (delta > threshold) { index = Math.max(0, index - 1); }
  else if (delta < -threshold) { index = Math.min(items - 1, index + 1); }
  updateCarousel();
}

track?.addEventListener('touchstart', onTouchStart, { passive: true });
track?.addEventListener('touchmove', onTouchMove, { passive: true });
track?.addEventListener('touchend', onTouchEnd);
// soporte mouse drag en desktop
track?.addEventListener('mousedown', onTouchStart);
window.addEventListener('mousemove', onTouchMove);
window.addEventListener('mouseup', onTouchEnd);

// Paginación (puntos)
if (carousel && track) {
  const imgs = Array.from(track.querySelectorAll('img'));
  galleryImgs = imgs;
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'carousel-dots';
  dots = imgs.map((_, i) => {
    const b = document.createElement('button');
    b.className = 'carousel-dot';
    b.type = 'button';
    b.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
    b.setAttribute('aria-current', 'false');
    b.addEventListener('click', () => { index = i; updateCarousel(); });
    dotsWrap.appendChild(b);
    return b;
  });
  carousel.appendChild(dotsWrap);
  updateDots();
}

// Lightbox: abrir al hacer clic en una imagen del carrusel
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-arrow.prev');
const lightboxNext = document.querySelector('.lightbox-arrow.next');
let prevBodyOverflow = '';
let lbIndex = -1;

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || 'Vista ampliada';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  prevBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  lightboxImg.alt = '';
  document.body.style.overflow = prevBodyOverflow || '';
  lbIndex = -1;
}

function openLightboxAt(i) {
  if (!galleryImgs.length) return;
  lbIndex = i;
  const img = galleryImgs[lbIndex];
  openLightbox(img.src, img.alt);
}
function navLightbox(delta) {
  if (!galleryImgs.length || lbIndex < 0) return;
  lbIndex = (lbIndex + delta + galleryImgs.length) % galleryImgs.length;
  const img = galleryImgs[lbIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || 'Vista ampliada';
}

// Click en imágenes para abrir
const clickableImgs = track?.querySelectorAll('img') || [];
Array.from(clickableImgs).forEach((img, i) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openLightboxAt(i));
});

// Cerrar lightbox
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
lightboxPrev?.addEventListener('click', () => navLightbox(-1));
lightboxNext?.addEventListener('click', () => navLightbox(1));
window.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') navLightbox(-1);
  if (e.key === 'ArrowRight') navLightbox(1);
});

// Footer año
document.getElementById('year').textContent = new Date().getFullYear();

// Validación ligera del formulario
const form = document.getElementById('contact-form');
const note = document.querySelector('.form-note');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const topic = String(data.get('topic') || '').trim();
  if (!name || !email || !topic) {
    note.textContent = 'Por favor completa los campos requeridos.';
    return;
  }
  note.textContent = '¡Gracias! Te contactaremos pronto.';
  form.reset();
});
// Navegación activa simple y demo de valores
const links = document.querySelectorAll('.nav-link');
links.forEach(l => l.addEventListener('click', (e) => {
  links.forEach(x => x.classList.remove('active'));
  e.currentTarget.classList.add('active');
}));

// Botones hero
document.getElementById('btnComenzar')?.addEventListener('click', () => {
  document.getElementById('simulaciones')?.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btnVerDemo')?.addEventListener('click', () => {
  // Valores demo aleatorios para mostrar el estilo de los tiles
  const rnd = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
  document.getElementById('molesH2').textContent = rnd(0.5, 5) + ' mol';
  document.getElementById('energia').textContent = rnd(1, 50) + ' kWh';
  document.getElementById('costo').textContent = Intl.NumberFormat('es-CL').format(Math.floor(rnd(1000, 150000))) + ' CLP';
  document.getElementById('co2').textContent = rnd(0.1, 10) + ' kg';
  document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' });
});
