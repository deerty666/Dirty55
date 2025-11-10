/* ====== بيانات المنيو - تم إضافة قسم "الكل" في البداية ====== */
const menuData = [
  // 1. القسم الجديد: الكل
  { 
    section:"الكل", 
    sectionImg: "/Dirty55/logo-bg.png", // استخدام صورة الشعار
    items:[] // تركها فارغة، سيتم تجميع العناصر برمجياً
  },
  { 
    section:"الشوايه", 
    sectionImg: "/Dirty55/sh.jpg",
    items:[
      {id:"sh1", img:"/Dirty55/sh.jpg", name:"شواية", basePrice:46, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:4},
      {name:"رز مندي", price:4},
      {name:"رز مثلوثه", price:4}
    ]},
    {id:"sh2", img:"/Dirty55/sh.jpg", name:"نص شواية", basePrice:24, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:1},
      {name:"رز مندي", price:1},
      {name:"رز مثلوثه", price:1}
    ]}
  ]},
  { 
    section:"المظبي", 
    sectionImg: "/Dirty55/md.jpg",
    items:[
      {id:"md1", img:"/Dirty55/md.jpg", name:"مظبي", basePrice:46, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:4},
      {name:"رز مندي", price:4},
      {name:"رز مثلوثه", price:4}
    ]},
    {id:"md2", img:"/Dirty55/md.jpg", name:"نص مظبي", basePrice:24, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:1},
      {name:"رز مندي", price:1},
      {name:"رز مثلوثه", price:1}
    ]}
  ]},
  { 
    section:"مندي", 
    sectionImg: "/Dirty55/mn.jpg",
    items:[
      {id:"mn1", img:"/Dirty55/mn.jpg", name:"مندي", basePrice:46, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:4},
      {name:"رز مندي", price:4},
      {name:"رز مثلوثه", price:4}
    ]},
    {id:"mn2", img:"/Dirty55/mn.jpg", name:"نص مندي", basePrice:24, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:1},
      {name:"رز مندي", price:1},
      {name:"رز مثلوثه", price:1}
    ]}
  ]},
  { 
    section:"مدفون", 
    sectionImg: "/Dirty55/mdf.jpg",
    items:[
      {id:"mdf1", img:"/Dirty55/mdf.jpg", name:"مدفون حبه كامل", basePrice:46, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:4},
      {name:"رز مندي", price:4},
      {name:"رز مثلوثه", price:4}
    ]},
    {id:"mdf2", img:"/Dirty55/mdf.jpg", name:"نص مدفون", basePrice:24, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:1},
      {name:"رز مندي", price:1},
      {name:"رز مثلوثه", price:1}
    ]}
  ]},
  { 
    section:"مقلوبه", 
    sectionImg: "/Dirty55/mq.jpg",
    items:[
      {id:"mq1", img:"/Dirty55/mq.jpg", name:"دجاج مقلوبه حبه", basePrice:50, options:[{name:"رز شعبي", price:0}]},
      {id:"mq2", img:"/Dirty55/mq.jpg", name:"نص دجاج مقلوبه", basePrice:25, options:[{name:"رز شعبي", price:0}]}
  ]},
  { 
    section:"مضغوط", 
    sectionImg: "/Dirty55/mg.jpg",
    items:[
      {id:"mg1", img:"/Dirty55/mg.jpg", name:"دجاج مضغوط حبه", basePrice:50, options:[{name:"رز مضغوط", price:0}]},
      {id:"mg2", img:"/Dirty55/mg.jpg", name:"نص حبه مضغوط", basePrice:25, options:[{name:"رز مضغوط", price:0}]}
  ]},
  { 
    section:"زربيان", 
    sectionImg: "/Dirty55/zb.jpg",
    items:[
      {id:"zb1", img:"/Dirty55/zb.jpg", name:"دجاج زربيان حبه", basePrice:50, options:[{name:"رز زربيان", price:0}]},
      {id:"zb2", img:"/Dirty55/zb.jpg", name:"نص حبه زربيان", basePrice:25, options:[{name:"رز زربيان", price:0}]}
  ]},
  { 
    section:"قسم اللحوم", 
    sectionImg: "/Dirty55/t1.jpg",
    items:[
    {id:"t1", img:"/Dirty55/t1.jpg", name:"تيس مندي كامل", basePrice:1550, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:50},
      {name:"رز مندي", price:50}
    ]},
    {id:"t2", img:"/Dirty55/t.jpg", name:"نص تيس مندي", basePrice:750, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:25},
      {name:"رز مندي", price:25}
    ]},
    {id:"t3", img:"/Dirty55/t.jpg", name:"ربع تيس مندي", basePrice:375, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:13},
      {name:"رز مندي", price:13}
    ]},
    {id:"t4", img:"/Dirty55/t.jpg", name:"نفر لحم مندي", basePrice:85, options:[
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:5},
      {name:"رز مندي", price:5}
    ]},
    {
      id:"t5", 
      img:"/Dirty55/t1.jpg", 
      name:"نفر حاشي مكموت", 
      basePrice:50, 
      options: [
        { name: "رز شعبي", price: 0 },
        { name: "رز بشاور", price: 63 }, 
        { name: "رز مندي", price: 63 }
      ]
    },
    {
      id:"t6",
      img:"/Dirty55/t2.jpg", 
      name:"نفر برمه لحم هرفي مع المرق",
      basePrice:68,
      options:[
        { name: "رز شعبي", price: 0 },
        { name: "رز بشاور", price: 0 },
        { name: "رز مندي", price: 0 }
      ]
    }
  ]},
  /* ====== قسم المشويات تم نقله هنا ====== */
  { 
    section:"المشويات", 
    sectionImg: "/Dirty55/gr1.jpg",
    items:[
    {
      id:"gr1",
      img:"/Dirty55/gr2.jpg",
      name:"كباب لحم",
      basePrice:38,
      options:[
        {name:"نفر", price:0},
        {name:"نص كيلو", price:38},
        {name:"كيلو", price:112}
      ]
    },
    {
      id:"gr2",
      img:"/Dirty55/gr3.jpg",
      name:"كباب دجاج",
      basePrice:30,
      options:[
        {name:"نفر", price:0},
        {name:"نص كيلو", price:30},
        {name:"كيلو", price:90}
      ]
    },
    {
      id:"gr3",
      img:"/Dirty55/gr4.jpg",
      name:"اوصال لحم",
      basePrice:45,
      options:[
        {name:"نفر", price:0},
        {name:"نص كيلو", price:45},
        {name:"كيلو", price:135}
      ]
    },
    {
      id:"gr4",
      img:"/Dirty55/gr5.jpg",
      name:"شيش طاووق",
      basePrice:30,
      options:[
        {name:"نفر", price:0},
        {name:"نص كيلو", price:30},
        {name:"كيلو", price:90}
      ]
    },
    {
      id:"gr5",
      img:"/Dirty55/gr1.jpg",
      name:"مشكل مشاوي",
      basePrice:35,
      options:[
        {name:"نفر", price:0},
        {name:"نص كيلو", price:35},
        {name:"كيلو", price:95}
      ]
    }
  ]},
  /* ======================================= */
  { 
    section:"الأطباق الجانبية", 
    sectionImg: "/Dirty55/g.jpg",
    items:[
    {id:"side1", img:"/Dirty55/g1.jpg", name:"جريش", basePrice:0, options:[{name:"صغير", price:5}, {name:"كبير", price:10}]},
    {id:"side3", img:"/Dirty55/g2.jpg", name:"قرصان", basePrice:0, options:[{name:"صغير", price:5}, {name:"كبير", price:10}]},
    
    {id:"side5", img:"/Dirty55/add3.jpg", name:"طحينه", basePrice:3, options:[{name:"علبه", price:0}]},
    {id:"side6", img:"/Dirty55/add4.jpg", name:"سلطه حار", basePrice:3, options:[{name:"علبه", price:0}]},
    {id:"side7", img:"/Dirty55/add5.jpg", name:"نفر رز شعبي", basePrice:10, options:[{name:"نفر", price:0}]},
    {id:"side8", img:"/Dirty55/add5.jpg", name:"نفر رز بشاور", basePrice:10, options:[{name:"نفر", price:0}]},
    {id:"side9", img:"/Dirty55/add6.jpg", name:"نفر رز مندي", basePrice:10, options:[{name:"نفر", price:0}]}
  ]},
  
  { 
    section:"المشروبات", 
    sectionImg: "/Dirty55/bev.jpg",
    items:[
    {id:"bev-p", img:"/Dirty55/bev.jpg", name:"ببسي", basePrice:0, options:[
      {name:"صغير", price:3},
      {name:"وسط", price:6},
      {name:"كبير", price:9}
    ]},
    {id:"bev-h", img:"/Dirty55/bev.jpg", name:"حمضيات", basePrice:0, options:[
      {name:"صغير", price:3},
      {name:"وسط", price:6},
      {name:"كبير", price:9}
    ]},
    {id:"bev-s", img:"/Dirty55/bev.jpg", name:"سفن اب", basePrice:0, options:[
      {name:"صغير", price:3},
      {name:"وسط", price:6},
      {name:"كبير", price:9}
    ]},
    {id:"bev-m", img:"/Dirty55/bev1.jpg", name:"لبن المراعي", basePrice:0, options:[
      {name:"صغير", price:2},
      {name:"وسط", price:6},
      {name:"كبير", price:11}
    ]},
    {id:"bev-q", img:"/Dirty55/bev2.jpg", name:"لبن القريه", basePrice:3, options:[{name:"عبوة", price:0}]}
  ]},

  { 
    section:"الايدامات", 
    sectionImg: "/Dirty55/eid.jpg",
    items:[
      {id:"eid1", img:"/Dirty55/eid1.jpg", name:"ملوخيه", basePrice:10, options:[{name:"صحن", price:0}]},
      {id:"eid2", img:"/Dirty55/eid2.jpg", name:"باميه", basePrice:10, options:[{name:"صحن", price:0}]},
      {id:"eid3", img:"/Dirty55/eid3.jpg", name:"مشكل خضار", basePrice:10, options:[{name:"صحن", price:0}]},
      {id:"eid4", img:"/Dirty55/eid4.jpg", name:"مشكل فران", basePrice:10, options:[{name:"صحن", price:0}]},
      {id:"eid5", img:"/Dirty55/eid5.jpg", name:"مسقع", basePrice:12, options:[{name:"صحن", price:0}]}
  ]},

  { 
    section:"المقبلات", 
    sectionImg: "/Dirty55/m.jpg",
    items:[
      {id:"app-khdar", img:"/Dirty55/m1.jpg", name:"سلطه خضار", basePrice:0, options:[
      {name:"صغير", price:7},
      {name:"وسط", price:13}
    ]},
    {id:"app-laban", img:"/Dirty55/m2.jpg", name:"خيار ولبن", basePrice:0, options:[
      {name:"صغير", price:7},
      {name:"وسط", price:10}
    ]},
    {id:"app-homos", img:"/Dirty55/m3.jpg", name:"حمص", basePrice:0, options:[
      {name:"صغير", price:7},
      {name:"وسط", price:13}
    ]},
    {id:"app-mtbl", img:"/Dirty55/m4.jpg", name:"متبل", basePrice:0, options:[
      {name:"صغير", price:7},
      {name:"وسط", price:13}
    ]},
    {id:"app-tbole", img:"/Dirty55/m5.jpg", name:"تبوله", basePrice:0, options:[
      {name:"صغير", price:7},
      {name:"وسط", price:13}
    ]},
    {id:"app-rose", img:"/Dirty55/m7.jpg", name:"سلطه روسيه", basePrice:0, options:[
      {name:"صغير", price:7},
      {name:"وسط", price:13}
    ]},
    {id:"app-amr", img:"/Dirty55/m8.jpg", name:"سلطه امريكيه", basePrice:0, options:[
      {name:"صغير", price:7},
      {name:"وسط", price:13}
    ]},
    {id:"app-mshkl", img:"/Dirty55/m9.jpg", name:"مشكل مقبلات", basePrice:13, options:[{name:"طبق", price:0}]}
  ]},
  { 
    section:"الكنافه", 
    sectionImg: "/Dirty55/kna.jpg",
    items:[
      {id:"kna1", img:"/Dirty55/kna1.jpg", name:"كنافه قشطه", basePrice:10, options:[{name:"", price:0}]},
      {id:"kna2", img:"/Dirty55/kna2.jpg", name:"كنافه جلاكسي", basePrice:12, options:[{name:"", price:0}]},
      {id:"kna3", img:"/Dirty55/kna3.jpg", name:"كنافه نوتيلا", basePrice:12, options:[{name:"", price:0}]}
  ]}
];

/* ====== متغيرات PWA و SearchBar ====== */
let deferredPrompt = null;
let currentSection = menuData[0].section; // سيبدأ الآن بـ "الكل"
const installAppBtn = document.getElementById('installAppBtn');
const searchBar = document.getElementById('searchBar');

/* ====== سلة الطلبات والعناصر ====== */
let cart = JSON.parse(localStorage.getItem('deerty_cart') || '[]');
const sectionsEl = document.getElementById('sections');
const menuList = document.getElementById('menuList');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalBottom = document.getElementById('cartTotalBottom');
const sendWhatsapp = document.getElementById('sendWhatsapp');
const clearCart = document.getElementById('clearCart');

/* Option modal */
const optionModal = document.getElementById('optionModal');
const modalTitle = document.getElementById('modalTitle');
const modalOptions = document.getElementById('modalOptions');
const modalConfirm = document.getElementById('modalConfirm');
let selectedItem = null;
let selectedOption = null;

/* ====== Render sections - لعرض البطاقات المصورة ====== */
function renderSections(){
  sectionsEl.innerHTML = '';
  menuData.forEach((sec,idx)=>{
    const card = document.createElement('div');
    card.className = 'sec-card';
    card.innerHTML = `
      <img src="${sec.sectionImg}" alt="${sec.section}" onerror="this.style.opacity=.35">
      <div class="sec-name">${sec.section}</div>
    `;

    if(sec.section === currentSection) card.classList.add('active'); 

    card.onclick=()=>{
      document.querySelectorAll('.sec-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentSection = sec.section;
      renderMenu(currentSection);
      searchBar.value = ''; 
    };
    sectionsEl.appendChild(card);
  });
  renderMenu(currentSection);
}

/* ====== Render menu - تم تعديلها لدعم قسم "الكل" ====== */
function renderMenu(sectionName, searchTerm = ''){
  menuList.innerHTML='';
  
  let itemsToRender = [];
  const normalizedSearch = searchTerm.trim().toLowerCase();
  
  if(sectionName === "الكل") {
    // تجميع كل الوجبات من جميع الأقسام وإضافة خاصية 'actualSection' (القسم الفعلي) لكل وجبة
    itemsToRender = menuData.flatMap(sec => 
      sec.section !== "الكل" ? 
      sec.items.map(item => ({...item, actualSection: sec.section})) : 
      []
    );
  } else {
    // البحث عن القسم المحدد
    const sec = menuData.find(s=>s.section===sectionName);
    if(!sec) return;
    itemsToRender = sec.items;
  }
  
  // تطبيق التصفية
  const filteredItems = itemsToRender.filter(item => {
    // ملاحظة: يتم استخدام خاصية 'name' فقط للبحث لتبسيط العملية
    return item.name.toLowerCase().includes(normalizedSearch);
  });

  if(filteredItems.length === 0 && normalizedSearch.length > 0) {
      menuList.innerHTML = `<p style="text-align:center; padding: 20px;">لا توجد نتائج بحث في قسم "${sectionName}"</p>`;
      return;
  }

  filteredItems.forEach(item=>{
    const priceDisplay = item.basePrice > 0 ? `${item.basePrice} ريال` : 
                         (item.options.length > 0 && item.options[0].price > 0 ? `ابتداءً من ${item.options[0].price} ريال` : `${item.options[0].price} ريال`);
    
    // استخدام القسم الفعلي إذا كان موجودًا (في حال عرض الكل)، وإلا استخدم اسم القسم الحالي
    const displayedSection = item.actualSection || sectionName; 

    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`
      <img src="${item.img}" alt="${item.name}" onerror="this.style.opacity=.35">
      <h3>${item.name}</h3>
      <p>${displayedSection}</p>
      <div class="price">${priceDisplay}</div>
      <button class="add-btn">أضف للسلة</button>
    `;
    card.querySelector('button').onclick = function() {
      // إزالة الخاصية المؤقتة 'actualSection' قبل الإضافة للسلة لتجنب المشاكل في منطق Cart Key
      const itemForCart = {...item};
      delete itemForCart.actualSection;
      
      const needsOptions = item.options.length > 1 || (item.options.length === 1 && item.options[0].name !== "");

      if(needsOptions){
        showOptions(itemForCart); // استخدم النسخة النظيفة
      } else {
        addToCart({...itemForCart, qty:1, selectedOption:itemForCart.options[0] || null});
        const btn = this;
        const originalText = btn.innerText;
        btn.innerText = "تمت الإضافة! ✅";
        btn.style.backgroundColor = '#4CAF50'; 
        btn.disabled = true; 
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = 'var(--gold)';
          btn.disabled = false;
        }, 1200); 
      }
    };
    menuList.appendChild(card);
  });
}

/* ====== Show options modal ====== */
function showOptions(item){
  selectedItem = item;
  selectedOption = item.options[0]; 
  modalTitle.innerText = item.name;
  modalOptions.innerHTML='';
  item.options.forEach(opt=>{
    const b=document.createElement('button');
    b.className='opt-btn';
    if(opt === selectedOption) b.style.backgroundColor = '#a07c4c'; 
    b.innerText = opt.name + (opt.price>0?` +${opt.price} ريال`:'');
    b.onclick = ()=>{
        selectedOption=opt;
        document.querySelectorAll('#modalOptions .opt-btn').forEach(btn => btn.style.backgroundColor = 'var(--gold)');
        b.style.backgroundColor = '#a07c4c';
    };
    modalOptions.appendChild(b);
  });
  optionModal.style.display='flex';
}

/* ====== Confirm modal ====== */
optionModal.addEventListener('click', (e) => {
    if (e.target.id === 'optionModal') {
        optionModal.style.display = 'none';
    }
});

modalConfirm.onclick = ()=>{
  if(selectedItem && selectedOption){
    addToCart({...selectedItem, qty:1, selectedOption:selectedOption});
    const originalText = modalConfirm.innerText;
    modalConfirm.innerText = "تمت الإضافة! ✅";
    modalConfirm.style.backgroundColor = '#4CAF50';
    modalConfirm.disabled = true;

    setTimeout(() => {
      modalConfirm.innerText = originalText;
      modalConfirm.style.backgroundColor = 'var(--gold)'; 
      modalConfirm.disabled = false;
      optionModal.style.display='none';
    }, 1200);
  } else {
    optionModal.style.display='none';
  }
};

/* ====== Cart functions ====== */
function saveCart(){ 
    localStorage.setItem('deerty_cart',JSON.stringify(cart)); 
    renderCart(); 
}

// دالة تشغيل تأثير الوميض
function flashCartButton() {
    cartBtn.classList.add('flash-cart-btn');
    // إزالة الكلاس بعد نهاية مدة الحركة (0.4 ثانية)
    setTimeout(() => {
        cartBtn.classList.remove('flash-cart-btn');
    }, 400); 
}

function addToCart(item){
  const obj={...item};
  // التأكد من أن مفتاح السلة يعتمد فقط على ID والـ Option
  const key = obj.id + (obj.selectedOption?`-${obj.selectedOption.name}`:'');
  const found = cart.find(i=>i.key===key);
  if(found) found.qty+=1;
  else cart.push({...obj,key});
  saveCart();
  // تشغيل تأثير الوميض بعد إضافة المنتج للسلة
  flashCartButton();
}

function renderCart(){
  cartItemsEl.innerHTML='';
  let total=0,count=0;
  cart.forEach((it,idx)=>{
    const price = (it.basePrice || 0) + (it.selectedOption?it.selectedOption.price:0);
    
    const row=document.createElement('div');
    row.className='cart-row';
    row.innerHTML=`
      <div>
        <div style="font-weight:800">${it.name}${it.selectedOption && it.selectedOption.name !== 'نفر' && it.selectedOption.name !== 'طبق' && it.selectedOption.name !== 'عبوة'?' — '+it.selectedOption.name:''}</div>
        <div style="font-size:0.9rem;color:rgba(0,0,0,0.6)">${it.qty} × ${price} ريال</div>
      </div>
      <div class="controls">
        <button onclick="updateQty(${idx},-1)">-</button>
        <div style="min-width:26px;text-align:center">${it.qty}</div>
        <button onclick="updateQty(${idx},1)">+</button>
        <button onclick="removeItem(${idx})" style="margin-left:6px;background:var(--red);color:#fff;padding:6px;border-radius:6px;border:none;cursor:pointer">حذف</button>
      </div>
    `;
    cartItemsEl.appendChild(row);
    total += price*it.qty;
    count += it.qty;
  });

  const deliveryType = document.querySelector('input[name="deliveryType"]:checked')?.value;
  if(deliveryType==='delivery') total+=5;

  cartTotalBottom.innerText=total+' ريال';
  cartCount.innerText=count;
  cartCount.style.display=count===0?'none':'inline-block';
  localStorage.setItem('deerty_cart',JSON.stringify(cart));
}

function updateQty(idx,change){ 
  if(!cart[idx]) return; 
  cart[idx].qty+=change; 
  if(cart[idx].qty<1) cart.splice(idx,1); 
  saveCart(); 
}

function removeItem(idx){ 
  cart.splice(idx,1); 
  saveCart(); 
}

clearCart.onclick = ()=>{
  cart = [];
  saveCart();
}

document.querySelectorAll('input[name="deliveryType"]').forEach(radio => {
    radio.addEventListener('change', renderCart);
});


/* ====== Cart UI and WhatsApp (تم تعديل هذه الدوال لحل مشكلة التداخل) ====== */

// دالة موحدة لإغلاق السلة وإظهار الزر العائم
const closeCart = () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('show');
    cartDrawer.setAttribute('aria-hidden','true');
    // إظهار زر السلة العائم بعد إغلاق الدرج
    cartBtn.style.display = 'block'; 
};

cartBtn.addEventListener('click',()=>{
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('show');
  cartDrawer.setAttribute('aria-hidden','false');
  renderCart();
  // إخفاء زر السلة العائم عند فتح الدرج
  cartBtn.style.display = 'none'; 
});

cartOverlay.addEventListener('click', closeCart);
closeCartBtn.addEventListener('click', closeCart);


sendWhatsapp.addEventListener('click', () => {
  if(cart.length===0){ alert('السلة فارغة'); return; }
  const deliveryType = document.querySelector('input[name="deliveryType"]:checked')?.value;
  const lines=['طلب جديد من مطاعم سحايب ديرتي:'];
  let total=0;
  cart.forEach(it=>{
    const price=(it.basePrice || 0)+(it.selectedOption?it.selectedOption.price:0);
    const optionText = it.selectedOption && it.selectedOption.name !== 'نفر' && it.selectedOption.name !== 'طبق' && it.selectedOption.name !== 'عبوة' ? ` — ${it.selectedOption.name}` : '';
    lines.push(`${it.qty} × ${it.name}${optionText} — ${price*it.qty} ريال`);
    total+=price*it.qty;
  });
  lines.push('---');
  if(deliveryType==='delivery'){ 
    lines.push('نوع الطلب: توصيل'); 
    lines.push('رسوم التوصيل: 5 ريال'); 
    total+=5; 
  } else {
    lines.push('نوع الطلب: استلام من الفرع'); 
  }
  lines.push('---');
  lines.push(`الإجمالي النهائي: ${total} ريال`);
  
  const url=`https://wa.me/966536803598?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url,'_blank');

  // مسح السلة وإغلاق الدرج وإظهار زر السلة
  cart = [];
  saveCart(); 
  closeCart();
});

/* ====== PWA Install Logic ====== */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installAppBtn.style.display = 'block';
});

installAppBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    installAppBtn.style.display = 'none';
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
  }
});

/* ====== Search Logic ====== */
searchBar.addEventListener('input', (e) => {
    renderMenu(currentSection, e.target.value);
});


/* ====== Init ====== */
renderSections(); 
renderCart();

/* ====== تسجيل عامل الخدمة (PWA Registration) ====== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Dirty55/service-worker.js') .then(reg => {
        console.log('Service Worker Registered!', reg.scope);
      })
      .catch(err => {
        console.error('Service Worker Registration failed:', err);
      });
  });
}