// 🛑 تم تحديث رقم الإصدار لكسر الكاش القديم والتأكد من تحميل التغييرات
const CACHE_NAME = 'deerty-cache-v5'; 

// قائمة بالملفات الأساسية التي يجب تخزينها مؤقتاً
const urlsToCache = [
  // ✅ تم استبدال المسار الغامض /Dirty55/ بالملف المحدد
  '/Dirty55/index.html', 
  '/Dirty55/branch_selector.html', 
  '/Dirty55/script.js', 
  '/Dirty55/style.css', 
  '/Dirty55/manifest.json', 
  
  // ⚠️ يجب إضافة مسارات جميع صور المنتجات والأيقونات هنا لعمل وضع عدم الاتصال
  '/Dirty55/icons/icon-72x72.png',
  '/Dirty55/icons/icon-512x512.png',
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
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch((error) => {
          console.error('[Service Worker] Fetching failed:', event.request.url, error);
        });
      })
  );
});
