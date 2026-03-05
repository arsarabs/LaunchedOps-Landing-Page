/* ==============================================
   ROCKET.JS — Interactive Rocket with Particle Exhaust
   ============================================== */

(function() {
  'use strict';

  var rocketScene = document.querySelector('.rocket-scene');
  if (!rocketScene) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouchDevice = 'ontouchstart' in window;

  /* --- Canvas Particle System --- */
  var canvas = rocketScene.querySelector('.rocket-particles');
  if (!canvas || prefersReducedMotion) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var maxParticles = 80;
  var mouseX = 0.5;
  var mouseY = 0.5;
  var isVisible = true;
  var animationId = null;

  function resizeCanvas() {
    canvas.width = rocketScene.offsetWidth;
    canvas.height = rocketScene.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  /* Rocket exhaust position (bottom center of the rocket) */
  function getExhaustPos() {
    var rocket = rocketScene.querySelector('.rocket-ship');
    if (!rocket) return { x: canvas.width * 0.5, y: canvas.height * 0.7 };
    var rocketRect = rocket.getBoundingClientRect();
    var sceneRect = rocketScene.getBoundingClientRect();
    return {
      x: rocketRect.left - sceneRect.left + rocketRect.width / 2,
      y: rocketRect.bottom - sceneRect.top - 4
    };
  }

  function createParticle() {
    var pos = getExhaustPos();
    var colors = ['#FF6B2B', '#FF8F5E', '#3B82F6', '#FFB088', '#60A5FA'];
    return {
      x: pos.x + (Math.random() - 0.5) * 8,
      y: pos.y,
      vx: (Math.random() - 0.5) * 1.2,
      vy: Math.random() * 2 + 1,
      size: Math.random() * 3 + 1,
      life: 1,
      decay: Math.random() * 0.02 + 0.01,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  function updateParticles() {
    /* Emit new particles */
    if (particles.length < maxParticles) {
      particles.push(createParticle());
      if (Math.random() > 0.5) particles.push(createParticle());
    }

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];

      /* Drift toward mouse if not touch device */
      if (!isTouchDevice) {
        var targetX = mouseX * canvas.width;
        var targetY = mouseY * canvas.height;
        p.vx += (targetX - p.x) * 0.0003;
        p.vy += (targetY - p.y) * 0.0003;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.globalAlpha = p.life * 0.6;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  function animate() {
    if (!isVisible) return;
    updateParticles();
    drawParticles();
    animationId = requestAnimationFrame(animate);
  }

  /* --- Mouse Tracking --- */
  if (!isTouchDevice) {
    var heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', function(e) {
        var rect = heroSection.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = (e.clientY - rect.top) / rect.height;
      });
    }
  }

  /* --- Scroll Parallax --- */
  window.addEventListener('scroll', function() {
    if (!isVisible) return;
    var scrollY = window.pageYOffset;
    var rocket = rocketScene.querySelector('.rocket-ship');
    if (rocket) {
      rocket.style.transform = 'translateY(' + (-scrollY * 0.08) + 'px)';
    }
  }, { passive: true });

  /* --- IntersectionObserver: pause when off-screen --- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      isVisible = entries[0].isIntersecting;
      if (isVisible && !animationId) {
        animationId = requestAnimationFrame(animate);
      } else if (!isVisible && animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }, { threshold: 0.1 });
    observer.observe(rocketScene);
  }

  /* Start animation */
  animationId = requestAnimationFrame(animate);

})();
