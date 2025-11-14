/* ====== بيانات الفروع - يرجى تعديل أرقام الواتساب والأسماء حسب الرغبة ====== */
const BRANCH_CONFIG = {
    'branch1': { 
        whatsapp: '966536803598', // ⭐️ رقم واتساب فرع لبن الاحمدية
        name: 'لبن الاحمدية', // اسم الفرع في الرسائل وعنوان الصفحة
        deliveryFee: 5,
    },
    'branch2': {
        whatsapp: '9665XXXXXXXX2', // ⚠️ يرجى تغيير رقم الواتساب لفرع شمال الرياض
        name: 'شمال الرياض مخرج ٦', 
        deliveryFee: 5, 
    },
    'branch3': {
        whatsapp: '9665XXXXXXXX3', // ⚠️ يرجى تغيير رقم الواتساب لفرع الروضه
        name: 'الروضه خالد بن الوليد ', 
        deliveryFee: 5,
    }
};

/* ====== متغير لتحديد الفرع الحالي من الرابط ====== */
let currentBranchId = 'branch1'; // القيمة الافتراضية
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('branch')) {
    currentBranchId = urlParams.get('branch');
} else if (window.location.pathname.endsWith('menu.html')) {
    // 💡 إذا دخل المستخدم مباشرة إلى menu.html دون تحديد فرع، أعده إلى صفحة الاختيار
    window.location.href = 'index.html'; 
}

const currentBranch = BRANCH_CONFIG[currentBranchId] || BRANCH_CONFIG['branch1'];
document.title = `قائمة سحايب ديرتي - فرع ${currentBranch.name}`; // تحديث عنوان الصفحة باسم الفرع

/* ====== بيانات المنيو - تم تحديثها ببياناتك الجديدة والصور بصيغة .webp ====== */
const menuData = [
  // 1. القسم الجديد: الكل
  { 
    section:"الكل", 
    sectionImg: "/Dirty55/logo-bg.webp", // صورة عامة
    items:[] 
  },
  { 
    section:"الشوايه", 
    sectionImg: "/Dirty55/sh00.webp", // صورة القسم
    items:[
      // الوجبة 1
      {id:"sh1", img:"/Dirty55/sh1.webp", name:"شواية", basePrice:46, availableIn: ['branch1', 'branch3'], options:[ // ⭐️ تم تغيير اسم الصورة
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:4},
      {name:"رز مندي", price:4},
      {name:"رز مثلوثه", price:4}
    ]},
    // الوجبة 2
    {id:"sh2", img:"/Dirty55/sh2.webp", name:"نص شواية", basePrice:24, availableIn: ['branch1', 'branch2', 'branch3'], options:[ // ⭐️ تم تغيير اسم الصورة
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:1},
      {name:"رز مندي", price:1},
      {name:"رز مثلوثه", price:1}
    ]}
  ]},
  { 
    section:"المظبي", 
    sectionImg: "/Dirty55/md00.webp",
    items:[
      // الوجبة 1
      {id:"md1", img:"/Dirty55/md1.webp", name:"مظبي", basePrice:46, availableIn: ['branch1', 'branch2', 'branch3'], options:[ // ⭐️ تم تغيير اسم الصورة
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:4},
      {name:"رز مندي", price:4},
      {name:"رز مثلوثه", price:4}
    ]},
    // الوجبة 2
    {id:"md2", img:"/Dirty55/md2.webp", name:"نص مظبي", basePrice:24, availableIn: ['branch1', 'branch2', 'branch3'], options:[ // ⭐️ تم تغيير اسم الصورة
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:1},
      {name:"رز مندي", price:1},
      {name:"رز مثلوثه", price:1}
    ]}
  ]},
  { 
    section:"مندي", 
    sectionImg: "/Dirty55/mn00.webp",
    items:[
      // الوجبة 1
      {id:"mn1", img:"/Dirty55/mn1.webp", name:"مندي", basePrice:46, availableIn: ['branch2', 'branch3'], options:[ // ⭐️ تم تغيير اسم الصورة
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:4},
      {name:"رز مندي", price:4},
      {name:"رز مثلوثه", price:4}
    ]},
    // الوجبة 2
    {id:"mn2", img:"/Dirty55/mn2.webp", name:"نص مندي", basePrice:24, availableIn: ['branch1', 'branch2', 'branch3'], options:[ // ⭐️ تم تغيير اسم الصورة
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:1},
      {name:"رز مندي", price:1},
      {name:"رز مثلوثه", price:1}
    ]}
  ]},
  { 
    section:"مدفون", 
    sectionImg: "/Dirty55/mf00.webp",
    items:[
      // الوجبة 1
      {id:"mdf1", img:"/Dirty55/mf1.webp", name:"مدفون حبه كامل", basePrice:46, availableIn: ['branch1', 'branch2', 'branch3'], options:[ // ⭐️ تم تغيير اسم الصورة (مفترض mf1)
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:4},
      {name:"رز مندي", price:4},
      {name:"رز مثلوثه", price:4}
    ]},
    // الوجبة 2
    {id:"mdf2", img:"/Dirty55/mf2.webp", name:"نص مدفون", basePrice:24, availableIn: ['branch1', 'branch2', 'branch3'], options:[ // ⭐️ تم تغيير اسم الصورة (مفترض mf2)
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:1},
      {name:"رز مندي", price:1},
      {name:"رز مثلوثه", price:1}
    ]}
  ]},
  { 
    section:"مقلوبه", 
    sectionImg: "/Dirty55/mq00.webp",
    items:[
      // الوجبة 1
      {id:"mq1", img:"/Dirty55/mq1.webp", name:"دجاج مقلوبه حبه", basePrice:50, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز شعبي", price:0}]}, // ⭐️ تم تغيير اسم الصورة
      // الوجبة 2
      {id:"mq2", img:"/Dirty55/mq2.webp", name:"نص دجاج مقلوبه", basePrice:25, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز شعبي", price:0}]} // ⭐️ تم تغيير اسم الصورة
  ]},
  { 
    section:"مضغوط", 
    sectionImg: "/Dirty55/mg00.webp",
    items:[
      // الوجبة 1
      {
          id:"mg1", 
          img:"/Dirty55/mg1.webp", // ⭐️ تم تغيير اسم الصورة
          name:"دجاج مضغوط حبه", 
          basePrice:50, 
          isBestSeller: true, 
          branchDiscounts: {'branch1': 40}, // الخصم 40 ريال لفرع الرياض فقط
          availableIn: ['branch1', 'branch2', 'branch3'], 
          options:[{name:"رز مضغوط", price:0}]
      }, 
      // الوجبة 2
      {id:"mg2", img:"/Dirty55/mg2.webp", name:"نص حبه مضغوط", basePrice:25, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز مضغوط", price:0}]} // ⭐️ تم تغيير اسم الصورة
  ]},
  { 
    section:"زربيان", 
    sectionImg: "/Dirty55/zb00.webp",
    items:[
      // الوجبة 1
      {id:"zb1", img:"/Dirty55/zb1.webp", name:"دجاج زربيان حبه", basePrice:50, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز زربيان", price:0}]}, // ⭐️ تم تغيير اسم الصورة
      // الوجبة 2
      {id:"zb2", img:"/Dirty55/zb2.webp", name:"نص حبه زربيان", basePrice:25, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز زربيان", price:0}]} // ⭐️ تم تغيير اسم الصورة
  ]},
  { 
    section:"قسم اللحوم", 
    sectionImg: "/Dirty55/me00.webp",
    items:[
    // الوجبة 1
    {id:"t1", img:"/Dirty55/me1.webp", name:"تيس مندي كامل", basePrice:1550, isAvailable: false, availableIn: ['branch1', 'branch2', 'branch3'], options:[ // ⭐️ تم تغيير اسم الصورة (مفترض me1)
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:50},
      {name:"رز مندي", price:50}
    ]},
    // الوجبة 2
    {id:"t2", img:"/Dirty55/me2.webp", name:"نص تيس مندي", basePrice:800, isAvailable: false, availableIn: ['branch1', 'branch2', 'branch3'], options:[ // ⭐️ تم إنهاء الوجبة وتغيير اسم الصورة
      {name:"رز شعبي", price:0},
      {name:"رز بشاور", price:25},
      {name:"رز مندي", price:25}
    ]}
  ]}
];
