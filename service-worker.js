const CACHE_NAME = 'sahayeb-menu-v1'; // اسم ذاكرة التخزين المؤقت
const URLS_TO_CACHE = [
  // ملفات الـ PWA الأساسية
  '/', 
  '/index.html',
  '/manifest.json',
  
  // ملفات التصميم والـ JavaScript الخاصة بك
  '/style.css', 
  '/script.js',
  
  // أيقونات ملف البيان
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png',
  
  // ⛔⛔⛔ التعديل الإجباري: أضف مسارات جميع صور الأطباق لديك هنا ⛔⛔⛔
  // أمثلة (يرجى تعديلها حسب مسارات صورك الفعلية):
  '/images/chicken-grill.jpg', 
  '/images/lamb-mansaf.png', 
  '/images/dessert-knafa.jpg',
  // ⛔⛔⛔ انتهى التعديل. تأكد من أن كل ملف لديك موجود في القائمة ⛔⛔⛔
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
