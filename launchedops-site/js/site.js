/* AscendedOps — minimal site JS.
   Responsibilities: mobile nav toggle, nothing else. */

(() => {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const burger = nav.querySelector('.nav__burger');
  const drawer = document.getElementById('nav-drawer');
  if (!burger || !drawer) return;

  const close = () => {
    nav.classList.remove('nav--open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const open = () => {
    nav.classList.add('nav--open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  burger.addEventListener('click', () => {
    if (nav.classList.contains('nav--open')) close();
    else open();
  });

  drawer.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  const mq = window.matchMedia('(min-width: 900px)');
  mq.addEventListener('change', (e) => { if (e.matches) close(); });
})();
