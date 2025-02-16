document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slide-nav.prev');
    const nextButton = document.querySelector('.slide-nav.next');
    const slideContainer = document.querySelector('.slide-container');
    let currentSlide = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // دالة للانتقال إلى الشريحة التالية
    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // دالة للانتقال إلى شريحة محددة
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = n;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // إضافة مستمعي الأحداث للأزرار
    prevButton.addEventListener('click', () => {
        goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // إضافة مستمعي الأحداث لنقاط التنقل
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
    });

    // دالة لإعادة تعيين الفاصل الزمني
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Touch Events
    slideContainer.addEventListener('touchstart', touchStart);
    slideContainer.addEventListener('touchmove', touchMove);
    slideContainer.addEventListener('touchend', touchEnd);

    // Mouse Events
    slideContainer.addEventListener('mousedown', touchStart);
    slideContainer.addEventListener('mousemove', touchMove);
    slideContainer.addEventListener('mouseup', touchEnd);
    slideContainer.addEventListener('mouseleave', touchEnd);

    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        slideContainer.style.cursor = 'grabbing';
    }

    function touchMove(event) {
        if (!isDragging) return;
        
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }

    function touchEnd() {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        // إذا تم التحريك بمقدار كافٍ
        if (Math.abs(movedBy) > 100) {
            if (movedBy < 0) {
                nextSlide();
            } else {
                goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
            }
        }

        currentTranslate = 0;
        prevTranslate = 0;
        resetInterval();
        slideContainer.style.cursor = 'grab';
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // منع السحب الافتراضي للصور
    slideContainer.addEventListener('dragstart', (e) => e.preventDefault());

    // بدء العرض التلقائي
    resetInterval();
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    // تفعيل/إلغاء تفعيل القائمة
    mobileMenuButton.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // إغلاق القائمة عند النقر على أي رابط
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuButton.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            mobileMenuButton.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // إخفاء/إظهار القائمة عند التمرير
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.top = "0";
            return;
        }
        
        if (currentScroll > lastScroll && !navLinks.classList.contains('active')) {
            nav.style.top = "-80px";
        } else {
            nav.style.top = "0";
        }
        
        lastScroll = currentScroll;
    });
});