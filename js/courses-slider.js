document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.courses-track');
    let isDown = false;
    let startX;
    let scrollLeft;

    // تهيئة خصائص السحب
    function startDragging(e) {
        isDown = true;
        track.classList.add('active');
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        scrollLeft = track.scrollLeft;
    }

    // إنهاء السحب
    function stopDragging() {
        isDown = false;
        track.classList.remove('active');
    }

    // التحريك
    function move(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    }

    // أحداث الماوس
    track.addEventListener('mousedown', startDragging);
    track.addEventListener('mousemove', move);
    track.addEventListener('mouseup', stopDragging);
    track.addEventListener('mouseleave', stopDragging);

    // أحداث اللمس
    track.addEventListener('touchstart', startDragging);
    track.addEventListener('touchmove', move);
    track.addEventListener('touchend', stopDragging);
});
