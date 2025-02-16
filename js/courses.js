// إضافة هذا الكود في بداية ملف courses.js
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

    // إغلاق المينيو عند النقر على أي رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuButton.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // باقي كود الصفحة...
});

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة العناصر الرئيسية
    const coursesGrid = document.getElementById('coursesGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const sortSelect = document.getElementById('sortCourses');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    let currentPage = 1;
    const coursesPerPage = 12;
    const totalCourses = 24;

    // قائمة الكورسات
    const coursesList = [
        {
            title: "تطوير تطبيقات الويب المتقدمة",
            category: "برمجة",
            image: "https://picsum.photos/500/300?random=1",
            instructor: {
                name: "أحمد محمد",
                avatar: "https://i.pravatar.cc/100?img=1"
            },
            duration: "12 ساعة",
            students: "150 طالب",
            price: "199 $"
        },
        {
            title: "تصميم واجهات المستخدم",
            category: "تصميم",
            image: "https://picsum.photos/500/300?random=2",
            instructor: {
                name: "سارة أحمد",
                avatar: "https://i.pravatar.cc/100?img=2"
            },
            duration: "10 ساعات",
            students: "120 طالب",
            price: "149 $"
        },
        {
            title: "التسويق الرقمي",
            category: "تسويق",
            image: "https://picsum.photos/500/300?random=3",
            instructor: {
                name: "محمد خالد",
                avatar: "https://i.pravatar.cc/100?img=3"
            },
            duration: "15 ساعة",
            students: "200 طالب",
            price: "179 $"
        }
        // يمكنك إضافة المزيد من الكورسات هنا
    ];

    // دالة إنشاء بطاقة الكورس
    function createCourseCard(course) {
        return `
            <div class="course-card">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}">
                    <span class="course-category">${course.category}</span>
                </div>
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-instructor">
                        <img src="${course.instructor.avatar}" alt="${course.instructor.name}" class="instructor-avatar">
                        <span class="instructor-name">${course.instructor.name}</span>
                    </div>
                    <div class="course-meta">
                        <span><i class="fas fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-users"></i> ${course.students}</span>
                    </div>
                    <div class="course-price">${course.price}</div>
                </div>
            </div>
        `;
    }

    // دالة تحميل الكورسات
    function loadCourses() {
        const startIndex = (currentPage - 1) * coursesPerPage;
        const endIndex = startIndex + coursesPerPage;
        
        for(let i = startIndex; i < endIndex && i < totalCourses; i++) {
            // إنشاء كورس تجريبي لكل موقع
            const mockCourse = {
                title: `كورس ${i + 1}`,
                category: "برمجة",
                image: `https://picsum.photos/500/300?random=${i}`,
                instructor: {
                    name: "أستاذ تجريبي",
                    avatar: `https://i.pravatar.cc/100?img=${i}`
                },
                duration: "10 ساعات",
                students: "100 طالب",
                price: "99 $"
            };
            
            // إضافة الكورس للشبكة
            coursesGrid.innerHTML += createCourseCard(mockCourse);
        }

        // إخفاء زر "تحميل المزيد" إذا وصلنا للنهاية
        if (endIndex >= totalCourses) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // تحميل أول 12 كورس عند تحميل الصفحة
    loadCourses();

    // إضافة حدث النقر لزر تحميل المزيد
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadCourses();
    });

    // تطبيق الفلاتر
    function applyFilters() {
        const selectedMainCategory = document.querySelector('input[name="main-category"]:checked').value;
        coursesGrid.innerHTML = ''; // مسح الكورسات الحالية
        currentPage = 1; // إعادة تعيين رقم الصفحة
        loadCourses(); // تحميل الكورسات مجدداً
    }

    // إعادة تعيين الفلاتر
    function resetFilters() {
        document.querySelector('input[value="all"]').checked = true;
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        sortSelect.value = 'popularity';
        applyFilters();
    }

    // إضافة مستمعي الأحداث
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    sortSelect.addEventListener('change', applyFilters);

    // للشاشات الصغيرة - زر الفلاتر
    const showFiltersBtn = document.createElement('button');
    showFiltersBtn.className = 'show-filters-btn';
    showFiltersBtn.innerHTML = '<i class="fas fa-filter"></i>';
    document.body.appendChild(showFiltersBtn);

    showFiltersBtn.addEventListener('click', () => {
        document.querySelector('.filters-sidebar').classList.toggle('active');
    });
});

// تعديل دالة إنشاء بطاقة الكورس
function createCourseCard(course) {
    return `
        <div class="course-card">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                <span class="course-category">${course.category}</span>
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <div class="course-instructor">
                    <img src="${course.instructor.avatar}" alt="${course.instructor.name}" class="instructor-avatar">
                    <span class="instructor-name">${course.instructor.name}</span>
                </div>
                <div class="course-duration">
                    <i class="fas fa-clock"></i> ${course.duration}
                </div>
                <div class="course-bottom">
                    <div class="course-students">
                        <i class="fas fa-users"></i> ${course.students}
                    </div>
                    <div class="course-price">${course.price}</div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    // ... الكود السابق ...

    // تعريف التصنيفات الفرعية
    const subCategories = {
        programming: ['تطوير الويب', 'تطبيقات الموبايل', 'الذكاء الاصطناعي', 'قواعد البيانات'],
        business: ['ريادة الأعمال', 'التسويق الرقمي', 'إدارة المشاريع', 'المبيعات'],
        design: ['تصميم واجهات المستخدم', 'الجرافيك ديزاين', 'تحريك الرسوم', 'التصميم ثلاثي الأبعاد']
    };

    // دالة تحديث التصنيفات الفرعية
    function updateSubCategories(mainCategory) {
        const subCategoriesList = document.querySelector('.sub-categories');
        subCategoriesList.innerHTML = ''; // مسح التصنيفات الفرعية الحالية
        
        // إذا كان التصنيف الرئيسي "الكل" نخفي التصنيفات الفرعية
        if (mainCategory === 'all') {
            subCategoriesList.style.display = 'none';
            return;
        }

        // إظهار قائمة التصنيفات الفرعية
        subCategoriesList.style.display = 'block';
        
        // إضافة التصنيفات الفرعية المناسبة
        if (subCategories[mainCategory]) {
            subCategories[mainCategory].forEach(sub => {
                subCategoriesList.innerHTML += `
                    <li>
                        <label>
                            <input type="checkbox" name="sub-category" value="${sub}">
                            ${sub}
                        </label>
                    </li>
                `;
            });
        }
    }

    // إضافة مستمع الأحداث للتصنيفات الرئيسية
    document.querySelectorAll('input[name="main-category"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            updateSubCategories(e.target.value);
        });
    });

    // تحديث التصنيفات الفرعية عند تحميل الصفحة
    const initialCategory = document.querySelector('input[name="main-category"]:checked');
    if (initialCategory) {
        updateSubCategories(initialCategory.value);
    }

    // ... باقي الكود ...
});

