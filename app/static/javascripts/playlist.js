
function clickHandler(src) {
    var menuItems = document.querySelectorAll('.video-playlist-item');
    menuItems.forEach(function(item) {
        item.classList.remove('active');
    });

    var content = document.getElementById('video-content');
    content.src = src;

    var clickedElement = event.currentTarget;
    clickedElement.classList.add('active');
}

function highlight(element) {
    // Убираем класс .active у всех элементов
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function(item) {
        item.classList.remove('active');
    });

    // Добавляем класс .active только для выбранного элемента
    element.classList.add('active');
}