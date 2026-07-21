const backToTop = document.querySelector('.back-to-top');
const preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
  window.setTimeout(() => preloader.classList.add('hidden'), 2000);
});

function smoothScrollTo(targetY, duration = 850) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  const ease = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  function animate(now) {
    const elapsed = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(elapsed));
    if (elapsed < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    smoothScrollTo(target.getBoundingClientRect().top + window.scrollY, 780);
  });
});

backToTop.addEventListener('click', () => smoothScrollTo(0, 900));
window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 520), { passive: true });
window.addEventListener('scroll', () => document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 30), { passive: true });

const projectModal = document.querySelector('#project-modal');
const contactModal = document.querySelector('#contact-modal');
const closeModal = (modal) => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
const openModal = (modal) => { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); modal.querySelector('button, input')?.focus(); };

document.querySelector('.project-list-trigger').addEventListener('click', () => openModal(projectModal));
document.querySelector('.open-contact').addEventListener('click', () => openModal(contactModal));
document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(modal); });
  modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal); });
document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value;
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  const text = encodeURIComponent(`Olá, Rocha Dev! Gostaria de iniciar um projeto.\n\n*Nome:* ${name}\n*E-mail:* ${email}\n\n*Sobre o projeto:*\n${message}`);
  window.open(`https://wa.me/5561986092449?text=${text}`, '_blank', 'noopener');
});
