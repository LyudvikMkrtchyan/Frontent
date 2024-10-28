// Обработчик для кнопки "Добавить нового пользователя"
document.getElementById('workersButton').addEventListener('click', function() {
    window.location.href = './workers/workers.html'; // Укажите путь к странице для добавления пользователя
});


document.getElementById('optionsButton').addEventListener('click', function() {
    window.location.href = './options/options.html'; // Укажите путь к странице для отображения всех пользователей
});

document.getElementById('todaysCompletedWorkButton').addEventListener('click', function() {
    window.location.href = './todaysCompledWork/todaysCompletedWork.html'; // Укажите путь к странице для отображения всех пользователей
});