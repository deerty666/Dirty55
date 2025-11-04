// ====== 1. هيكل بيانات القائمة ======
const menuItems = [
    { id: 'D01', name: 'دجاج شواية كامل', price: 35.00, section: 'الدجاج' },
    { id: 'D02', name: 'دجاج شواية نصف', price: 18.00, section: 'الدجاج' },
    { id: 'M01', name: 'لحم مندي', price: 90.00, section: 'اللحم' },
    { id: 'M02', name: 'لحم حنيذ', price: 95.00, section: 'اللحم' },
    { id: 'H01', name: 'كنافة بالجبنة', price: 15.00, section: 'الحلا' },
    // يجب إضافة جميع الأصناف هنا
];

// دالة مساعدة: لإيجاد تفاصيل الصنف بالـ ID
function getItemDetails(id) {
    return menuItems.find(item => item.id === id);
}

// ====== 2. الكود الرئيسي لإرسال الطلب عبر الواتساب ======
const sendButton = document.getElementById('sendOrderBtn'); 

// ************* ملاحظة هامة: هذا الكود يحتاج لربط HTML فعلي لسلة التسوق ************* // هذا مثال لمحتويات سلة التسوق لغرض التجربة:
let cartItems = [
    { id: 'D01', quantity: 2 }, // 2 دجاج شواية كامل
    { id: 'M01', quantity: 1 }  // 1 لحم مندي
];

sendButton.addEventListener('click', createWhatsAppLink);

function createWhatsAppLink() {
    const phoneNumber = '966536803598'; 
    const deliveryFee = 5; 
    
    let orderDetails = "**مطعم سحايب ديرتي: طلب جديد!**%0A%0A";
    let subtotal = 0; 

    // إضافة بيانات العميل (يجب أن يتم قراءتها من حقول إدخال HTML)
    const customerName = document.getElementById('customerName').value || 'غير محدد';
    const customerPhone = document.getElementById('customerPhone').value || 'غير محدد';

    orderDetails += `**اسم العميل:** ${customerName}%0A`;
    orderDetails += `**جوال العميل:** ${customerPhone}%0A`;
    orderDetails += `%0A--- **قائمة الطلبات** ---%0A`;
    
    // حلقة تمر على كل صنف في سلة التسوق وتحسب الإجمالي
    cartItems.forEach(cartItem => {
        const item = getItemDetails(cartItem.id);
        if (item) {
            const itemTotal = item.price * cartItem.quantity;
            subtotal += itemTotal;
            orderDetails += `* ${item.name} (${cartItem.quantity}) - ${itemTotal.toFixed(2)} ريال%0A`;
        }
    });

    const total = subtotal + deliveryFee;

    // بناء رسالة الواتساب النهائية 
    const finalMessage = `${orderDetails}
        %0A---%0A
        %0A**المجموع الفرعي:** ${subtotal.toFixed(2)} ريال
        %0A**رسوم التوصيل:** ${deliveryFee.toFixed(2)} ريال
        %0A**الإجمالي النهائي:** ${total.toFixed(2)} ريال
        %0A**طريقة الاستلام:** توصيل
        %0A**طريقة الدفع:** نقداً / شبكة عند الاستلام
    `;
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    
    window.open(whatsappURL, '_blank');
}
