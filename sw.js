const CACHE_NAME = 'deerty-menu-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    // يجب إضافة مسارات الصور هنا أيضاً
    '/images/دجاج-شواية.jpg',
    '/images/لحم-مندي.jpg',
    '/images/مشويات-مشكلة.jpg',
    '/images/logo-192.png',
    '/images/logo-512.png',
];

// تثبيت عامل الخدمة وتخزين الأصول في الذاكرة المؤقتة (Cache)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// اعتراض طلبات الشبكة وتقديمها من الذاكرة المؤقتة (Cache first strategy)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // العثور على العنصر المخزن مؤقتاً
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// تحديث عامل الخدمة
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
