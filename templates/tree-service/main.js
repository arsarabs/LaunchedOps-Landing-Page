(function() {
  'use strict';

  // ============ URL PARAMETER PERSONALIZATION ============
  var defaults = {
    name: 'Summit Tree Experts',
    city: 'Portland',
    phone: '5035550187',
    r1: 'Jake M.',
    r2: 'Lisa T.',
    r3: 'Carlos R.',
    rating: '5.0',
    reviews: '200+',
    jobs: '10,000+'
  };

  function formatPhone(raw) {
    var d = raw.replace(/\D/g, '');
    if (d.length === 10) return '(' + d.slice(0,3) + ') ' + d.slice(3,6) + '-' + d.slice(6);
    return raw;
  }

  function applyParams() {
    var params = new URLSearchParams(window.location.search);
    var vals = {};
    for (var key in defaults) {
      vals[key] = params.get(key) || defaults[key];
    }

    // Name
    document.querySelectorAll('[data-personalize="name"]').forEach(function(el) {
      el.textContent = el.textContent.includes('//') ? '// ' + vals.name : vals.name;
    });

    // City
    document.querySelectorAll('[data-personalize="city"]').forEach(function(el) {
      el.textContent = vals.city;
    });

    // Phone display
    var phoneDisplay = formatPhone(vals.phone);
    document.querySelectorAll('[data-personalize="phone-display"]').forEach(function(el) {
      if (el.tagName === 'A') {
        el.href = 'tel:' + vals.phone.replace(/\D/g, '');
        el.textContent = el.textContent.includes('\u2706') ? '\u2706 ' + phoneDisplay : phoneDisplay;
      } else {
        el.textContent = phoneDisplay;
      }
    });

    // Phone link (buttons that call)
    document.querySelectorAll('[data-personalize="phone-link"]').forEach(function(el) {
      el.href = 'tel:' + vals.phone.replace(/\D/g, '');
    });

    // All tel: links in mobile sticky
    document.querySelectorAll('.mobile-sticky-cta a[href^="tel:"]').forEach(function(el) {
      el.href = 'tel:' + vals.phone.replace(/\D/g, '');
    });

    // Reviewer names
    document.querySelectorAll('[data-personalize="r1"]').forEach(function(el) { el.textContent = vals.r1; });
    document.querySelectorAll('[data-personalize="r2"]').forEach(function(el) { el.textContent = vals.r2; });
    document.querySelectorAll('[data-personalize="r3"]').forEach(function(el) { el.textContent = vals.r3; });

    // Rating
    document.querySelectorAll('[data-personalize="rating"]').forEach(function(el) { el.textContent = vals.rating; });

    // Reviews
    document.querySelectorAll('[data-personalize="reviews"]').forEach(function(el) { el.textContent = vals.reviews; });

    // Jobs
    document.querySelectorAll('[data-personalize="jobs"]').forEach(function(el) { el.textContent = vals.jobs; });

    // Update page title (only on homepage)
    if (document.querySelector('.hero')) {
      document.title = 'Tree Removal & Tree Service in ' + vals.city + ', OR | ' + vals.name;
    }
  }

  applyParams();

  // ============ HEADER SCROLL ============
  var header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ============ INTERSECTION OBSERVER ============
  var reveals = document.querySelectorAll('.section-reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-100px' });
    reveals.forEach(function(el) { observer.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('visible'); });
  }

  // ============ NUMBER TICKER (Spring Physics) ============
  var tickers = document.querySelectorAll('.ticker');
  var tickerStarted = new Set();

  function springTicker(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    var decimals = parseInt(el.getAttribute('data-decimals')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var stiffness = 100;
    var damping = 60;
    var current = 0;
    var velocity = 0;
    var mass = 1;

    function step() {
      var springForce = stiffness * (target - current);
      var dampingForce = damping * velocity;
      var acceleration = (springForce - dampingForce) / mass;
      velocity += acceleration * 0.016;
      current += velocity * 0.016;

      if (Math.abs(target - current) < 0.01 && Math.abs(velocity) < 0.01) {
        current = target;
        if (decimals === 0 && target >= 1000) {
          el.textContent = Math.round(current).toLocaleString() + suffix;
        } else {
          el.textContent = current.toFixed(decimals) + suffix;
        }
        return;
      }

      if (decimals === 0 && target >= 1000) {
        el.textContent = Math.round(current).toLocaleString() + suffix;
      } else if (decimals === 0) {
        el.textContent = Math.round(current) + suffix;
      } else {
        el.textContent = current.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (tickers.length && 'IntersectionObserver' in window) {
    var tickerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !tickerStarted.has(entry.target)) {
          tickerStarted.add(entry.target);
          springTicker(entry.target);
        }
      });
    }, { rootMargin: '-50px' });
    tickers.forEach(function(t) { tickerObserver.observe(t); });
  }

  // ============ FAQ ACCORDION ============
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      var wasActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(function(fi) {
        fi.classList.remove('active');
        fi.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!wasActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ============ LIGHTBOX ============
  var lightboxOverlay = document.getElementById('lightboxOverlay');
  var lightboxImg = document.getElementById('lightboxImg');

  if (lightboxOverlay && lightboxImg) {
    document.querySelectorAll('[data-lightbox]').forEach(function(card) {
      card.addEventListener('click', function() {
        var img = card.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightboxOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    lightboxOverlay.addEventListener('click', function() {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============ FORM SUBMIT ============
  var form = document.getElementById('quoteForm');
  var formSuccess = document.getElementById('formSuccess');
  var formSubmitBtn = document.getElementById('formSubmit');

  if (form && formSuccess && formSubmitBtn) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Honeypot check
      if (form.querySelector('[name="website"]').value) return;

      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = '<span class="form-spinner"></span> Sending...';

      setTimeout(function() {
        form.classList.add('hidden');
        formSuccess.classList.add('show');
      }, 1500);
    });
  }

  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var href = a.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============ STAGGER REVEAL ============
  var staggerGrids = document.querySelectorAll('.services-grid, .process-grid, .testimonials-grid, .other-services-grid, .areas-grid, .neighborhoods-grid');
  staggerGrids.forEach(function(grid) {
    grid.classList.add('stagger-reveal');
  });

  if ('IntersectionObserver' in window) {
    var staggerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-60px' });
    staggerGrids.forEach(function(g) { staggerObserver.observe(g); });
  } else {
    staggerGrids.forEach(function(g) { g.classList.add('visible'); });
  }

  // ============ SEASONAL SMART BANNER ============
  var seasonalBanner = document.getElementById('seasonalBanner');
  var seasonalText = document.getElementById('seasonalText');
  var seasonalCta = document.getElementById('seasonalCta');
  var seasonalClose = document.getElementById('seasonalClose');

  if (seasonalBanner && seasonalText && seasonalCta && seasonalClose) {
    if (sessionStorage.getItem('seasonalBannerDismissed')) {
      seasonalBanner.classList.add('dismissed');
    } else {
      var month = new Date().getMonth(); // 0-11
      var seasonMsg = '';
      var ctaText = 'Book Now';
      var ctaHref = '#quote';

      if (month >= 2 && month <= 4) {
        // Spring: Mar-May
        seasonMsg = '\uD83C\uDF31 Spring pruning season is here \u2014 book now before we\u2019re full';
      } else if (month >= 5 && month <= 7) {
        // Summer: Jun-Aug
        seasonMsg = '\u2600\uFE0F Dead limb hazards increase in heat \u2014 schedule an inspection';
      } else if (month >= 8 && month <= 10) {
        // Fall: Sep-Nov
        seasonMsg = '\uD83C\uDF42 Fall is the best time to remove trees \u2014 schedule before winter storms';
      } else {
        // Winter: Dec-Feb
        seasonMsg = '\u2744\uFE0F Storm season \u2014 24/7 emergency service, we\u2019re on call';
        ctaText = 'Call Now';
        var phoneRaw = (new URLSearchParams(window.location.search).get('phone') || '5035550187').replace(/\D/g, '');
        ctaHref = 'tel:' + phoneRaw;
      }

      seasonalText.textContent = seasonMsg;
      seasonalCta.textContent = ctaText;
      seasonalCta.href = ctaHref;

      seasonalClose.addEventListener('click', function() {
        seasonalBanner.classList.add('dismissed');
        sessionStorage.setItem('seasonalBannerDismissed', '1');
      });
    }
  }

  // ============ TIMELINE RING ANIMATION ============
  var timelineSection = document.querySelector('.timeline-section');
  if (timelineSection && 'IntersectionObserver' in window) {
    var timelineObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-80px' });
    timelineObserver.observe(timelineSection);
  }

  // ============ CREW CARD STAGGER ============
  var crewGrid = document.querySelector('.crew-grid');
  if (crewGrid) {
    crewGrid.classList.add('stagger-reveal');
    if ('IntersectionObserver' in window) {
      staggerObserver.observe(crewGrid);
    } else {
      crewGrid.classList.add('visible');
    }
  }

})();
