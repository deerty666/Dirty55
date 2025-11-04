// ====== 1. هيكل بيانات القائمة ======
const menuItems = [
    { id: 'D01', name: 'دجاج شواية كامل', price: 35.00, section: 'الدجاج' },
    { id: 'D02', name: 'دجاج شواية نصف', price: 18.00, section: 'الدجاج' },
    { id: 'M01', name: 'لحم مندي', price: 90.00, section: 'اللحم' },
    { id: 'S01', name: 'مشويات مشكلة', price: 60.00, section: 'المشويات' },
    // يجب إضافة جميع الأصناف هنا
];

// السلة التي تخزن خيارات العميل
let cartItems = []; 

// دالة مساعدة: لإيجاد تفاصيل الصنف بالـ ID
function getItemDetails(id) {
    return menuItems.find(item => item.id === id);
}

// ====== 2. دالة تحديث الواجهة البصرية للسلة ======
function updateCartUI() {
    const cartDetails = document.getElementById('cart-details');
    let subtotal = 0;
    let html = '';

    if (cartItems.length === 0) {
        cartDetails.innerHTML = '<p>السلة فارغة.</p>';
        return;
    }

    html += '<ul>';
    cartItems.forEach(item => {
        const itemDetails = getItemDetails(item.id);
        if (!itemDetails) return;
        
        const total = itemDetails.price * item.quantity;
        subtotal += total;
        html += `<li>${itemDetails.name} x ${item.quantity} (${total.toFixed(2)} ر.س)</li>`;
    });
    html += '</ul>';
    html += `<p><strong>المجموع الفرعي:</strong> ${subtotal.toFixed(2)} ر.س</p>`;
    cartDetails.innerHTML = html;
}

// ====== 3. دالة الإضافة إلى السلة ======
function addToCart(itemId, itemName, itemPrice) {
    const existingItemIndex = cartItems.findIndex(item => item.id === itemId);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push({ 
            id: itemId, 
            price: itemPrice, 
            quantity: 1 
        });
    }

    alert(`تم إضافة ${itemName} إلى السلة!`); 
    updateCartUI(); 
}

// ====== 4. دالة إنشاء رابط الواتساب النهائي ======
const sendButton = document.getElementById('sendOrderBtn');
sendButton.addEventListener('click', createWhatsAppLink);

function createWhatsAppLink() {
    if (cartItems.length === 0) {
        alert('سلة الطلبات فارغة، يرجى إضافة صنف واحد على الأقل.');
        return;
    }

    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;

    if (!customerName || !customerPhone) {
        alert('الرجاء إدخال الاسم ورقم الجوال لإكمال الطلب.');
        return;
    }

    const phoneNumber = '966536803598'; 
    const deliveryFee = 5.00; 
    
    let subtotal = 0; 
    let orderList = '';

    cartItems.forEach(item => {
        const itemDetails = getItemDetails(item.id);
        const itemTotal = itemDetails.price * item.quantity;
        subtotal += itemTotal;
        orderList += `* ${itemDetails.name} (×${item.quantity}) - ${itemTotal.toFixed(2)} ر.س%0A`;
    });

    const total = subtotal + deliveryFee;

    // بناء رسالة الواتساب النهائية 
    const finalMessage = `✅ *مطعم سحايب ديرتي: طلب جديد!*%0A%0A` +
        `*الاسم:* ${customerName}%0A` +
        `*الجوال:* ${customerPhone}%0A` +
        `%0A--- قائمة الطلبات ---%0A` +
        `${orderList}` +
        `%0A---%0A` +
        `*المجموع الفرعي:* ${subtotal.toFixed(2)} ر.س%0A` +
        `*رسوم التوصيل:* ${deliveryFee.toFixed(2)} ر.س%0A` +
        `*الإجمالي النهائي:* ${total.toFixed(2)} ر.س%0A` +
        `*طريقة الاستلام:* توصيل 🚚%0A` +
        `*طريقة الدفع:* نقداً / شبكة عند التوصيل`;
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    
    window.open(whatsappURL, '_blank');
}

// ====== 5. كود الرسالة المنبثقة والتثبيت (PWA) - النسخة النهائية لضمان عمل النقر ======
let deferredPrompt; 
const installButton = document.getElementById('installButton');
const installPromoLink = document.getElementById('installPromoLink'); 

// 1. الدالة التي تتولى إطلاق شاشة التثبيت
const promptHandler = () => { 
    // التحقق الضروري للتأكد من أن المتصفح جاهز
    if (deferredPrompt) {
         deferredPrompt.prompt();
    } else {
        // رسالة مساعدة في حال فشل الربط التلقائي، رغم أن الرابط ظهر
        alert('لتثبيت المنيو، يرجى استخدام خيار "الإضافة إلى الشاشة الرئيسية" من قائمة المتصفح (الثلاث نقاط في الأعلى).');
    }
};

// 2. ربط النقر بالزرين مباشرة
if (installButton) {
    installButton.addEventListener('click', promptHandler);
}

if (installPromoLink) {
    installPromoLink.addEventListener('click', promptHandler);
}

// 3. معالج الحدث قبل التثبيت (وظيفته الوحيدة هي تخزين الأمر وإظهار الأزرار)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); 
    deferredPrompt = e; 

    // إظهار الأزرار
    if (installButton) {
        installButton.style.display = 'block';
    }
    
    if (installPromoLink) { 
        installPromoLink.style.display = 'block';
    }
});

// عند تحميل الصفحة، تأكد من تحديث واجهة السلة 
window.onload = updateCartUI; 

// ====== 6. تسجيل عامل الخدمة (Service Worker) لتفعيل التثبيت PWA (الجزء الحاسم!) ======
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // يجب التأكد من وجود ملف sw.js في نفس المجلد
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('Service Worker registration failed: ', registrationError);
            });
    });
}
