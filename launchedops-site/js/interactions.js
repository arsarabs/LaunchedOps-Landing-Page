/* ==============================================
   INTERACTIONS.JS — Mouse Tracking, Parallax, Interactive Elements
   ============================================== */

(function() {
  'use strict';

  /* Bail out if user prefers reduced motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* --- Mouse-Tracking Parallax for Hero Mockup --- */
  var heroMockup = document.querySelector('.hero-mockup');

  if (heroMockup) {
    var heroSection = document.querySelector('.hero');
    var tiltX = 0;
    var tiltY = 0;
    var currentX = 0;
    var currentY = 0;
    var rafId = null;

    function updateTilt() {
      currentX += (tiltX - currentX) * 0.08;
      currentY += (tiltY - currentY) * 0.08;
      heroMockup.style.transform =
        'perspective(1200px) rotateY(' + currentX + 'deg) rotateX(' + (-currentY) + 'deg)';
      rafId = requestAnimationFrame(updateTilt);
    }

    heroSection.addEventListener('mousemove', function(e) {
      var rect = heroSection.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      tiltX = x * 5; /* Max 5 degree tilt */
      tiltY = y * 5;
    });

    heroSection.addEventListener('mouseenter', function() {
      if (!rafId) rafId = requestAnimationFrame(updateTilt);
    });

    heroSection.addEventListener('mouseleave', function() {
      tiltX = 0;
      tiltY = 0;
      /* Let it ease back to center */
      setTimeout(function() {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        heroMockup.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
      }, 600);
    });

    /* Start the animation loop */
    rafId = requestAnimationFrame(updateTilt);

    /* Disable on mobile (no mouse) */
    if ('ontouchstart' in window) {
      if (rafId) cancelAnimationFrame(rafId);
      heroMockup.style.transform = 'none';
    }
  }

  /* --- Portfolio Card Hover --- */
  var portfolioCards = document.querySelectorAll('.portfolio-card');
  portfolioCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.portfolio-overlay').style.opacity = '1';
    });
    card.addEventListener('mouseleave', function() {
      this.querySelector('.portfolio-overlay').style.opacity = '0';
    });
  });

})();
