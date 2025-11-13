// 🛑 التعديل المطلوب: تم تغيير رقم الإصدار من v2 إلى v3 لكسر الكاش القديم
const CACHE_NAME = 'deerty-cache-v3'; 

// قائمة بالملفات الأساسية التي يجب تخزينها مؤقتاً
const urlsToCache = [
  '/Dirty55/', // المسار الأساسي لضمان عمل الـ PWA
  '/Dirty55/index.html', // إذا كان هذا هو الملف الرئيسي (عادة ما يكون menu.html هو الأساسي هنا)
  '/Dirty55/menu.html',
  '/Dirty55/branch_selector.html', // 🎯 الأهم: يجب أن يكون هذا الملف مخزناً
  '/Dirty55/app.js', // ملف JavaScript الرئيسي
  '/Dirty55/style.css', // ملف CSS
  '/Dirty55/manifest.json', // ملف المانيفيست
  // يرجى إضافة مسارات جميع الصور الأساسية هنا لتحسين الأداء
  // '/Dirty55/logo.png', 
  // '/Dirty55/sh00.webp',
  // ... إلخ
];

// حدث التثبيت (Install Event)
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install Event. Caching Shell');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching App Shell');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error('[Service Worker] Caching failed:', err);
      })
  );
});

// حدث التنشيط (Activate Event)
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate Event. Cleaning up old caches.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // تأكد من أن العامل الخدمي يتحكم في العملاء الحاليين (Clients)
  return self.clients.claim(); 
});

// حدث الجلب (Fetch Event)
self.addEventListener('fetch', (event) => {
  // استراتيجية Cache First ثم Network Fallback
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // إذا وجدنا استجابة في الكاش، نرجعها
        if (response) {
          return response;
        }
        
        // إذا لم نجدها، نذهب لطلبها من الشبكة
        return fetch(event.request).catch(() => {
          // يمكن إضافة صفحة Offline Fallback هنا إذا لزم الأمر
          // return caches.match('/Dirty55/offline.html');
        });
      })
  );
});
