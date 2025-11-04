const whatsappNumber = "0536803598";
let cartItems = [];

function addToCart(name, price) {
    cartItems.push({name, price});
    alert(name + " تم إضافته للسلة");
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    if(cartItems.length === 0){
        cartItemsDiv.innerHTML = '<p>السلة فارغة</p>';
    } else {
        cartItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.innerHTML = `<span>${item.name}</span><span>${item.price} ريال</span><button onclick="removeItem(${index})">x</button>`;
            cartItemsDiv.appendChild(div);
        });
    }

    cartModal.style.display = 'flex';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function removeItem(index) {
    cartItems.splice(index, 1);
    openCart();
}

function sendOrder() {
    if(cartItems.length === 0){ alert("السلة فارغة"); return; }

    const deliveryOption = document.getElementById('deliveryOption').value;
    let total = 0;
    let message = "طلب من مطاعم ومطابخ سحايب ديرتي:%0A";

    cartItems.forEach(item => {
        message += `${item.name} - ${item.price} ريال%0A`;
        total += item.price;
    });

    if(deliveryOption === 'delivery'){
        total += 5;
        message += `توصيل: 5 ريال%0A`;
    } else {
        message += `استلام: مجانًا%0A`;
    }
    message += `الإجمالي: ${total} ريال`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    cartItems = [];
    closeCart();
}
