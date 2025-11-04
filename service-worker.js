const CACHE_NAME = 'sahayeb-menu-v2'; // قمنا بزيادة رقم الإصدار لضمان تحديث التخزين المؤقت
const URLS_TO_CACHE = [
  // الملفات الأساسية وهياكل الصفحات
  '/', 
  '/index.html',
  '/manifest.json',
  
  // ملفات أقسام المنيو الخاصة بك
  '/appetizers.html',
  '/chicken.html',
  '/drinks.html',
  '/grills.html',
  '/kunafa.html',
  '/meat.html',
  
  // ملفات التصميم والـ JavaScript
  '/style.css', 
  '/script.js', 
  
  // أيقونات PWA (تأكد من وجودها في المسار الصحيح)
  '/icon-192x192.png', 
  '/icon-512x512.png', 

  // ⚠️⚠️⚠️ تذكير: يجب إضافة جميع مسارات صور الأطباق هنا لاحقاً ⚠️⚠️⚠️
  // مثال: '/images/dish1.jpg', 
];

// 1. حدث التثبيت: لتخزين الملفات
self.addEventListener('install', event => {
  console.log('Service Worker: يتم التخزين المؤقت للملفات الأساسية');
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
        // إذا وجد الملف مخزناً، يتم إرجاعه فوراً
        if (response) {
          return response;
        }
        
        // وإلا، يتم طلبه من الشبكة
        return fetch(event.request);
      })
  );
});
