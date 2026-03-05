/* ==============================================
   ROCKET-EXPERIENCE.JS — Waypoint-Driven Colors
   Reads spatial engine state for navbar accent +
   cursor glow color. Falls back to scroll-based
   behavior on non-spatial pages.
   ============================================== */

(function() {
  'use strict';

  /* --- Check if we're on the homepage --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage !== 'index.html' && currentPage !== '' && currentPage !== '/') return;

  /* --- Check reduced motion preference --- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Detect spatial mode --- */
  var isSpatialMode = typeof LaunchedOpsSpatial !== 'undefined' && LaunchedOpsSpatial !== null;

  /* --- Elements --- */
  var navbar = document.getElementById('navbar');

  /* --- Waypoint color map --- */
  var waypointGlowColors = [
    'rgba(59, 130, 246, 0.04)',    /* overview — blue */
    'rgba(59, 130, 246, 0.04)',    /* hero — blue */
    'rgba(59, 130, 246, 0.03)',    /* problem */
    'rgba(107, 200, 200, 0.03)',   /* cargo — teal */
    'rgba(255, 180, 60, 0.04)',    /* examples — warm */
    'rgba(255, 130, 43, 0.04)',    /* engine — orange */
    'rgba(255, 107, 43, 0.05)'    /* ignition — deep orange */
  ];

  if (isSpatialMode) {
    /* Spatial mode: colors are driven by the spatial engine's waypoint state.
       The spatial engine already handles navbar accent updates via goToWaypoint().
       Nothing additional needed here — the engine is self-contained. */
    return;
  }

  /* --- Non-spatial fallback (other pages, or if spatial engine didn't load) --- */
  /* This code path only runs if the spatial engine is not active */

  var ambient = document.querySelector('.rocket-ambient');
  var cursorGlow = document.querySelector('.cursor-glow');
  var navDots = document.querySelectorAll('.section-nav-item');
  var sections = document.querySelectorAll('.rocket-section');

  /* Section color maps for scroll-based pages */
  var sectionColors = [
    { hue: 220, sat: 40, light: 6 },
    { hue: 210, sat: 35, light: 6.5 },
    { hue: 180, sat: 25, light: 7 },
    { hue: 40,  sat: 25, light: 7 },
    { hue: 25,  sat: 30, light: 7.5 },
    { hue: 15,  sat: 35, light: 8 }
  ];

  var navbarAccents = [
    'hsl(220, 60%, 55%)',
    'hsl(210, 55%, 50%)',
    'hsl(180, 45%, 50%)',
    'hsl(40, 80%, 55%)',
    'hsl(25, 85%, 55%)',
    'hsl(15, 90%, 55%)'
  ];

  /* Scroll-linked ambient gradient */
  if (ambient && !prefersReducedMotion) {
    var ticking = false;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function updateAmbientGradient() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      var totalSections = sectionColors.length - 1;
      var rawIndex = progress * totalSections;
      var index = Math.floor(rawIndex);
      var t = rawIndex - index;

      if (index >= totalSections) {
        index = totalSections - 1;
        t = 1;
      }

      var c1 = sectionColors[index];
      var c2 = sectionColors[index + 1];

      var hue = lerp(c1.hue, c2.hue, t);
      var sat = lerp(c1.sat, c2.sat, t);
      var light = lerp(c1.light, c2.light, t);

      var topColor = 'hsl(' + Math.round(hue) + ', ' + Math.round(sat) + '%, ' + Math.round(light) + '%)';
      var midColor = 'hsl(' + Math.round(hue + 10) + ', ' + Math.round(sat - 5) + '%, ' + Math.round(light + 0.5) + '%)';
      var bottomColor = 'hsl(' + Math.round(hue + 20) + ', ' + Math.round(sat - 10) + '%, ' + Math.round(light + 1) + '%)';

      ambient.style.background = 'linear-gradient(180deg, ' + topColor + ' 0%, ' + midColor + ' 50%, ' + bottomColor + ' 100%)';
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateAmbientGradient);
        ticking = true;
      }
    }, { passive: true });

    updateAmbientGradient();
  }

  /* Section Observer */
  var activeIndex = 0;

  if ('IntersectionObserver' in window && sections.length > 0) {
    var observerOptions = {
      root: null,
      rootMargin: '-' + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72) + 'px 0px -30% 0px',
      threshold: 0.3
    };

    var sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var sectionId = entry.target.id;

          navDots.forEach(function(dot) {
            if (dot.getAttribute('data-section') === sectionId) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });

          sections.forEach(function(sec, i) {
            if (sec.id === sectionId) {
              activeIndex = i;
            }
          });

          if (navbar && navbarAccents[activeIndex]) {
            navbar.style.setProperty('--navbar-accent', navbarAccents[activeIndex]);
          }
        }
      });
    }, observerOptions);

    sections.forEach(function(section) {
      sectionObserver.observe(section);
    });
  }

  /* Nav Click Handlers */
  navDots.forEach(function(dot) {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      var sectionId = this.getAttribute('data-section');
      var target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* Cursor Glow */
  if (cursorGlow && !prefersReducedMotion && !('ontouchstart' in window)) {
    document.addEventListener('mousemove', function(e) {
      cursorGlow.style.transform = 'translate(' + (e.clientX - 200) + 'px, ' + (e.clientY - 200) + 'px)';
      if (!cursorGlow.classList.contains('visible')) {
        cursorGlow.classList.add('visible');
      }
    });

    document.addEventListener('mouseleave', function() {
      cursorGlow.classList.remove('visible');
    });
  }

})();
