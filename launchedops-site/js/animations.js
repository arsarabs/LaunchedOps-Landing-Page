/* ==============================================
   ANIMATIONS.JS — Intersection Observer Scroll Reveals
   ============================================== */

(function() {
  'use strict';

  /* --- Detect spatial mode --- */
  var isSpatialMode = !!document.querySelector('.rocket-world-container');

  /* Bail out if user prefers reduced motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-child').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }

  /* In spatial mode: mark all reveals visible immediately.
     The spatial engine handles section-level fade via ws-visible. */
  if (isSpatialMode) {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-child').forEach(function(el) {
      el.classList.add('visible');
    });
    /* Still set up counter animations — they'll fire when sections become visible */
    setupCounters();
    return;
  }

  /* --- Section-level reveals --- */
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function(el) {
    revealObserver.observe(el);
  });

  /* --- Staggered child reveals --- */
  var childObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var parent = entry.target.closest('[data-stagger]') || entry.target.parentElement;
        var children = parent.querySelectorAll('.reveal-child');
        children.forEach(function(child, i) {
          setTimeout(function() {
            child.classList.add('visible');
          }, i * 120);
        });
        children.forEach(function(child) {
          childObserver.unobserve(child);
        });
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.reveal-child').forEach(function(el) {
    childObserver.observe(el);
  });

  /* --- Number Counter Animation --- */
  setupCounters();

  function setupCounters() {
    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    document.querySelectorAll('[data-count]').forEach(function(el) {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 1800;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      /* Ease out */
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * (target - start) + start);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  /* --- Timeline Line Draw Animation --- */
  var timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('.timeline-line').forEach(function(el) {
    timelineObserver.observe(el);
  });

})();
