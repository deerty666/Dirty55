const menuItems=[
    {id:'D01',name:'دجاج شواية كامل',price:35.00},
    {id:'M01',name:'لحم مندي',price:90.00},
    {id:'S01',name:'مشويات مشكلة',price:60.00}
];

let cartItems=[];

function getItemDetails(id){ return menuItems.find(i=>i.id===id); }

function updateCartUI(){
    const cartDetails=document.getElementById('cart-details');
    if(cartItems.length===0){ cartDetails.innerHTML='<p>السلة فارغة.</p>'; return; }
    let html='<ul>'; let subtotal=0;
    cartItems.forEach(item=>{
        const details=getItemDetails(item.id);
        const total=details.price*item.quantity;
        subtotal+=total;
        html+=`<li>${details.name} x ${item.quantity} (${total.toFixed(2)} ر.س)</li>`;
    });
    html+=`</ul><p><strong>المجموع الفرعي:</strong> ${subtotal.toFixed(2)} ر.س</p>`;
    cartDetails.innerHTML=html;
}

function addToCart(id,name,price){
    const existing=cartItems.find(i=>i.id===id);
    if(existing){ existing.quantity+=1; } else { cartItems.push({id,price,quantity:1}); }
    alert(`تم إضافة ${name} إلى السلة!`);
    updateCartUI();
}

// إرسال الواتساب
document.getElementById('sendOrderBtn').addEventListener('click',()=>{
    if(cartItems.length===0){ alert('السلة فارغة'); return; }
    const name=document.getElementById('customerName').value.trim();
    const phone=document.getElementById('customerPhone').value.trim();
    if(!name || !phone){ alert('الرجاء إدخال الاسم ورقم الجوال'); return; }
    let subtotal=0,orderList='';
    const deliveryFee=5.00;
    cartItems.forEach(item=>{
        const details=getItemDetails(item.id);
        const total=details.price*item.quantity;
        subtotal+=total;
        orderList+=`* ${details.name} (×${item.quantity}) - ${total.toFixed(2)} ر.س%0A`;
    });
    const total=subtotal+deliveryFee;
    const phoneNumber='966536803598';
    const finalMessage=`✅ *مطعم سحايب ديرتي: طلب جديد!*%0A%0A`+
                       `*الاسم:* ${name}%0A`+
                       `*الجوال:* ${phone}%0A`+
                       `%0A--- قائمة الطلبات ---%0A${orderList}`+
                       `%0A---%0A*المجموع الفرعي:* ${subtotal.toFixed(2)} ر.س%0A`+
                       `*رسوم التوصيل:* ${deliveryFee.toFixed(2)} ر.س%0A`+
                       `*الإجمالي النهائي:* ${total.toFixed(2)} ر.س%0A`+
                       `*طريقة الاستلام:* توصيل 🚚%0A*طريقة الدفع:* نقداً / شبكة عند التوصيل`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`,'_blank');
});

// PWA
let deferredPrompt;
const installButton=document.getElementById('installButton');
const installPromoLink=document.getElementById('installPromoLink');

const promptHandler=()=>{ 
    if(deferredPrompt){ deferredPrompt.prompt(); }
    else{ alert('لتثبيت المنيو، استخدم خيار "الإضافة إلى الشاشة الرئيسية" من المتصفح.'); }
};

if(installButton) installButton.addEventListener('click',promptHandler);
if(installPromoLink) installPromoLink.addEventListener('click',promptHandler);

window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferredPrompt=e;
    if(installButton) installButton.style.display='block';
    if(installPromoLink) installPromoLink.style.display='block';
});

window.onload=updateCartUI;

// Service Worker
if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{ navigator.serviceWorker.register('sw.js')
        .then(reg=>console.log('SW registered',reg))
        .catch(err=>console.log('SW failed',err)); });
}
