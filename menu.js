const whatsappNumber = "0536803598";
let cart = {}; // تم تغيير الهيكل من مصفوفة إلى كائن لإدارة الكميات

// دالة تحديث عداد السلة المرئي
function updateCartDisplay() {
    const counter = document.getElementById('cart-counter');
    let totalItems = 0;
    // حساب مجموع الكميات في السلة
    for (const itemId in cart) {
        totalItems += cart[itemId].quantity;
    }

    counter.textContent = totalItems;
    // إظهار العداد فقط إذا كان هناك عناصر
    counter.style.display = totalItems > 0 ? 'block' : 'none';
}

// دالة الإضافة إلى السلة (تستخدم الآن ID و Name و Price)
// عند تطبيقها على صفحات القوائم الداخلية (دجاج.html)، تأكد من تمرير ID فريد لكل وجبة.
function addToCart(id, name, price) {
    if (cart[id]) {
        // إذا كان العنصر موجوداً، زد الكمية
        cart[id].quantity += 1;
    } else {
        // إذا كان العنصر جديداً، أضفه بالكمية 1
        cart[id] = { name: name, price: price, quantity: 1 };
    }
    alert(name + " تم إضافته للسلة. الكمية: " + cart[id].quantity);
    updateCartDisplay();
}

// دالة تغيير الكمية (زيادة أو نقصان)
function changeQuantity(id, change) {
    if (!cart[id]) return;

    cart[id].quantity += change;

    if (cart[id].quantity <= 0) {
        // إذا أصبحت الكمية 0 أو أقل، احذف العنصر من السلة
        delete cart[id];
    }
    
    // أعد فتح السلة وتحديث العرض
    openCart();
    updateCartDisplay();
}

// دالة حساب الإجمالي
function calculateTotals() {
    let subTotal = 0;
    for (const itemId in cart) {
        subTotal += cart[itemId].price * cart[itemId].quantity;
    }
    
    const deliveryOption = document.getElementById('deliveryOption').value;
    const deliveryCost = (deliveryOption === 'delivery') ? 5 : 0;
    const finalTotal = subTotal + deliveryCost;

    document.getElementById('subTotal').textContent = subTotal;
    document.getElementById('deliveryCost').textContent = deliveryCost;
    document.getElementById('finalTotal').textContent = finalTotal;
    
    return { subTotal, deliveryCost, finalTotal };
}

// دالة تحديث ملخص الإجمالي عند تغيير خيار التوصيل
function updateCartSummary() {
    calculateTotals();
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    
    const itemKeys = Object.keys(cart);

    if (itemKeys.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align: center; color: #555;">السلة فارغة. ابدأ بطلبك الشهي!</p>';
    } else {
        itemKeys.forEach(itemId => {
            const item = cart[itemId];
            const itemTotal = item.price * item.quantity;
            
            const div = document.createElement('div');
            div.innerHTML = `
                <span>${item.name} (${item.price} ريال/الواحدة)</span>
                <div class="quantity-controls">
                    <button onclick="changeQuantity('${itemId}', 1)">+</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${itemId}', -1)">-</button>
                </div>
                <span>${itemTotal} ريال</span>
            `;
            cartItemsDiv.appendChild(div);
        });
    }

    calculateTotals();
    cartModal.style.display = 'flex';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function sendOrder() {
    const itemKeys = Object.keys(cart);
    if (itemKeys.length === 0) { 
        alert("السلة فارغة"); 
        return; 
    }

    const totals = calculateTotals();
    const deliveryOption = document.getElementById('deliveryOption').value;
    const deliveryText = (deliveryOption === 'delivery') ? `توصيل: ${totals.deliveryCost} ريال` : `استلام: مجانًا`;

    let message = "طلب من مطاعم ومطابخ سحايب ديرتي:%0A";

    // قائمة الوجبات
    itemKeys.forEach(itemId => {
        const item = cart[itemId];
        message += `${item.quantity} x ${item.name} (${item.price} ريال) - الإجمالي: ${item.price * item.quantity} ريال%0A`;
    });

    // ملخص الطلب
    message += `---%0A`;
    message += `الإجمالي الفرعي: ${totals.subTotal} ريال%0A`;
    message += `${deliveryText}%0A`;
    message += `الإجمالي الكلي: ${totals.finalTotal} ريال%0A`;
    message += `---%0A`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    cart = {}; // تفريغ السلة بعد الإرسال
    closeCart();
    updateCartDisplay();
}

// التأكد من تحديث العداد عند تحميل الصفحة
window.onload = updateCartDisplay;
