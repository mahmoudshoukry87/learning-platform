document.addEventListener('DOMContentLoaded', function() {
    // التحكم في فتح وغلق الأقسام
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        header.addEventListener('click', (e) => {
            e.preventDefault();
            section.classList.toggle('active');
            
            // تغيير اتجاه السهم
            const icon = header.querySelector('i');
            if(section.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // التحكم في تشغيل الفيديوهات
    const videoItems = document.querySelectorAll('.video-item');
    const mainVideo = document.getElementById('mainVideo');
    const currentVideoTitle = document.getElementById('currentVideoTitle');
    const currentVideoDescription = document.getElementById('currentVideoDescription');

    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            // إزالة الكلاس active من جميع الفيديوهات
            videoItems.forEach(v => v.classList.remove('active'));
            
            // إضافة الكلاس active للفيديو المحدد
            item.classList.add('active');
            
            // تحديث مصدر الفيديو
            const videoId = item.getAttribute('data-video');
            mainVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            
            // تحديث عنوان ووصف الفيديو
            currentVideoTitle.textContent = item.querySelector('.video-title').textContent;
            currentVideoDescription.textContent = 'شرح ' + item.querySelector('.video-title').textContent;
        });
    });

    // تفعيل أول قسم افتراضياً
    sections[0].classList.add('active');
});