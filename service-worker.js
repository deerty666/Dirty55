const CACHE_NAME = 'sahayeb-menu-v2'; 
const URLS_TO_CACHE = [
  // الملفات الأساسية وهياكل الصفحات
  '/', 
  '/index.html',
  '/manifest.json',
  '/service-worker.js', // ملف عامل الخدمة نفسه
  
  // ملفات أقسام المنيو (من قائمتك)
  '/appetizers.html',
  '/chicken.html',
  '/drinks.html',
  '/grills.html',
  '/kunafa.html',
  '/meat.html',
  
  // ملفات التصميم والـ JavaScript
  '/style.css', 
  '/script.js', 
  
  // أيقونات PWA
  '/icon-192x192.png', 
  '/icon-512x512.png', 

  // ⚠️⚠️⚠️ تذكير: يجب إضافة جميع مسارات صور الأطباق هنا لاحقاً ⚠️⚠️⚠️
];

// 1. حدث التثبيت: لتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// 2. حدث الجلب: للخدمة من الذاكرة المؤقتة أولاً (CACHE FIRST)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request);
      })
  );
});
