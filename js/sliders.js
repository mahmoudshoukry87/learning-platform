document.addEventListener('DOMContentLoaded', function() {
    // دالة مساعدة لإعداد السحب للعناصر
    function setupDragging(trackElement) {
        let isDown = false;
        let startX;
        let scrollLeft;

        function startDragging(e) {
            isDown = true;
            trackElement.classList.add('active');
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            scrollLeft = trackElement.scrollLeft;
        }

        function stopDragging() {
            isDown = false;
            trackElement.classList.remove('active');
        }

        function move(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const walk = (x - startX);
            trackElement.scrollLeft = scrollLeft - walk;
        }

        // إضافة مستمعي الأحداث
        trackElement.addEventListener('mousedown', startDragging);
        trackElement.addEventListener('mousemove', move);
        trackElement.addEventListener('mouseup', stopDragging);
        trackElement.addEventListener('mouseleave', stopDragging);

        trackElement.addEventListener('touchstart', startDragging);
        trackElement.addEventListener('touchmove', move);
        trackElement.addEventListener('touchend', stopDragging);
    }

    // تهيئة السحب لكلا القسمين
    const instructorsTrack = document.querySelector('.instructors-track');
    const coursesTrack = document.querySelector('.courses-track');

    if (instructorsTrack) setupDragging(instructorsTrack);
    if (coursesTrack) setupDragging(coursesTrack);
});