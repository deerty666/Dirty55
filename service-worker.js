const CACHE_NAME = 'menu-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    // يجب إضافة صور الأيقونات هنا
    './icon-192x192.png', 
    './icon-512x512.png'
];

// تثبيت عامل الخدمة وتخزين الأصول (Assets)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// اعتراض الطلبات وتقديمها من التخزين المؤقت أولاً
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // يعود بالملف من الكاش إذا وُجد
                if (response) {
                    return response;
                }
                // وإلا يقوم بجلب الملف من الشبكة
                return fetch(event.request);
            })
    );
});
