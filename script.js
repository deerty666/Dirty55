const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');
const sendOrderBtn = document.getElementById('send-order-btn');
let cart = [];

// 1. وظيفة تغيير الكمية (زيادة أو نقصان)
function changeQuantity(itemName, change) {
    const item = cart.find(i => i.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            // إذا أصبحت الكمية صفر أو أقل، احذف الصنف
            removeItem(itemName);
        }
    }
    renderCart();
}

// 2. وظيفة حذف الصنف بالكامل
function removeItem(itemName) {
    cart = cart.filter(i => i.name !== itemName);
    renderCart();
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let orderMessage = 'مرحباً، أود طلب الأطباق التالية:\n\n';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #999;">السلة فارغة حالياً</p>';
        sendOrderBtn.style.display = 'none';
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            // تصميم بسيط مدمج لـ items السلة
            itemElement.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee;';

            // الهيكل الجديد الذي يضيف أزرار التحكم
            itemElement.innerHTML = `
                <div style="flex-grow: 1;">
                    <strong>${item.name}</strong>
                    <div style="font-size: 0.9em; color: #666;">${(item.price * item.quantity).toFixed(2)} ريال</div>
                </div>
                <div style="display: flex; align-items: center;">
                    <button onclick="changeQuantity('${item.name}', -1)" style="padding: 5px 10px; margin: 0 5px; background-color: #f44336; color: white; border: none; border-radius: 3px; cursor: pointer;">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', 1)" style="padding: 5px 10px; margin: 0 5px; background-color: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer;">+</button>
                    <button onclick="removeItem('${item.name}')" style="padding: 5px 8px; margin-right: 5px; background-color: #ccc; color: #333; border: none; border-radius: 3px; cursor: pointer; font-weight: bold;">X</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);

            total += item.price * item.quantity;
            orderMessage += `${index + 1}. ${item.name} - الكمية: ${item.quantity} - الإجمالي: ${item.price * item.quantity} ريال\n`;
        });

        orderMessage += `\nالإجمالي الكلي: ${total.toFixed(2)} ريال.`;

        cartTotalDisplay.textContent = total.toFixed(2);
        sendOrderBtn.style.display = 'block';

        // تجهيز رابط الواتساب (غيّر هذا الرقم إلى رقم مطعمك)
        const phoneNumber = '966500000000'; 
        const encodedMessage = encodeURIComponent(orderMessage);
        sendOrderBtn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }
}

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

    renderCart();
}

// ربط أزرار الإضافة بـ JavaScript
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', addToCart);
});

// تشغيل السلة لأول مرة عند تحميل الصفحة
renderCart();
