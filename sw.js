const CACHE_NAME = 'deerty-menu-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json'
    // لاحقًا يمكن إضافة الصور هنا مثل 'images/logo-192.png'
];

// تثبيت Service Worker وتخزين الملفات في الكاش
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// اعتراض الطلبات وتقديم الملفات من الكاش أولًا
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// حذف الكاش القديم عند التحديث
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => 
            Promise.all(
                cacheNames.map(name => {
                    if(!cacheWhitelist.includes(name)){
                        return caches.delete(name);
                    }
                })
            )
        )
    );
});
