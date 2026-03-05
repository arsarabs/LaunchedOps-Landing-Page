/* ==============================================
   SPATIAL-ENGINE.JS — Core Spatial Zoomable Experience
   Camera, waypoints, input handling, visibility,
   starfield, intro sequence, free mode, touch
   ============================================== */

var LaunchedOpsSpatial = (function() {
  'use strict';

  /* --- Bail: only homepage --- */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  if (page !== 'index.html' && page !== '' && page !== '/') return null;

  /* --- Bail: reduced motion --- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- DOM refs --- */
  var container = document.querySelector('.rocket-world-container');
  var camera = document.querySelector('.rocket-camera');
  var starfield = document.querySelector('.rocket-starfield');
  var navItems = document.querySelectorAll('.section-nav-item');
  var sectionNav = document.querySelector('.section-nav');
  var worldSections = document.querySelectorAll('.world-section');
  var worldFooter = document.querySelector('.world-footer');
  var navbar = document.getElementById('navbar');

  if (!container || !camera) return null;

  /* --- Constants --- */
  var ANIM_DURATION = 900;
  var INTRO_ZOOM_DUR = 1500;
  var INTRO_NAV_DUR = 1200;
  var SNAP_BACK_DELAY = 4000;
  var MIN_SCALE = 0.15;
  var MAX_SCALE = 4.0;
  var VISIBILITY_DIST = 600;
  var MOBILE_BP = 768;
  var TABLET_BP = 1024;

  /* --- Waypoints (alternating left-right, zoomed into copy) --- */
  var waypoints = [
    { label: 'Overview',  x: 0,    y: -100,  scale: 0.20 },
    { label: 'Hero',      x: 450,  y: -1320, scale: 2.5  },
    { label: 'Problem',   x: -450, y: -690,  scale: 2.5  },
    { label: 'Cargo',     x: 450,  y: 150,   scale: 2.5  },
    { label: 'Examples',  x: -450, y: 810,   scale: 2.5  },
    { label: 'Engine',    x: 450,  y: 1140,  scale: 2.5  },
    { label: 'Ignition',  x: -450, y: 1470,  scale: 2.5  }
  ];

  /* Overview label text per section (indices 0-5 map to waypoints 1-6) */
  var overviewLabelTexts = ['Launch', 'The Problem', 'What You Get', 'Our Work', 'How It Works', 'Get Started'];
  var overviewLabels = [];

  /* Navbar accents per waypoint */
  var waypointAccents = [
    'hsl(220, 60%, 55%)',
    'hsl(220, 60%, 55%)',
    'hsl(210, 55%, 50%)',
    'hsl(180, 45%, 50%)',
    'hsl(40, 80%, 55%)',
    'hsl(25, 85%, 55%)',
    'hsl(15, 90%, 55%)'
  ];

  /* --- Camera State --- */
  var state = {
    cx: 0,
    cy: -100,
    scale: 0.20,
    currentWaypoint: 0,
    mode: 'guided',   /* 'guided' | 'free' */
    isAnimating: false,
    introPlayed: false
  };

  var vw, vh;
  var isMobile = false;
  var isTablet = false;
  var snapTimer = null;
  var wheelCooldown = false;

  /* --- Easing --- */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /* --- Viewport --- */
  function updateViewport() {
    vw = window.innerWidth;
    vh = window.innerHeight;
    isMobile = vw < MOBILE_BP;
    isTablet = vw >= MOBILE_BP && vw <= TABLET_BP;
  }

  /* --- Camera Transform --- */
  function applyCameraTransform(cx, cy, scale, animate) {
    var tx = -cx * scale + vw / 2;
    var ty = -cy * scale + vh / 2;

    if (animate) {
      camera.classList.add('animating');
    } else {
      camera.classList.remove('animating');
    }

    camera.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(' + scale + ')';
  }

  function setCameraImmediate(cx, cy, scale) {
    state.cx = cx;
    state.cy = cy;
    state.scale = scale;
    applyCameraTransform(cx, cy, scale, false);
  }

  function animateCameraTo(cx, cy, scale, duration, callback) {
    state.isAnimating = true;
    var dur = duration || ANIM_DURATION;

    /* Set transition duration via CSS variable */
    camera.style.setProperty('--camera-duration', (dur / 1000) + 's');

    /* Use CSS transition for smooth animation */
    state.cx = cx;
    state.cy = cy;
    state.scale = scale;
    applyCameraTransform(cx, cy, scale, true);

    /* Wait for transition to end */
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      state.isAnimating = false;
      camera.classList.remove('animating');
      updateVisibility();
      if (callback) callback();
    }

    camera.addEventListener('transitionend', function onEnd() {
      camera.removeEventListener('transitionend', onEnd);
      finish();
    });

    /* Fallback timeout */
    setTimeout(finish, dur + 100);

    /* Update visibility during animation */
    updateVisibility();
  }

  /* --- Waypoint Navigation --- */
  function goToWaypoint(index, duration) {
    if (index < 0 || index >= waypoints.length) return;
    if (state.isAnimating) return;

    state.currentWaypoint = index;
    state.mode = 'guided';
    var wp = getWaypointPosition(index);

    animateCameraTo(wp.x, wp.y, wp.scale, duration || ANIM_DURATION, function() {
      updateNavDots();
      updateNavProgress();
      updateNavbarAccent();
    });

    updateNavDots();
    updateNavProgress();
    updateNavbarAccent();
  }

  function nextWaypoint() {
    if (state.currentWaypoint < waypoints.length - 1) {
      goToWaypoint(state.currentWaypoint + 1);
    }
  }

  function prevWaypoint() {
    if (state.currentWaypoint > 0) {
      goToWaypoint(state.currentWaypoint - 1);
    }
  }

  /* --- Mobile/tablet waypoint position override --- */
  function getWaypointPosition(index) {
    var wp = waypoints[index];
    if (index === 0) return { x: wp.x, y: wp.y, scale: wp.scale }; /* Overview stays the same */
    if (isMobile) {
      /* On phone: cap scale so 320px section fits viewport, reduce x-offset */
      return { x: wp.x * 0.55, y: wp.y, scale: Math.min(wp.scale * 0.44, 1.1) };
    }
    if (isTablet) {
      /* On tablet: moderate scale, slightly reduced offset */
      return { x: wp.x * 0.75, y: wp.y, scale: Math.min(wp.scale * 0.7, 2.0) };
    }
    return { x: wp.x, y: wp.y, scale: wp.scale };
  }

  /* --- Section Positioning (alternating left/right beside rocket) --- */
  var ROCKET_EDGE = 180; /* half of rocket body width at 6x: 360/2 */
  var SECTION_GAP = 30;  /* gap between rocket edge and section panel */

  function getSectionWidth() {
    if (isMobile) return Math.min(320, vw * 0.9);
    if (isTablet) return 380;
    return 420;
  }

  function positionSections() {
    var panelW = getSectionWidth();

    worldSections.forEach(function(sec) {
      var wy = parseFloat(sec.getAttribute('data-wy')) || 0;
      var side = sec.getAttribute('data-side') || 'center';

      if (side === 'right') {
        sec.style.left = (ROCKET_EDGE + SECTION_GAP) + 'px';
      } else if (side === 'left') {
        sec.style.left = (-ROCKET_EDGE - SECTION_GAP - panelW) + 'px';
      } else {
        /* center */
        sec.style.left = (-panelW / 2) + 'px';
      }
      sec.style.top = (wy - 100) + 'px';
    });

    if (worldFooter) {
      var fy = parseFloat(worldFooter.getAttribute('data-wy')) || 1600;
      var footerW = Math.min(420, vw * 0.9);
      worldFooter.style.left = (-footerW / 2) + 'px';
      worldFooter.style.top = fy + 'px';
    }
  }

  /* --- Auto-fit Waypoints to Section Size --- */
  function computeWaypointFit() {
    var padding = 120; /* total vertical screen-px padding */

    worldSections.forEach(function(sec, i) {
      var wpIndex = i + 1;
      if (wpIndex >= waypoints.length) return;

      var wy = parseFloat(sec.getAttribute('data-wy')) || 0;
      var sectionH = sec.offsetHeight;
      if (sectionH < 10) return; /* not rendered yet */

      /* Section top in world-coords (from positionSections) */
      var sectionTopY = wy - 100;

      /* Center camera on the section's vertical midpoint */
      waypoints[wpIndex].y = sectionTopY + sectionH / 2;

      /* Scale so full section height fits within viewport */
      var fitScale = (vh - padding) / sectionH;
      fitScale = Math.min(fitScale, 2.5);
      fitScale = Math.max(fitScale, 0.8);
      waypoints[wpIndex].scale = fitScale;
    });
  }

  /* --- Overview Labels (clickable bold titles at overview zoom) --- */
  function createOverviewLabels() {
    var panelW = getSectionWidth();

    worldSections.forEach(function(sec, i) {
      var wy = parseFloat(sec.getAttribute('data-wy')) || 0;
      var side = sec.getAttribute('data-side') || 'center';

      var label = document.createElement('div');
      label.className = 'ws-overview-label';
      label.textContent = overviewLabelTexts[i];
      label.setAttribute('data-wp', String(i + 1));

      /* Position ABOVE the section */
      var topY = wy - 100 - 100;
      if (side === 'right') {
        label.style.left = (ROCKET_EDGE + SECTION_GAP) + 'px';
      } else if (side === 'left') {
        label.style.left = (-ROCKET_EDGE - SECTION_GAP - panelW) + 'px';
      } else {
        label.style.left = (-panelW / 2) + 'px';
      }
      label.style.top = topY + 'px';
      label.style.width = panelW + 'px';

      /* Click: hide all labels immediately, then navigate */
      label.addEventListener('click', function(e) {
        e.stopPropagation();
        overviewLabels.forEach(function(l) { l.classList.remove('ws-label-visible'); });
        goToWaypoint(parseInt(this.getAttribute('data-wp')));
      });

      camera.appendChild(label);
      overviewLabels.push(label);
    });
  }

  /* --- Visibility Engine --- */
  function updateVisibility() {
    var cx = state.cx;
    var cy = state.cy;
    var s = state.scale;

    worldSections.forEach(function(sec) {
      var wy = parseFloat(sec.getAttribute('data-wy')) || 0;
      var side = sec.getAttribute('data-side') || 'center';

      /* Approximate world x of the section center */
      var panelW = getSectionWidth();
      var wx = 0;
      if (side === 'right') wx = ROCKET_EDGE + SECTION_GAP + panelW / 2;
      else if (side === 'left') wx = -(ROCKET_EDGE + SECTION_GAP + panelW / 2);

      var dx = cx - wx;
      var dy = cy - wy;
      var dist = Math.sqrt(dx * dx + dy * dy);

      /* Visible when camera is close enough (no scale gate — show at overview too) */
      var threshold = VISIBILITY_DIST / Math.max(s, 0.3);
      if (dist < threshold) {
        sec.classList.add('ws-visible');
      } else {
        sec.classList.remove('ws-visible');
      }

      /* Interactive only when zoomed in enough to prevent accidental clicks at overview */
      if (dist < threshold && s > 0.6) {
        sec.classList.add('ws-interactive');
      } else {
        sec.classList.remove('ws-interactive');
      }
    });

    /* Overview labels: visible only at overview zoom */
    overviewLabels.forEach(function(label) {
      if (s < 0.4) {
        label.classList.add('ws-label-visible');
      } else {
        label.classList.remove('ws-label-visible');
      }
    });

    /* Footer: visible when near ignition waypoint */
    if (worldFooter) {
      var fy = parseFloat(worldFooter.getAttribute('data-wy')) || 1600;
      var footDist = Math.abs(cy - fy);
      if (footDist < 350 && s > 0.8) {
        worldFooter.classList.add('ws-visible');
      } else {
        worldFooter.classList.remove('ws-visible');
      }
    }
  }

  /* --- Nav Dots --- */
  function updateNavDots() {
    navItems.forEach(function(item, i) {
      if (i === state.currentWaypoint) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  /* --- Nav Progress --- */
  function updateNavProgress() {
    if (!sectionNav) return;
    var progress = waypoints.length > 1
      ? (state.currentWaypoint / (waypoints.length - 1)) * 100
      : 0;
    sectionNav.style.setProperty('--nav-progress', progress + '%');
  }

  /* --- Navbar Accent --- */
  function updateNavbarAccent() {
    if (navbar && waypointAccents[state.currentWaypoint]) {
      navbar.style.setProperty('--navbar-accent', waypointAccents[state.currentWaypoint]);
    }
  }

  /* --- Snap to Nearest Waypoint --- */
  function snapToNearest() {
    var bestIdx = 0;
    var bestDist = Infinity;

    waypoints.forEach(function(wp, i) {
      var pos = getWaypointPosition(i);
      var dx = state.cx - pos.x;
      var dy = state.cy - pos.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });

    goToWaypoint(bestIdx);
  }

  function resetSnapTimer() {
    if (snapTimer) clearTimeout(snapTimer);
    snapTimer = setTimeout(function() {
      if (state.mode === 'free') {
        snapToNearest();
      }
    }, SNAP_BACK_DELAY);
  }

  /* --- Enter Free Mode --- */
  function enterFreeMode() {
    state.mode = 'free';
    resetSnapTimer();
  }

  /* ==============================
     INPUT HANDLERS
     ============================== */

  /* --- Mouse Wheel --- */
  function onWheel(e) {
    e.preventDefault();

    if (state.mode === 'guided') {
      /* Guided: advance/retreat waypoints with cooldown */
      if (wheelCooldown) return;
      wheelCooldown = true;
      setTimeout(function() { wheelCooldown = false; }, 600);

      if (e.deltaY > 0) {
        nextWaypoint();
      } else {
        prevWaypoint();
      }
    } else {
      /* Free mode: zoom toward cursor */
      var rect = container.getBoundingClientRect();
      var mx = e.clientX - rect.left;
      var my = e.clientY - rect.top;

      /* Convert screen coords to world coords */
      var worldX = (mx - vw / 2) / state.scale + state.cx;
      var worldY = (my - vh / 2) / state.scale + state.cy;

      var zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      var newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, state.scale * zoomFactor));

      /* Zoom toward cursor */
      var newCx = worldX - (mx - vw / 2) / newScale;
      var newCy = worldY - (my - vh / 2) / newScale;

      setCameraImmediate(newCx, newCy, newScale);
      updateVisibility();
      resetSnapTimer();
    }
  }

  /* --- Mouse Drag (Pan) --- */
  var isDragging = false;
  var dragStartX = 0;
  var dragStartY = 0;
  var dragStartCx = 0;
  var dragStartCy = 0;

  function onMouseDown(e) {
    if (e.button !== 0) return;
    if (e.target.closest('.world-section') || e.target.closest('.section-nav') ||
        e.target.closest('.navbar') || e.target.closest('a') || e.target.closest('button')) return;

    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragStartCx = state.cx;
    dragStartCy = state.cy;
    container.style.cursor = 'grabbing';
    enterFreeMode();
  }

  function onMouseMove(e) {
    if (!isDragging) return;

    var dx = (e.clientX - dragStartX) / state.scale;
    var dy = (e.clientY - dragStartY) / state.scale;

    setCameraImmediate(dragStartCx - dx, dragStartCy - dy, state.scale);
    updateVisibility();
  }

  function onMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = '';
    resetSnapTimer();
  }

  /* --- Keyboard --- */
  function onKeyDown(e) {
    /* Don't interfere with inputs */
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        nextWaypoint();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevWaypoint();
        break;
      case 'Home':
        e.preventDefault();
        goToWaypoint(0);
        break;
      case 'End':
        e.preventDefault();
        goToWaypoint(waypoints.length - 1);
        break;
      case 'Escape':
        if (state.mode === 'free') {
          snapToNearest();
        }
        break;
    }
  }

  /* --- Touch Handling --- */
  var touchStartY = 0;
  var touchStartX = 0;
  var touchStartDist = 0;
  var touchStartScale = 0;
  var touchStartCx = 0;
  var touchStartCy = 0;
  var touchMode = null; /* 'swipe' | 'pan' | 'pinch' */
  var touchSwipeHandled = false;

  function getTouchDist(touches) {
    var dx = touches[0].clientX - touches[1].clientX;
    var dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function getTouchCenter(touches) {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2
    };
  }

  function onTouchStart(e) {
    if (e.target.closest('.world-section') || e.target.closest('.section-nav') ||
        e.target.closest('.navbar') || e.target.closest('a') || e.target.closest('button')) return;

    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchStartCx = state.cx;
      touchStartCy = state.cy;
      touchMode = 'swipe';
      touchSwipeHandled = false;
    } else if (e.touches.length === 2) {
      e.preventDefault();
      touchMode = 'pinch';
      touchStartDist = getTouchDist(e.touches);
      touchStartScale = state.scale;
      touchStartCx = state.cx;
      touchStartCy = state.cy;
      enterFreeMode();
    }
  }

  function onTouchMove(e) {
    if (!touchMode) return;

    if (touchMode === 'swipe' && e.touches.length === 1) {
      var dy = e.touches[0].clientY - touchStartY;
      var dx = e.touches[0].clientX - touchStartX;

      /* If moved enough horizontally, switch to pan (free mode) */
      if (Math.abs(dx) > 30 && !touchSwipeHandled) {
        touchMode = 'pan';
        enterFreeMode();
      }

      if (touchMode === 'swipe' && !touchSwipeHandled) {
        /* Vertical swipe: advance/retreat waypoints */
        if (Math.abs(dy) > 50) {
          e.preventDefault();
          touchSwipeHandled = true;
          if (dy < 0) {
            nextWaypoint();
          } else {
            prevWaypoint();
          }
        }
      }

      if (touchMode === 'pan') {
        e.preventDefault();
        var panDx = (e.touches[0].clientX - touchStartX) / state.scale;
        var panDy = (e.touches[0].clientY - touchStartY) / state.scale;
        setCameraImmediate(touchStartCx - panDx, touchStartCy - panDy, state.scale);
        updateVisibility();
        resetSnapTimer();
      }
    } else if (touchMode === 'pinch' && e.touches.length === 2) {
      e.preventDefault();
      var dist = getTouchDist(e.touches);
      var ratio = dist / touchStartDist;
      var newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, touchStartScale * ratio));

      setCameraImmediate(state.cx, state.cy, newScale);
      updateVisibility();
      resetSnapTimer();
    }
  }

  function onTouchEnd(e) {
    if (e.touches.length === 0) {
      touchMode = null;
      if (state.mode === 'free') {
        resetSnapTimer();
      }
    } else if (e.touches.length === 1 && touchMode === 'pinch') {
      /* Went from pinch to single finger — switch to pan */
      touchMode = 'pan';
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartCx = state.cx;
      touchStartCy = state.cy;
    }
  }

  /* ==============================
     STARFIELD GENERATION
     ============================== */
  function generateStarfield() {
    if (!starfield) return;
    starfield.innerHTML = '';

    var count = isMobile ? 70 : 120;

    for (var i = 0; i < count; i++) {
      var star = document.createElement('div');
      star.className = 'star';
      var size = Math.random() * 2.5 + 0.5;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--twinkle-dur', (Math.random() * 4 + 2) + 's');
      star.style.setProperty('--twinkle-delay', (Math.random() * 5) + 's');
      star.style.setProperty('--star-min-opacity', (Math.random() * 0.2 + 0.1).toFixed(2));
      star.style.setProperty('--star-max-opacity', (Math.random() * 0.5 + 0.4).toFixed(2));
      starfield.appendChild(star);
    }
  }

  /* ==============================
     SECTION NAV CLICK HANDLERS
     ============================== */
  function setupNavClicks() {
    navItems.forEach(function(item, i) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        goToWaypoint(i);
      });
    });
  }

  /* ==============================
     AUTO-PLAY
     ============================== */
  var AUTO_PLAY_DELAY = 3500;
  var autoPlayTimer = null;
  var autoPlayActive = false;
  var autoPlayCancelled = false;

  function cancelAutoPlay() {
    if (autoPlayCancelled) return;
    autoPlayCancelled = true;
    autoPlayActive = false;
    if (autoPlayTimer) {
      clearTimeout(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function autoPlayNext() {
    if (!autoPlayActive || autoPlayCancelled) return;
    if (state.currentWaypoint >= waypoints.length - 1) {
      autoPlayActive = false;
      return;
    }
    autoPlayTimer = setTimeout(function() {
      if (!autoPlayActive || autoPlayCancelled) return;
      goToWaypoint(state.currentWaypoint + 1, ANIM_DURATION);
      /* Schedule next after animation completes */
      setTimeout(function() {
        autoPlayNext();
      }, ANIM_DURATION + 100);
    }, AUTO_PLAY_DELAY);
  }

  function startAutoPlay() {
    if (autoPlayCancelled) return;
    autoPlayActive = true;
    autoPlayNext();
  }

  /* --- Cancel auto-play on any user input --- */
  function setupAutoPlayCancellers() {
    var events = ['wheel', 'mousedown', 'touchstart', 'keydown'];
    events.forEach(function(evt) {
      window.addEventListener(evt, function onUserInput() {
        if (autoPlayActive && state.introPlayed) {
          cancelAutoPlay();
        }
      }, { once: false, passive: true });
    });
    /* Also cancel on nav dot click */
    navItems.forEach(function(item) {
      item.addEventListener('click', function() {
        cancelAutoPlay();
      });
    });
  }

  /* ==============================
     INTRO SEQUENCE
     ============================== */
  function playIntro() {
    var alreadyPlayed = sessionStorage.getItem('launchedops_spatial_played');

    if (alreadyPlayed || prefersReducedMotion) {
      /* Skip intro + auto-play, go to waypoint 1 (hero) in guided mode */
      state.introPlayed = true;
      autoPlayCancelled = true;
      var wp = getWaypointPosition(1);
      setCameraImmediate(wp.x, wp.y, wp.scale);
      state.currentWaypoint = 1;
      updateNavDots();
      updateNavProgress();
      updateNavbarAccent();
      updateVisibility();
      return;
    }

    /* Step 1: start at scale 0.15, centered at overview y */
    setCameraImmediate(0, -100, 0.15);

    /* Step 2: after 200ms, zoom to overview (scale 0.20) */
    setTimeout(function() {
      animateCameraTo(0, -100, 0.20, INTRO_ZOOM_DUR, function() {
        /* Step 3: after 500ms pause, fly to hero at nose cone */
        setTimeout(function() {
          state.currentWaypoint = 1;
          var wp = getWaypointPosition(1);
          animateCameraTo(wp.x, wp.y, wp.scale, INTRO_NAV_DUR, function() {
            state.introPlayed = true;
            updateNavDots();
            updateNavProgress();
            updateNavbarAccent();
            /* Start auto-play after landing on hero */
            startAutoPlay();
          });
        }, 500);
      });
    }, 200);

    sessionStorage.setItem('launchedops_spatial_played', '1');
  }

  /* ==============================
     INIT
     ============================== */
  function init() {
    if (prefersReducedMotion) {
      /* Reduced motion: add class but don't set up spatial controls */
      document.body.classList.add('spatial-mode');
      /* Make all sections visible */
      worldSections.forEach(function(sec) { sec.classList.add('ws-visible'); });
      if (worldFooter) worldFooter.classList.add('ws-visible');
      return;
    }

    document.body.classList.add('spatial-mode');

    /* Always show scrolled navbar */
    if (navbar) navbar.classList.add('scrolled');

    updateViewport();
    generateStarfield();
    positionSections();
    computeWaypointFit();
    createOverviewLabels();
    setupNavClicks();
    setupAutoPlayCancellers();

    /* Recompute fit after fonts load (may change section heights) */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function() {
        computeWaypointFit();
      });
    }

    /* Bind events */
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKeyDown);

    /* Touch */
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd);

    /* Resize */
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        updateViewport();
        positionSections();
        computeWaypointFit();
        generateStarfield();
        /* Re-apply current camera */
        applyCameraTransform(state.cx, state.cy, state.scale, false);
        updateVisibility();
      }, 200);
    });

    /* Start intro */
    playIntro();
  }

  /* Run on DOMContentLoaded or immediately if already loaded */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* --- Public API --- */
  return {
    getState: function() {
      return {
        cx: state.cx,
        cy: state.cy,
        scale: state.scale,
        waypoint: state.currentWaypoint,
        mode: state.mode,
        isAnimating: state.isAnimating
      };
    },
    goToWaypoint: goToWaypoint,
    nextWaypoint: nextWaypoint,
    prevWaypoint: prevWaypoint
  };

})();
