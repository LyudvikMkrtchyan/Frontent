// Обработчик для кнопки "Добавить нового пользователя"
document.getElementById('addUserButton').addEventListener('click', function() {
    window.location.href = './addNewUser/addNewUser.html'; // Укажите путь к странице для добавления пользователя
});

// Обработчик для кнопки "Показать всех пользователей"
document.getElementById('showUsersButton').addEventListener('click', function() {
    window.location.href = './showAllUsers/showAllUsers.html'; // Укажите путь к странице для отображения всех пользователей
});

document.getElementById('optionsButton').addEventListener('click', function() {
    window.location.href = './options/options.html'; // Укажите путь к странице для отображения всех пользователей
});
