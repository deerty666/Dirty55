const CACHE_NAME = 'sahayeb-menu-v1'; 
const URLS_TO_CACHE = [
  // الملفات الأساسية
  '/', 
  '/index.html',
  '/manifest.json',
  
  // ملفات التصميم والـ JavaScript
  '/style.css', // ملف التصميم الخاص بك
  '/script.js', // ملف JavaScript الخاص بك
  
  // 📁 ملفات أقسام المنيو الإضافية (من القائمة التي أرسلتها) 📁
  '/appetizers.html',
  '/chicken.html',
  '/drinks.html',
  '/grills.html',
  '/kunafa.html',
  '/meat.html',
  
  // أيقونات PWA
  '/icon-192x192.png', 
  '/icon-512x512.png', 

  // ⚠️ التعديل الإجباري: أضف مسارات جميع صور الأطباق لديك هنا ⚠️
  // مثال:
  '/images/dish-image-1.jpg', 
  '/images/dish-image-2.jpg', 
];

// ... (باقي كود Install و Fetch يبقى كما هو) ...
self.addEventListener('install', event => { /* ... */ });
self.addEventListener('fetch', event => { /* ... */ });
