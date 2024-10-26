// Ваш код для загрузки пользователей остается без изменений

document.addEventListener('DOMContentLoaded', function () {
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    comand = '/getAllWorkers'
    const url = `http://${host}:${port}${comand}`

    fetch(url) // URL вашего бэкенда для получения пользователей
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.json();
        })
        .then(users => {
            const tbody = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
            users.forEach(user => {
                const row = tbody.insertRow();
                row.insertCell(0).textContent = user.name; // Անուն
                row.insertCell(1).textContent = user.surname; // Ազգանուն
                row.insertCell(2).textContent = user.role; // Պաշտոն
                row.insertCell(3).textContent = user.id; // ID

                // Добавляем обработчик событий на строку
                row.addEventListener('click', function () {
                    selectUser(user, row); // Передаем выбранного пользователя и строку
                });
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось загрузить пользователей.');
        });
});

// Переменные для хранения выбранного пользователя
let selectedUser = null;

function selectUser(user, row) {
    // Убираем выделение с предыдущей строки, если есть
    const previousSelectedRow = document.querySelector('.selected');
    if (previousSelectedRow) {
        previousSelectedRow.classList.remove('selected');
    }

    selectedUser = user; // Сохраняем выбранного пользователя
    row.classList.add('selected'); // Выделяем текущую строку

   

    // Активируем кнопки после выбора пользователя
    document.getElementById('editUserButton').disabled = false;
    document.getElementById('financialPartButton').disabled = false;
}

// Обработчик для кнопки "Փոփոխել աշխատակցի տվյալները"
document.getElementById('editUserButton').addEventListener('click', function () {
    if (selectedUser) {
        const userData = {
            id: selectedUser.id
          
        };
        // Отправка запроса на сервер для получения данных о пользователе
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    comand = '/getUserForChange?id=${selectedUser.id}'
    const url = `http://${host}:${port}${comand}`
         fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
        }) 
     
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка получения данных пользователя');
                }
                
                return response.json();
            })
            .then(userData => {
                // Здесь можно сохранить полученные данные, если это нужно
                // Например, передать их на новую страницу
                localStorage.setItem('userData', JSON.stringify(userData)); // Сохраняем данные в localStorage

                // Перенаправляем на страницу редактирования с полученными данными
                window.location.href = `./changeUserData/changeUserData.html?id=${selectedUser.id}`;
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Не удалось получить данные пользователя.');
            });
    }
});

// Обработчик для кнопки "Աշխատակցի ֆինանսական մաս"
document.getElementById('financialPartButton').addEventListener('click', function () {
    if (selectedUser) {
        // Здесь можно перенаправить на страницу финансового учета
        window.location.href = `financialPart.html?id=${selectedUser.id}`; // Подставьте свой URL для финансов
    }
});

// Обработчик для кнопки "Հետ"
document.getElementById('backButton').addEventListener('click', function () {
    window.location.href = '../administratorMain.html'; // Назад к главной странице администратора
});
