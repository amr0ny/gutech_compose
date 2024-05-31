function scrollToTop() {
    var currentPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // Если текущая позиция больше 0, прокрутить страницу вверх
    if (currentPosition > 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Добавление анимации прокрутки
        });
    }
}