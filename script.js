// بيانات المنيو
const menuItems = [
    { id: 'D01', name: 'دجاج شواية كامل', price: 35.00, section: 'الدجاج' },
    { id: 'D02', name: 'دجاج شواية نصف', price: 18.00, section: 'الدجاج' },
    { id: 'M01', name: 'لحم مندي', price: 90.00, section: 'اللحم' },
    { id: 'S01', name: 'مشويات مشكلة', price: 60.00, section: 'المشويات' },
];

let cartItems = [];

function getItemDetails(id) {
    return menuItems.find(item => item.id === id);
}

function updateCartUI() {
    const cartDetails = document.getElementById('cart-details');
    let subtotal = 0;
    if (cartItems.length === 0) {
        cartDetails.innerHTML = '<p>السلة فارغة.</p>';
        return;
    }
    let html = '<ul>';
    cartItems.forEach(item => {
        const itemDetails = getItemDetails(item.id);
        const total = itemDetails.price * item.quantity;
        subtotal += total;
        html += `<li>${itemDetails.name} x ${item.quantity} (${total.toFixed(2)} ر.س)</li>`;
    });
    html += `</ul><p><strong>المجموع الفرعي:</strong> ${subtotal.toFixed(2)} ر.س</p>`;
    cartDetails.innerHTML = html;
}

function addToCart(itemId, itemName, itemPrice) {
    const existing = cartItems.find(i => i.id === itemId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cartItems.push({ id: itemId, price: itemPrice, quantity: 1 });
    }
    alert(`تم إضافة ${itemName} إلى السلة!`);
    updateCartUI();
}

// واتساب
document.getElementById('sendOrderBtn').addEventListener('click', () => {
    if (cartItems.length === 0) { alert('السلة فارغة'); return; }
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    if (!name || !phone) { alert('الرجاء إدخال الاسم ورقم الجوال'); return; }
    
    const deliveryFee = 5.00;
    let subtotal = 0;
    let orderList = '';
    cartItems.forEach(item => {
        const details = getItemDetails(item.id);
        const total = details.price * item.quantity;
        subtotal += total;
        orderList += `* ${details.name} (×${item.quantity}) - ${total.toFixed(2)} ر.س%0A`;
    });
    const total = subtotal + deliveryFee;
    const phoneNumber = '966536803598';
    const finalMessage = `✅ *مطعم سحايب ديرتي: طلب جديد!*%0A%0A`+
                         `*الاسم:* ${name}%0A`+
                         `*الجوال:* ${phone}%0A`+
                         `%0A--- قائمة الطلبات ---%0A${orderList}`+
                         `%0A---%0A*المجموع الفرعي:* ${subtotal.toFixed(2)} ر.س%0A`+
                         `*رسوم التوصيل:* ${deliveryFee.toFixed(2)} ر.س%0A`+
                         `*الإجمالي النهائي:* ${total.toFixed(2)} ر.س%0A`+
                         `*طريقة الاستلام:* توصيل 🚚%0A*طريقة الدفع:* نقداً / شبكة عند التوصيل`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`, '_blank');
});

// تثبيت التطبيق PWA
let deferredPrompt;
const installButton = document.getElementById('installButton');
const installPromoLink = document.getElementById('installPromoLink');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'block';
    installPromoLink.style.display = 'block';
});

function promptInstall() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            deferredPrompt = null;
            installButton.style.display = 'none';
            installPromoLink.style.display = 'none';
        });
    }
}

installButton.addEventListener('click', promptInstall);
installPromoLink.addEventListener('click', promptInstall);

window.onload = updateCartUI;

// تسجيل Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('SW registration failed', err));
    });
}
