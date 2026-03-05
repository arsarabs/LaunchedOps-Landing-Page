/* ==============================================
   MAIN.JS — Global Functionality
   Navigation, Scroll, Mobile Menu, Active Page
   ============================================== */

(function() {
  'use strict';

  /* --- Detect spatial mode --- */
  var isSpatialMode = !!document.querySelector('.rocket-world-container');

  /* --- Navbar Scroll Effect --- */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    if (isSpatialMode) {
      /* Always show scrolled navbar in spatial mode */
      navbar.classList.add('scrolled');
    } else {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  }

  /* --- Mobile Menu --- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    /* Close mobile menu on link click */
    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  /* --- Smooth Scroll for Anchor Links --- */
  /* Skip in spatial mode — spatial engine handles navigation */
  if (!isSpatialMode) {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var offset = navbar ? navbar.offsetHeight : 0;
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* --- Active Nav Link --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- FAQ Accordion --- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        var isOpen = item.classList.contains('open');

        /* Close all other FAQ items */
        faqItems.forEach(function(other) {
          other.classList.remove('open');
        });

        /* Toggle current item */
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

})();
