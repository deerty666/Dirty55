// 1. تحديد زر إرسال الطلب من HTML
const sendButton = document.getElementById('sendOrderBtn'); 

// 2. الاستماع لنقرة العميل على الزر 
sendButton.addEventListener('click', createWhatsAppLink);

// 3. تعريف الدالة المسؤولة عن بناء الرابط
function createWhatsAppLink() {
    // رقم الواتساب الخاص بمطاعم سحايب ديرتي: ٠٥٣٦٨٠٣٥٩٨
    const phoneNumber = '966536803598'; 
    
    // رسوم التوصيل الثابتة (5 ريال)
    const deliveryFee = 5; 
    
    // هنا سنقوم بتجميع بيانات الطلب والمجموع
    let orderDetails = "تم استلام طلب جديد من تطبيق ديرتي:\n\n";
    let subtotal = 0; 
    
    // ***** هنا سيأتي كود جمع الأصناف والمجموع ***** // المجموع الكلي (شامل رسوم التوصيل)
    const total = subtotal + deliveryFee;

    // بناء رسالة الواتساب النهائية (باستخدام ترميز السطر الجديد %0A)
    const finalMessage = `${orderDetails}
        %0A---%0A
        %0A**طريقة الاستلام:** توصيل
        %0A**رسوم التوصيل:** ${deliveryFee} ريال
        %0A**الإجمالي النهائي:** ${total} ريال
        %0A**طريقة الدفع:** نقداً / شبكة عند الاستلام
    `;
    
    // بناء الرابط النهائي لفتح الواتساب
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${finalMessage}`;
    
    // فتح الواتساب في نافذة جديدة
    window.open(whatsappURL, '_blank');
}
