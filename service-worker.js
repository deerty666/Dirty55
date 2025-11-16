const CACHE_NAME = 'deerty-cache-v1.4'; // قم بزيادة رقم الإصدار عند تحديث الأصول
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/Dirty55/logo.webp',
  '/Dirty55/best_seller_icon.webp',
  // ... يمكنك إضافة جميع صور الوجبات هنا لضمان عملها بدون إنترنت
  '/Dirty55/sh00.webp',
  '/Dirty55/md00.webp',
  '/Dirty55/mn00.webp',
  '/Dirty55/mf00.webp',
  '/Dirty55/mf01.webp',
  '/Dirty55/mq00.webp',
  '/Dirty55/mg00.webp',
  '/Dirty55/zb00.webp',
  '/Dirty55/me00.webp',
  '/Dirty55/me01.webp',
  '/Dirty55/me02.webp',
  '/Dirty55/me03.webp',
  '/Dirty55/me04.webp',
  '/Dirty55/me05.webp',
  '/Dirty55/me06.webp',
  '/Dirty55/gr00.webp',
  '/Dirty55/gr01.webp',
  '/Dirty55/gr02.webp',
  '/Dirty55/gr03.webp',
  '/Dirty55/gr04.webp',
  '/Dirty55/gr05.webp',
  '/Dirty55/si00.webp',
  '/Dirty55/si01.webp',
  '/Dirty55/si02.webp',
  '/Dirty55/si03.webp',
  '/Dirty55/si04.webp',
  '/Dirty55/si05.webp',
  '/Dirty55/si06.webp',
  '/Dirty55/si07.webp',
  '/Dirty55/si08.webp',
  '/Dirty55/dr00.webp',
  '/Dirty55/dr01.webp',
  '/Dirty55/dr02.webp',
  '/Dirty55/dr03.webp',
  '/Dirty55/dr04.webp',
  '/Dirty55/dr05.webp',
  '/Dirty55/ed00.webp',
  '/Dirty55/ed01.webp',
  '/Dirty55/ed02.webp',
  '/Dirty55/ed03.webp',
  '/Dirty55/ed04.webp',
  '/Dirty55/ed05.webp',
  '/Dirty55/ap00.webp',
  '/Dirty55/ap01.webp',
  '/Dirty55/ap02.webp',
  '/Dirty55/ap03.webp',
  '/Dirty55/ap04.webp',
  '/Dirty55/ap05.webp',
  '/Dirty55/ap06.webp',
  '/Dirty55/ap07.webp',
  '/Dirty55/ap08.webp',
  '/Dirty55/ap09.webp',
  '/Dirty55/kn00.webp',
  '/Dirty55/kn01.webp',
  '/Dirty55/kn02.webp',
  '/Dirty55/kn03.webp',
];

// تثبيت العامل الخدمي وتخزين الأصول مؤقتاً
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and adding URLs');
        return cache.addAll(urlsToCache);
      })
  );
});

// تفعيل العامل الخدمي وحذف أي ذاكرة تخزين مؤقت قديمة
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// استراتيجية Network-first مع Fallback للـ Cache
self.addEventListener('fetch', (event) => {
  // للطلبات التي لا تتبع بروتوكول HTTP/HTTPS، نتجاهلها
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // إذا كان الطلب ناجحاً، نقوم بتحديث الكاش
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        // إذا فشل الاتصال بالشبكة، نعود إلى الكاش
        return caches.match(event.request);
      })
  );
});
