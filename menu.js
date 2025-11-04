let cartItems = [];

function addToCart(name, price){
    cartItems.push({name, price});
    alert(name + " تم إضافته للسلة");
}

function openCart(){
    let cartModal = document.getElementById('cartModal');
    let cartDiv = document.getElementById('cartItems');
    cartDiv.innerHTML = '';
    let total = 0;
    cartItems.forEach((item, i)=>{
        cartDiv.innerHTML += `<div>${item.name} - ${item.price} ريال</div>`;
        total += item.price;
    });
    document.getElementById('cartItems').innerHTML += `<hr>المجموع: ${total} ريال`;
    cartModal.style.display = 'flex';
}

function closeCart(){
    document.getElementById('cartModal').style.display = 'none';
}

function sendOrder(){
    if(cartItems.length === 0){
        alert("السلة فارغة");
        return;
    }
    let deliveryOption = document.getElementById('deliveryOption').value;
    let deliveryCost = (deliveryOption === 'delivery') ? 5 : 0;
    let message = "طلب من مطاعم ومطابخ سحايب ديرتي:%0A";
    let total = 0;
    cartItems.forEach(item => {
        message += `${item.name} - ${item.price} ريال%0A`;
        total += item.price;
    });
    total += deliveryCost;
    message += `خدمة التوصيل: ${deliveryCost} ريال%0Aالمجموع النهائي: ${total} ريال`;
    let whatsappNumber = "0536803598";
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    cartItems = [];
    closeCart();
}
