document.addEventListener('DOMContentLoaded', function() {
    // التحكم في المينيو للموبايل
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // التحكم في الأقسام
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        header.addEventListener('click', () => {
            section.classList.toggle('active');
        });
    });

    // التحكم في تشغيل الفيديوهات
    const videoItems = document.querySelectorAll('.video-item');
    const mainVideo = document.getElementById('mainVideo');
    const currentVideoTitle = document.getElementById('currentVideoTitle');
    const currentVideoDescription = document.getElementById('currentVideoDescription');

// فقط جزء تحديث الفيديو
videoItems.forEach(item => {
    item.addEventListener('click', () => {
        // إزالة الكلاس active من جميع الفيديوهات
        videoItems.forEach(v => v.classList.remove('active'));
        
        // إضافة الكلاس active للفيديو المحدد
        item.classList.add('active');
        
        // تحديث مصدر الفيديو مع إضافة autoplay
        const videoId = item.getAttribute('data-video');
        mainVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
        
        // تحديث معلومات الفيديو
        currentVideoTitle.textContent = item.getAttribute('data-title');
        currentVideoDescription.textContent = item.getAttribute('data-description');
    });
});

    // تفعيل أول قسم افتراضياً
    sections[0].classList.add('active');
});