// Получаем ID из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// Получаем данные пользователя из localStorage
const userData = JSON.parse(localStorage.getItem('userData'));

// Заполняем поля формы данными пользователя
if (userData) {
    document.getElementById('login').value = userData.login;
    document.getElementById('name').value = userData.name;
    document.getElementById('surname').value = userData.surname;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('role').value = userData.role;
    document.getElementById('salary').value = userData.salary;
}

// Обработчик для кнопки "Сохранить"
document.getElementById('saveButton').addEventListener('click', function () {
    const userUpdateData = {
        workerId: parseInt(userId),
        login: document.getElementById('login').value,
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        phone: document.getElementById('phone').value,
        role: document.getElementById('role').value,
        salary: parseInt(document.getElementById('salary').value, 10),
    };
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    comand = '/updateWorker'
    const url = `http://${host}:${port}${comand}`; 
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userUpdateData)
    })
    .then(response => {
        if (response.ok) {
            alert('Данные успешно обновлены!');
        } else {
            throw new Error('Ошибка при обновлении данных');
        }
    })
    .catch(error => console.error('Ошибка:', error));
});

// Обработчик для кнопки "Назад"
document.getElementById('backButton').addEventListener('click', function () {
    window.location.href = '../showAllUsers.html';
});
