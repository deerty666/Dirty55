// 🛑 تم تحديث رقم الإصدار لكسر الكاش القديم والتأكد من تحميل التغييرات
const CACHE_NAME = 'deerty-cache-v4'; 

// قائمة بالملفات الأساسية التي يجب تخزينها مؤقتاً
const urlsToCache = [
  '/Dirty55/', 
  '/Dirty55/index.html', 
  '/Dirty55/menu.html',
  '/Dirty55/branch_selector.html', // 🎯 صفحة اختيار الفروع
  '/Dirty55/app.js', 
  '/Dirty55/style.css', 
  '/Dirty55/manifest.json', 
  
  // يرجى التأكد من إضافة مسارات جميع الأيقونات والصور الأساسية 
  // لضمان تحميلها بشكل صحيح في وضع عدم الاتصال.
  '/Dirty55/icons/icon-72x72.png',
  '/Dirty55/icons/icon-96x96.png',
  '/Dirty55/icons/icon-128x128.png',
  '/Dirty55/icons/icon-144x144.png',
  '/Dirty55/icons/icon-152x152.png',
  '/Dirty55/icons/icon-192x192.png',
  '/Dirty55/icons/icon-384x384.png',
  '/Dirty55/icons/icon-512x512.png',
  '/Dirty55/logo-bg.webp',
  // يمكنك إضافة المزيد من مسارات الصور هنا:
  // '/Dirty55/sh00.webp',
  // '/Dirty55/md00.webp',
  // ... إلخ
];

// حدث التثبيت (Install Event) - تخزين الملفات الأساسية
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

// حدث التنشيط (Activate Event) - مسح الكاشات القديمة
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

// حدث الجلب (Fetch Event) - استراتيجية Cache First
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
        return fetch(event.request).catch((error) => {
          console.error('[Service Worker] Fetching failed:', event.request.url, error);
          // يمكن هنا إرجاع صفحة Offline Fallback في حالة فشل الجلب وعدم وجود الكاش
          // return caches.match('/Dirty55/offline.html'); 
        });
      })
  );
});
