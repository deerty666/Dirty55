// نظام نسخة تلقائي — رقم يتغير مع كل تحديث
const CACHE_NAME = 'deerty-menu-' + Date.now();

// الملفات الأساسية
const urlsToCache = [
    '/Dirty55/',
    '/Dirty55/menu.html',
    '/Dirty55/style.css',
    '/Dirty55/Script.js',
    '/Dirty55/manifest.json'
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(k => {
                    if (k !== CACHE_NAME) {
                        return caches.delete(k);
                    }
                })
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        fetch(evt.request, { cache: "no-store" })
            .catch(() => caches.match(evt.request))
    );
});
