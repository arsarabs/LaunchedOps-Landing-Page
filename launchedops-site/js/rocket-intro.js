/* ==============================================
   ROCKET-INTRO.JS — Full-Size SVG Rocket Intro
   Handles: starfield, session check, zoom animation,
   mouse parallax, skip, reduced motion
   ============================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'launchedops_intro_played';
  var ZOOM_DURATION = 1400;
  var SKIP_DURATION = 300;

  var body = document.body;
  var overlay = document.getElementById('introOverlay');
  var rocket = document.getElementById('introRocket');
  var skipBtn = document.getElementById('introSkip');
  var starfield = document.getElementById('introStarfield');

  // Bail if elements missing (other pages without intro)
  if (!overlay || !rocket || !skipBtn) {
    body.classList.remove('intro-active');
    return;
  }

  // Check prefers-reduced-motion
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check if already played this session
  var alreadyPlayed = false;
  try {
    alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch (e) {
    // sessionStorage unavailable
  }

  // Skip immediately if reduced motion or already played
  if (prefersReduced || alreadyPlayed) {
    body.classList.remove('intro-active');
    overlay.style.display = 'none';
    return;
  }

  // ==============================================
  //  STARFIELD GENERATOR
  // ==============================================
  function generateStarfield(container) {
    if (!container) return;
    var count = 80 + Math.floor(Math.random() * 41); // 80-120 stars
    var frag = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      var star = document.createElement('span');
      star.className = 'intro-star';
      var size = (0.5 + Math.random() * 2).toFixed(1);
      var opacity = (0.3 + Math.random() * 0.7).toFixed(2);
      var opacityMin = (Math.max(0.05, parseFloat(opacity) - 0.3 - Math.random() * 0.2)).toFixed(2);
      var duration = (2 + Math.random() * 3).toFixed(1);
      var delay = (Math.random() * 4).toFixed(1);

      star.style.setProperty('--star-x', (Math.random() * 100).toFixed(1) + '%');
      star.style.setProperty('--star-y', (Math.random() * 100).toFixed(1) + '%');
      star.style.setProperty('--star-size', size + 'px');
      star.style.setProperty('--star-opacity', opacity);
      star.style.setProperty('--star-opacity-min', opacityMin);
      star.style.setProperty('--star-duration', duration + 's');
      star.style.setProperty('--star-delay', delay + 's');

      frag.appendChild(star);
    }
    container.appendChild(frag);
  }

  generateStarfield(starfield);

  // ==============================================
  //  MOUSE PARALLAX (desktop only)
  // ==============================================
  var parallaxEnabled = !('ontouchstart' in window) && window.innerWidth > 768;
  var parallaxActive = true;

  if (parallaxEnabled) {
    overlay.addEventListener('mousemove', function (e) {
      if (!parallaxActive) return;

      // Normalize cursor position to -1..1 range
      var x = (e.clientX / window.innerWidth - 0.5) * 2;
      var y = (e.clientY / window.innerHeight - 0.5) * 2;

      // Shift rocket ±8px horizontal, ±5px vertical
      var tx = x * 8;
      var ty = y * 5;

      rocket.style.transform = 'translate(' + tx.toFixed(1) + 'px, ' + ty.toFixed(1) + 'px)';
    });
  }

  // ==============================================
  //  SESSION FLAG
  // ==============================================
  function markPlayed() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {
      // Ignore
    }
  }

  // ==============================================
  //  COMPLETE INTRO
  // ==============================================
  function completeIntro() {
    body.classList.remove('intro-active');
    overlay.style.display = 'none';
    markPlayed();
  }

  // ==============================================
  //  ZOOM ANIMATION
  // ==============================================
  var animating = false;

  function triggerZoom() {
    if (animating) return;
    animating = true;

    // Disable parallax during zoom
    parallaxActive = false;

    // Reset any parallax transform before zoom starts
    rocket.style.transform = '';

    overlay.classList.add('intro-zooming');

    setTimeout(function () {
      completeIntro();
    }, ZOOM_DURATION);
  }

  // ==============================================
  //  SKIP (quick fade)
  // ==============================================
  function triggerSkip() {
    if (animating) return;
    animating = true;
    parallaxActive = false;

    overlay.classList.add('intro-skipping');

    setTimeout(function () {
      completeIntro();
    }, SKIP_DURATION);
  }

  // ==============================================
  //  EVENT LISTENERS
  // ==============================================

  // Click rocket to launch
  rocket.addEventListener('click', function (e) {
    e.stopPropagation();
    triggerZoom();
  });

  // Click anywhere on overlay also launches
  overlay.addEventListener('click', function () {
    triggerZoom();
  });

  // Skip button
  skipBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    triggerSkip();
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('intro-active')) {
      triggerSkip();
    }
  });
})();
