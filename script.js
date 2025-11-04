// ====== 1. هيكل بيانات القائمة ======
const menuItems = [
    { id: 'D01', name: 'دجاج شواية كامل', price: 35.00, section: 'الدجاج' },
    { id: 'D02', name: 'دجاج شواية نصف', price: 18.00, section: 'الدجاج' },
    { id: 'M01', name: 'لحم مندي', price: 90.00, section: 'اللحم' },
    { id: 'S01', name: 'مشويات مشكلة', price: 60.00, section: 'المشويات' },
    // يجب إضافة جميع الأصناف هنا
];

// السلة التي تخزن خيارات العميل (يجب أن تكون فارغة في البداية)
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
        if (!itemDetails) return; // حماية في حال كان الـ ID غير موجود
        
        const total = itemDetails.price * item.quantity;
        subtotal += total;
        html += `<li>${itemDetails.name} x ${item.quantity} (${total.toFixed(2)} ر.س)</li>`;
    });
    html += '</ul>';
    html += `<p><strong>المجموع الفرعي:</strong> ${subtotal.toFixed(2)} ر.س</p>`;
    cartDetails.innerHTML = html;
}

// ====== 3. دالة الإضافة إلى السلة (تُستدعى من زر الـ 'أضف') ======
function addToCart(itemId, itemName, itemPrice) {
    const existingItemIndex = cartItems.findIndex(item => item.id === itemId);

    if (existingItemIndex > -1) {
        // إذا كان موجوداً، نزيد الكمية
        cartItems[existingItemIndex].quantity += 1;
    } else {
        // إذا لم يكن موجوداً، نضيفه
        cartItems.push({ 
            id: itemId, 
            price: itemPrice, 
            quantity: 1 
        });
    }

    alert(`تم إضافة ${itemName} إلى السلة!`); 
    updateCartUI(); // تحديث واجهة السلة
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

// ====== 5. كود الرسالة المنبثقة للتثبيت (PWA) مع التعديلات الجديدة ======
let deferredPrompt; 
const installButton = document.getElementById('installButton');
const installPromoLink = document.getElementById('installPromoLink'); // استهداف الرابط الجديد

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); 
    deferredPrompt = e; 
    
    if (installButton) {
        installButton.style.display = 'block';
    }
    
    if (installPromoLink) { 
        // إظهار الرابط الجديد بجوار الاسم
        installPromoLink.style.display = 'block';
    }

    const promptHandler = () => { // دالة مشتركة للنقر
        deferredPrompt.prompt();
    };

    if (installButton) installButton.addEventListener('click', promptHandler);
    if (installPromoLink) installPromoLink.addEventListener('click', promptHandler); // ربط الرابط الجديد
});

// عند تحميل الصفحة، تأكد من تحديث واجهة السلة (ستظهر "السلة فارغة")
window.onload = updateCartUI; 
