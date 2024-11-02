
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const username = document.getElementById('username').value; // Получаем логин
    const password = document.getElementById('password').value; // Получаем пароль
    localStorage.setItem('host', '94.176.182.63');
    localStorage.setItem('port', '9091');
  

    // Проверяем, что поля не пустые
    if (!username || !password) {
        console.error('Логин и пароль не могут быть пустыми');
        return; // Завершаем функцию, если поля пустые
    }
    
    const data = {
        login: username, // Поле для логина
        password: password  // Поле для пароля
    };
    
    try {
        console.log('get element by id is runned');
       
        const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        comand = '/login'
        const url = `http://${host}:${port}${comand}`; // Используем конфигурацию

        // Отправляем запрос на вход
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const jsonResponse = await response.json();

            // Сохраняем userId и роль в localStorage
            localStorage.setItem('userId', jsonResponse.userId);
            localStorage.setItem('role', jsonResponse.role);

            // Перенаправляем пользователя на соответствующую страницу
            redirectToPage(jsonResponse.role);
        } else {
            console.error('Ошибка при входе:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
});

function redirectToPage(role) {
    console.log('redirect is runned');
    switch (role) {
        case 'washer':
            window.location.href = './washer/washerMain.html';
            break;
        case 'courier':
            window.location.href = './courier/courierMain.html';
            break;
        case 'administrator':
            window.location.href = './administrator/administratorMain.html';
            break;
        case 'manager':
            window.location.href = './manager/managerMain.html';
            break;
        default:
            console.error('Неизвестная роль:', role);
            break;
    }
}

