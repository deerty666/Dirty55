const CACHE_NAME = 'dirty55-menu-cache-v1.0'; // يجب تحديث هذا الإصدار عند كل تغيير كبير
// 🔑 أهم تعديل: جميع المسارات يجب أن تبدأ بـ /Dirty55/
const urlsToCache = [
    // الملفات الأساسية
    '/Dirty55/', 
    '/Dirty55/index.html',
    '/Dirty55/branch_selector.html',
    '/Dirty55/style.css',
    '/Dirty55/script.js',
    '/Dirty55/manifest.json',
    
    // الأيقونات (تأكد من وجودها)
    '/Dirty55/icons/icon-192x192.png',
    '/Dirty55/icons/icon-512x512.png',
    
    // بعض الأصول الهامة الأخرى (يمكنك إضافة المزيد من الصور التي لا تتغير)
    '/Dirty55/logo-bg.webp',
    '/Dirty55/sh00.webp',
    // ... يفضل إضافة جميع الصور الثابتة هنا لضمان عملها أوفلاين
];

// حدث التثبيت (Install): يتم تخزين الملفات في الذاكرة المؤقتة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and adding files...');
        return cache.addAll(urlsToCache).catch(error => {
            console.error('Failed to cache files:', error);
        });
      })
  );
  // يتم تفعيل عامل الخدمة الجديد فوراً
  self.skipWaiting();
});

// حدث الجلب (Fetch): يتم البحث أولاً في الذاكرة المؤقتة قبل الذهاب للشبكة
self.addEventListener('fetch', event => {
  // هذا المنطق يستخدم استراتيجية "Cache, then Network"
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجدنا الملف في الكاش، نستخدمه
        if (response) {
          return response;
        }
        // إذا لم نجده، نذهب للشبكة
        return fetch(event.request);
      })
  );
});

// حدث التفعيل (Activate): يتم حذف الإصدارات القديمة من الكاش
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // تأكد من سيطرة عامل الخدمة على جميع العملاء
  return self.clients.claim();
});
