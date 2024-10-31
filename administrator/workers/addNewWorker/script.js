document.getElementById('saveButton').addEventListener('click', function () {
    const salaryInput = document.getElementById('salary').value; // Получаем значение зарплаты
    const salary = parseInt(salaryInput, 10); // Преобразуем строку в целое число

    // Проверяем, является ли введенное значение целым числом
    if (isNaN(salary) || salary < 0) {
        alert('Խնդրում ենք մուտքագրել վավեր աշխատավարձ (օգնություն՝ ոչ բացասական թիվ)'); // Сообщение об ошибке
        return; // Прекращаем выполнение функции, если значение недействительно
    }

    const userData = {
        login: document.getElementById('login').value,
        password: document.getElementById('password').value,
        name: document.getElementById('name').value, // Исправил на правильный id
        surname: document.getElementById('surname').value, // Исправил на правильный id
        phone: document.getElementById('phone').value,
        role: document.getElementById('role').value,
        salary: salary, // Используем проверенное значение зарплаты
    };

    console.log('Отправленные данные пользователя:', userData);
 
    // Пример отправки данных на сервер
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    comand = '/addWorker'
    const url = `http://${host}:${port}${comand}`; 
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
           window.location.href = "../workers.html"
        }
    })
    .then(data => {
        console.log('Ответ сервера:', data);
        alert('Пользователь успешно зарегистрирован!');
    })
    .catch(error => {
        window.location.href = "../workers.html"
        console.error('Ошибка:', error);
    
    });
});

document.getElementById('resetButton').addEventListener('click', function () {
    document.getElementById('userForm').reset(); // Сбрасываем все поля формы
});

document.getElementById('backButton').addEventListener('click', function () {
    window.location.href = '../workers.html';
});



