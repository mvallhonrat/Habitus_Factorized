const CACHE_NAME = 'habitus-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/js/core.js',
  '/js/storage.js',
  '/js/ui.js',
  '/js/charts.js',
  '/js/translate.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.filter(name => name !== CACHE_NAME)
           .map(name => caches.delete(name))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});