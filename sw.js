/**
 * Newton Gakuya Portfolio - Service Worker
 * Enhanced offline capability and performance optimization
 */

const CACHE_VERSION = 'ng-portfolio-v3.0';
const CACHE_NAME = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/styles.css',
  '/assets/js/main.js',
  '/profilep.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// Maximum cache size for dynamic content
const MAX_CACHE_SIZE = 50;

// Cache size limiter
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(() => limitCacheSize(name, size));
      }
    });
  });
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(error => console.error('[SW] Installation failed:', error))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys
            .filter(key => key !== CACHE_NAME && key !== DYNAMIC_CACHE && key !== IMAGE_CACHE)
            .map(key => {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            })
        );
      })
      .then(() => self.clients.claim())
      .catch(error => console.error('[SW] Activation failed:', error))
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external API calls (like Formspree)
  if (url.origin.includes('formspree.io')) return;

  // Handle different types of requests with appropriate strategies
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (url.pathname.match(/\.(css|js)$/)) {
    event.respondWith(handleStaticAssets(request));
  } else {
    event.respondWith(handlePageRequest(request));
  }
});

// Cache-first strategy for images
const handleImageRequest = async (request) => {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    const fetchResponse = await fetch(request);
    if (fetchResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, fetchResponse.clone());
      limitCacheSize(IMAGE_CACHE, MAX_CACHE_SIZE);
    }
    return fetchResponse;
  } catch (error) {
    console.error('[SW] Image fetch failed:', error);
    return caches.match('/assets/icons/placeholder.svg');
  }
};

// Stale-while-revalidate strategy for static assets
const handleStaticAssets = async (request) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    });

    return cachedResponse || fetchPromise;
  } catch (error) {
    console.error('[SW] Static asset fetch failed:', error);
    return caches.match(request);
  }
};

// Network-first strategy for pages, fallback to cache
const handlePageRequest = async (request) => {
  try {
    // Try network first
    const fetchResponse = await fetch(request);
    
    if (fetchResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, fetchResponse.clone());
      limitCacheSize(DYNAMIC_CACHE, MAX_CACHE_SIZE);
    }
    
    return fetchResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    // Fallback to offline page
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }

    console.error('[SW] Page fetch failed:', error);
    throw error;
  }
};

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(keys => {
      keys.forEach(key => caches.delete(key));
    });
  }
});

// Background sync (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

const syncMessages = async () => {
  console.log('[SW] Syncing messages...');
  // Implement background sync logic here if needed
};

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/profilep.jpg',
    badge: '/assets/icons/badge.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification('Newton Gakuya Portfolio', options)
  );
});
