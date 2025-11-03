let cartItems = [];

function updateChickenOption(sel){
    let riceSelect = sel.parentElement.querySelector('.rice-select');
    if(sel.value==='full'){ 
        riceSelect.style.display='inline'; 
    } else { 
        riceSelect.style.display='none'; 
        riceSelect.selectedIndex=0; 
    }
}

function updateRicePrice(sel, basePrice){
    let priceSpan = sel.parentElement.querySelector('.price');
    let extra = parseInt(sel.value);
    priceSpan.textContent = (basePrice + extra) + ' ريال';
}

function addToCartChicken(name, basePrice, btn){
    let parent = btn.parentElement;
    let option = parent.querySelector('select');
    let riceSelect = parent.querySelector('.rice-select');
    let price = basePrice;
    if(option.value==='full' && riceSelect){
        price += parseInt(riceSelect.value);
        name += ' (حبه كاملة, ' + riceSelect.options[riceSelect.selectedIndex].text + ')';
    } else { name += ' (نص)'; }
    cartItems.push({name, price});
    alert(name + " تم إضافته للسلة");
}

function addToCart(name, price){
    cartItems.push({name, price});
    alert(name + " تم إضافته للسلة");
}

function openCart(){
    let cartDiv = document.getElementById('cartModal');
    let itemsDiv = document.getElementById('cartItems');
    itemsDiv.innerHTML = '';
    cartItems.forEach((item,i)=>{
        let div = document.createElement('div');
        div.className='cart-item';
        div.innerHTML=`<span>${item.name}</span><span>${item.price} ريال</span><button onclick="removeCartItem(${i})">حذف</button>`;
        itemsDiv.appendChild(div);
    });
    cartDiv.style.display='flex';
}
function closeCart(){ document.getElementById('cartModal').style.display='none'; }
function removeCartItem(index){ cartItems.splice(index,1); openCart(); }

function sendOrder(){
    if(cartItems.length===0){ alert('السلة فارغة'); return; }
    let delivery = document.getElementById('deliveryOption').value;
    let total=0;
    let msg="طلب من مطاعم ومطابخ سحايب ديرتي:%0A";
    cartItems.forEach(item=>{
        msg += `- ${item.name} : ${item.price} ريال%0A`; 
        total += item.price;
    });
    if(delivery==='delivery'){ total +=5; msg += `توصيل: 5 ريال%0A`; }
    msg += `المجموع الكلي: ${total} ريال`;
    window.open(`https://wa.me/0536803598?text=${msg}`);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker Registered'))
    .catch(err => console.log('SW registration failed:', err));
}
