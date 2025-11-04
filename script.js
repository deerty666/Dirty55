// ==========================================================
// 🚨 PWA Registration Code (يجب وضعه أولاً) 🚨
// ==========================================================
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker: Registration successful.');
    })
    .catch(error => {
      console.error('Service Worker: Registration failed:', error);
    });
}
// ==========================================================
// 🚨 نهاية كود PWA 🚨
// ==========================================================

// منطق سلة التسوق الخاصة بك يبدأ من هنا:
let cart = [];
const cartItemCount = document.getElementById('cart-item-count');
const modalCartItems = document.getElementById('modal-cart-items');
const finalTotalSpan = document.getElementById('final-total');
const sendOrderBtn = document.getElementById('send-order-btn');
const checkoutModal = document.getElementById('checkout-modal');
const openCartBtn = document.getElementById('open-cart-btn');
const closeBtn = document.querySelector('.close-btn');
const deliveryAddressInput = document.getElementById('delivery-address');
const shippingOptions = document.getElementById('shipping-options');


function updateCartCount() {
    cartItemCount.textContent = cart.length;
}

function calculateTotal() {
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let shippingCost = 0;
    
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    if (selectedShipping && selectedShipping.value === 'delivery') {
        shippingCost = 5.00; // تكلفة التوصيل
    }
    
    const finalTotal = subtotal + shippingCost;
    finalTotalSpan.textContent = finalTotal.toFixed(2);
    return { subtotal, shippingCost, finalTotal };
}

function updateCartModal() {
    modalCartItems.innerHTML = '';
    if (cart.length === 0) {
        modalCartItems.innerHTML = '<p style="text-align: center;">السلة فارغة حالياً.</p>';
        finalTotalSpan.textContent = '0.00';
        return;
    }
    
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item-summary';
        itemDiv.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px dashed #ccc; padding-bottom: 5px;';
        
        itemDiv.innerHTML = `
            <span>${item.name} (×${item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)} ريال</span>
        `;
        modalCartItems.appendChild(itemDiv);
    });
    
    calculateTotal();
}

function generateWhatsAppLink() {
    let message = `🛒 طلب جديد من منيو سحايب\n\n`;
    let itemsList = '';
    
    cart.forEach(item => {
        itemsList += `- ${item.name} (${item.quantity} × ${item.price} ر.س) = ${(item.price * item.quantity).toFixed(2)} ر.س\n`;
    });
    
    const totals = calculateTotal();
    const shippingType = document.querySelector('input[name="shipping"]:checked').value === 'delivery' ? 'توصيل' : 'استلام من المطعم';
    const address = shippingType === 'توصيل' ? `\n\nعنوان التوصيل: ${deliveryAddressInput.value || 'لم يتم إدخال عنوان'}` : '';

    message += `📝 تفاصيل الطلب:\n${itemsList}\n`;
    message += `-------------------------\n`;
    message += `إجمالي المنتجات: ${totals.subtotal.toFixed(2)} ر.س\n`;
    message += `طريقة الاستلام: ${shippingType}\n`;
    if (totals.shippingCost > 0) {
        message += `تكلفة التوصيل: ${totals.shippingCost.toFixed(2)} ر.س\n`;
    }
    message += `*الإجمالي النهائي: ${totals.finalTotal.toFixed(2)} ر.س*\n`;
    message += `${address}`;

    // رقم واتساب المطعم (يجب استبدال هذا الرقم)
    const restaurantNumber = '966500000000'; 
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${restaurantNumber}?text=${encodedMessage}`;
}

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const itemDiv = e.target.closest('.menu-item');
        const itemName = itemDiv.querySelector('[data-name]').getAttribute('data-name');
        const itemPrice = parseFloat(itemDiv.querySelector('[data-price]').getAttribute('data-price'));
        
        const existingItemIndex = cart.findIndex(item => item.name === itemName);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
        
        updateCartCount();
        alert(`${itemName} تم إضافته للسلة!`);
    });
});

openCartBtn.addEventListener('click', () => {
    updateCartModal();
    checkoutModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
});

sendOrderBtn.addEventListener('click', (e) => {
    if (cart.length === 0) {
        alert('لا يمكن إرسال طلب وسلتك فارغة!');
        e.preventDefault();
        return;
    }
    sendOrderBtn.href = generateWhatsAppLink();
});

shippingOptions.addEventListener('change', () => {
    calculateTotal();
});

// Show/Hide address input based on shipping type
shippingOptions.addEventListener('change', () => {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked').value;
    if (selectedShipping === 'delivery') {
        deliveryAddressInput.style.display = 'block';
    } else {
        deliveryAddressInput.style.display = 'none';
    }
    calculateTotal();
});

// Initial state of address input
document.addEventListener('DOMContentLoaded', () => {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    if (selectedShipping && selectedShipping.value === 'pickup') {
        deliveryAddressInput.style.display = 'none';
    }
});
