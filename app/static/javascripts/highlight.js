function highlight(element) {
    // Убираем класс .active у всех элементов
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function(item) {
        item.classList.remove('active');
    });

    // Добавляем класс .active только для выбранного элемента
    element.classList.add('active');
}