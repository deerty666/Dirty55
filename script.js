const cartItemsContainer = document.getElementById('modal-cart-items');
const cartTotalCount = document.getElementById('cart-item-count');
const finalTotalDisplay = document.getElementById('final-total');
const sendOrderBtn = document.getElementById('send-order-btn');

const checkoutModal = document.getElementById('checkout-modal');
const openCartBtn = document.getElementById('open-cart-btn');
const closeBtn = document.querySelector('.close-btn');
const shippingOptions = document.querySelectorAll('input[name="shipping"]');
const deliveryAddress = document.getElementById('delivery-address');

const DELIVERY_FEE = 5.00;
let cart = [];


// === دوال التحكم في النافذة المنبثقة (Modal) ===
function openModal() {
    // نفتح النافذة المنبثقة فقط إذا كانت السلة غير فارغة
    if (cart.length > 0) {
        checkoutModal.style.display = 'block';
        renderModal(); // تأكد من تحديث البيانات عند الفتح
    } else {
        alert('السلة فارغة. الرجاء إضافة أطباق أولاً.');
    }
}

function closeModal() {
    checkoutModal.style.display = 'none';
}

// إغلاق النافذة عند الضغط على زر X
closeBtn.onclick = closeModal;

// إغلاق النافذة عند الضغط خارجها
window.onclick = function(event) {
    if (event.target == checkoutModal) {
        closeModal();
    }
}

// === وظيفة تغيير الكمية (زيادة أو نقصان) ===
function changeQuantity(itemName, change) {
    const item = cart.find(i => i.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            // إذا أصبحت الكمية صفر أو أقل، احذف الصنف
            removeItem(itemName);
        }
    }
    renderModal();
}

// === وظيفة حذف الصنف بالكامل ===
function removeItem(itemName) {
    cart = cart.filter(i => i.name !== itemName);
    // إذا أصبحت السلة فارغة بعد الحذف، أغلق النافذة المنبثقة
    if (cart.length === 0) {
        closeModal();
    }
    renderModal();
}

// === وظيفة حساب الإجمالي النهائي بناءً على خيار الشحن ===
function calculateFinalTotal() {
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let shippingFee = 0;
    let selectedShipping = document.querySelector('input[name="shipping"]:checked').value;

    if (selectedShipping === 'delivery') {
        shippingFee = DELIVERY_FEE;
        deliveryAddress.style.display = 'block'; // إظهار حقل العنوان
    } else {
        deliveryAddress.style.display = 'none'; // إخفاء حقل العنوان
    }

    let finalTotal = subtotal + shippingFee;
    finalTotalDisplay.textContent = finalTotal.toFixed(2);
    
    return { finalTotal, subtotal, shippingFee, selectedShipping };
}


// === وظيفة تحديث محتوى النافذة المنبثقة ===
function renderModal() {
    cartItemsContainer.innerHTML = '';
    let totalItemsCount = 0;
    
    // 1. عرض الأصناف وتفاصيلها
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #999;">الطلب فارغ حالياً.</p>';
        cartTotalCount.textContent = '0';
    } else {
        cart.forEach((item) => {
            totalItemsCount += item.quantity;
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee;';

            // الهيكل الجديد الذي يضيف أزرار التحكم
            itemElement.innerHTML = `
                <div style="flex-grow: 1;">
                    <strong>${item.name}</strong>
                    <div style="font-size: 0.9em; color: #666; font-weight: bold;">${(item.price * item.quantity).toFixed(2)} ريال</div>
                </div>
                <div style="display: flex; align-items: center;">
                    <button onclick="changeQuantity('${item.name}', -1)" style="padding: 5px 10px; margin: 0 5px; background-color: #f44336; color: white; border: none; border-radius: 3px; cursor: pointer;">-</button>
                    <span style="min-width: 15px; text-align: center;">${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', 1)" style="padding: 5px 10px; margin: 0 5px; background-color: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer;">+</button>
                    <button onclick="removeItem('${item.name}')" style="padding: 5px 8px; margin-right: 5px; background-color: #ccc; color: #333; border: none; border-radius: 3px; cursor: pointer; font-weight: bold;">X</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartTotalCount.textContent = totalItemsCount;

        // 2. حساب وتحديث الإجمالي النهائي
        const { finalTotal, subtotal, shippingFee, selectedShipping } = calculateFinalTotal();

        // 3. تجهيز رسالة الواتساب
        prepareWhatsAppMessage(finalTotal, subtotal, shippingFee, selectedShipping);
    }
}

// === وظيفة تجهيز رسالة الواتساب ===
function prepareWhatsAppMessage(finalTotal, subtotal, shippingFee, selectedShipping) {
    let orderMessage = 'مرحباً، أود طلب الأطباق التالية:\n\n';

    cart.forEach((item, index) => {
        orderMessage += `${index + 1}. ${item.name} - الكمية: ${item.quantity} - الإجمالي: ${item.price * item.quantity} ريال\n`;
    });

    orderMessage += `\n--- تفاصيل الطلب ---\n`;
    orderMessage += `الإجمالي الفرعي: ${subtotal.toFixed(2)} ريال\n`;

    let shippingMethodText = (selectedShipping === 'delivery') ? 
        `توصيل (+${shippingFee.toFixed(2)} ريال)` : 
        `استلام من المطعم (مجاني)`;
    
    orderMessage += `طريقة الاستلام: ${shippingMethodText}\n`;

    if (selectedShipping === 'delivery') {
        const address = deliveryAddress.value.trim() || 'لم يتم تزويد العنوان.';
        orderMessage += `عنوان التوصيل: ${address}\n`;
    }

    orderMessage += `\nالإجمالي النهائي: ${finalTotal.toFixed(2)} ريال.`;

    // تجهيز رابط الواتساب (غيّر هذا الرقم إلى رقم مطعمك)
    const phoneNumber = '966500000000'; 
    const encodedMessage = encodeURIComponent(orderMessage);
    sendOrderBtn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}


// === وظيفة الإضافة للسلة ===
function addToCart(event) {
    const button = event.target;
    const menuItem = button.closest('.menu-item');
    const name = menuItem.querySelector('h4').dataset.name;
    const price = parseFloat(menuItem.querySelector('.price').dataset.price);

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    renderModal(); // تحديث عداد السلة بعد الإضافة
}

// === ربط الأحداث الرئيسية ===

// ربط أزرار الإضافة بـ JavaScript
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', addToCart);
});

// ربط زر "عرض السلة" بفتح النافذة المنبثقة
openCartBtn.addEventListener('click', openModal);

// تحديث الإجمالي عند تغيير خيار التوصيل
shippingOptions.forEach(radio => {
    radio.addEventListener('change', renderModal);
});

// تحديث الإجمالي ورسالة الواتساب عند تغيير العنوان
deliveryAddress.addEventListener('input', renderModal);


// تشغيل الدالة لأول مرة عند تحميل الصفحة لتصفير العداد
renderModal();
