// Thompson's Junk Haulers — Service Worker v1
const CACHE_NAME = 'tjh-v1';
const PRECACHE_URLS = [
    '/',
    '/404.html',
    '/full-property-cleanouts-mesa-az/',
    '/hot-tub-removal-mesa-az/',
    '/furniture-removal-mesa-az/',
    '/appliance-removal-mesa-az/',
    '/yard-waste-removal-mesa-az/',
    '/construction-debris-removal-mesa-az/',
    '/junk-removal-tempe-az/',
    '/junk-removal-chandler-az/',
    '/junk-removal-gilbert-az/',
    '/junk-removal-scottsdale-az/',
    '/junk-removal-apache-junction-az/',
    '/junk-removal-queen-creek-az/'
];

// Install: pre-cache core pages
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(PRECACHE_URLS);
        }).then(function() {
            return self.skipWaiting();
        })
    );
});

// Activate: clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(name) {
                    return name !== CACHE_NAME;
                }).map(function(name) {
                    return caches.delete(name);
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

// Fetch: cache-first for static assets, network-first for HTML
self.addEventListener('fetch', function(event) {
    var request = event.request;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip external analytics/GTM requests
    if (request.url.includes('googletagmanager.com') || request.url.includes('google-analytics.com')) return;

    // For HTML pages: network-first (try network, fall back to cache)
    if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(request).then(function(response) {
                var responseClone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(request, responseClone);
                });
                return response;
            }).catch(function() {
                return caches.match(request).then(function(response) {
                    return response || caches.match('/404.html');
                });
            })
        );
        return;
    }

    // For images (Unsplash, etc.): cache-first
    if (request.url.includes('images.unsplash.com') || request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
        event.respondWith(
            caches.match(request).then(function(response) {
                if (response) return response;
                return fetch(request).then(function(networkResponse) {
                    var responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(request, responseClone);
                    });
                    return networkResponse;
                });
            })
        );
        return;
    }

    // For fonts: cache-first
    if (request.url.includes('/fonts/') || request.url.includes('fonts.gstatic.com')) {
        event.respondWith(
            caches.match(request).then(function(response) {
                if (response) return response;
                return fetch(request).then(function(networkResponse) {
                    var responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(request, responseClone);
                    });
                    return networkResponse;
                });
            })
        );
        return;
    }

    // Default: network-first
    event.respondWith(
        fetch(request).catch(function() {
            return caches.match(request);
        })
    );
});
