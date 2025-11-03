let cartItems = [];

function addToCart(name, price){
    cartItems.push({name, price});
    alert(name + " تم إضافته للسلة");
}

function addToCartChicken(name, basePrice, btn){
    let itemDiv = btn.parentElement;
    let riceSelect = itemDiv.querySelector('.rice-select');
    let ricePrice = parseInt(riceSelect.value);
    cartItems.push({name: name, price: basePrice + ricePrice});
    alert(name + " تم إضافته للسلة");
}

function updateChickenOption(select){
    let itemDiv = select.parentElement;
    let riceSelect = itemDiv.querySelector('.rice-select');
    if(select.value === 'full'){
        riceSelect.style.display='inline-block';
    } else {
        riceSelect.style.display='none';
        riceSelect.value = '0';
    }
}

function openCart(){
    let cartDiv = document.getElementById('cartModal');
    let itemsDiv = document.getElementById('cartItems');
    itemsDiv.innerHTML = '';
    cartItems.forEach((item,i)=>{
        let div = document.createElement('div');
        div.className='cart-item';
        div.innerHTML = `<span>${item.name}</span> <span>${item.price} ريال</span> <button onclick="removeCartItem(${i})">حذف</button>`;
        itemsDiv.appendChild(div);
    });
    cartDiv.style.display='flex';
}

function closeCart(){ document.getElementById('cartModal').style.display='none'; }

function removeCartItem(index){
    cartItems.splice(index,1);
    openCart();
}

function sendOrder(){
    if(cartItems.length === 0){ 
        alert('السلة فارغة'); 
        return; 
    }

    let delivery = document.getElementById('deliveryOption').value;
    let total = 0;
    let msg = "طلب من مطاعم ومطابخ سحايب ديرتي:%0A";

    cartItems.forEach(item=>{
        msg += `- ${item.name}: ${item.price} ريال%0A`;
        total += item.price;
    });

    if(delivery === 'delivery'){ 
        total += 5; 
        msg += "توصيل: 5 ريال%0A"; 
    }

    msg += `المجموع الكلي: ${total} ريال`;

    let whatsappNumber = "0536803598";
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');

    cartItems = [];
    closeCart();
}
