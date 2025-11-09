const CACHE_NAME = 'deerty-cache-v1';
const FILES_TO_CACHE = [
  '/Dirty55/',
  '/Dirty55/index.html',
  '/Dirty55/manifest.json',
  '/Dirty55/icon/icon-192.png',
  '/Dirty55/icon/icon-512.png'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request).catch(() => {
      // صفحة offline يمكن إضافتها لاحقاً
    }))
  );
});
