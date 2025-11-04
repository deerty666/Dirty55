// ======= سلة الطلبات =======
let cartItems = [];

// إضافة صنف للسلة
function addToCart(name, price) {
    cartItems.push({name, price});
    alert(name + " تم إضافته للسلة");
}

// فتح نافذة السلة
function openCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    
    if(cartItems.length === 0){
        cartItemsDiv.innerHTML = '<p>السلة فارغة</p>';
    } else {
        cartItems.forEach((item, index) => {
            cartItemsDiv.innerHTML += `<div>${item.name} - ${item.price} ريال 
                <button onclick="removeItem(${index})" style="background:red;color:#fff;border:none;border-radius:5px;padding:2px 5px;margin-left:5px;">x</button>
            </div>`;
        });
    }

    cartModal.style.display = 'flex';
}

// إغلاق نافذة السلة
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'none';
}

// إزالة عنصر من السلة
function removeItem(index){
    cartItems.splice(index,1);
    openCart(); // تحديث العرض
}

// إرسال الطلب للواتس
function sendOrder() {
    if(cartItems.length === 0) { 
        alert("السلة فارغة"); 
        return; 
    }

    let deliveryOption = document.getElementById('deliveryOption').value;
    let total = 0;
    let message = "طلب من مطاعم ومطابخ سحايب ديرتي:%0A";

    cartItems.forEach(item => {
        message += `${item.name} - ${item.price} ريال%0A`;
        total += item.price;
    });

    if(deliveryOption === 'delivery'){
        total += 5; // إضافة ٥ ريال للتوصيل
        message += `توصيل +5 ريال%0A`;
    } else {
        message += `استلام مجاني%0A`;
    }

    message += `الإجمالي: ${total} ريال`;

    let whatsappNumber = "0536803598"; // رقم المطعم
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

    cartItems = []; // تفريغ السلة بعد الإرسال
    closeCart();
}
