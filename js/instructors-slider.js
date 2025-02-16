document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.instructors-track');
    let startX;
    let scrollLeft;
    let isDown = false;

    // دالة بدء السحب
    function startDragging(e) {
        isDown = true;
        track.classList.add('active');
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        scrollLeft = track.scrollLeft;
    }

    // دالة إنهاء السحب
    function stopDragging() {
        isDown = false;
        track.classList.remove('active');
    }

    // دالة التحريك
    function move(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    }

    // إضافة مستمعي أحداث الماوس
    track.addEventListener('mousedown', startDragging);
    track.addEventListener('mousemove', move);
    track.addEventListener('mouseup', stopDragging);
    track.addEventListener('mouseleave', stopDragging);

    // إضافة مستمعي أحداث اللمس
    track.addEventListener('touchstart', startDragging);
    track.addEventListener('touchmove', move);
    track.addEventListener('touchend', stopDragging);
});