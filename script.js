// document.getElementById('loginForm').addEventListener('submit', async function (event) {
//     event.preventDefault(); // Предотвращаем стандартное поведение формы

//     const username = document.getElementById('username').value; // Получаем логин
//     const password = document.getElementById('password').value; // Получаем пароль
//     //localStorage.setItem('host', 'localhost');
//     //localStorage.setItem('port', '9091');
//     // Проверяем, что поля не пустые
//     if (!username || !password) {
//         console.error('Логин и пароль не могут быть пустыми');
//         return; // Завершаем функцию, если поля пустые
//     }

//     const data = {
//         login: username, // Поле для логина
//         password: password  // Поле для пароля
//     };

//     try {
//         console.log('get element by id is runned')
//         const operation = 'login'; // Операция
//         // const url = `${window.config.host}:${window.config.port}/${operation}`;
//         // console.log(url);

//         url = 'http://localhost:9091/login' 
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
    
//         if (response.ok) {
//             const jsonResponse = await response.json();
            
//             // Сохраняем userId и роль в localStorage
//             localStorage.setItem('userId', jsonResponse.userId);
//             localStorage.setItem('role', jsonResponse.role);
            
//             // Перенаправляем пользователя на соответствующую страницу
//             redirectToPage(jsonResponse.role);
//         } else {
//             console.error('Ошибка при входе:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Ошибка сети:', error);
//     }
    
// });

// function redirectToPage(role) {
//     console.log('redierect is runned')
//     switch (role) {
//         case 'washer':
//             console.log('Redirecting to page for role:', role);
//             window.location.href = './washer/washerMain.html'; // URL страницы для работника
//             break;
//         case 'courier':
//             console.log('Redirecting to page for role:', role);
//             window.location.href = './courier/courierMain.html'; // URL страницы для мойщика
//             break;
//         case 'administrator':
//             console.log('Redirecting to page for role:', role);
//             window.location.href = './administrator/administratorMain.html'; // URL страницы для администратора
//             break;
//         case 'manager':
//             console.log('Redirecting to page for role:', role);
//             window.location.href = './manager/managerMain.html'; // URL страницы для администратора
//             break;
//         default:
//             console.error('Неизвестная роль:', role);
//             break;
//     }
// }

// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((req, res) => {
//     if (req.url === '/favicon.ico') {
//         res.writeHead(204); // No content
//         res.end();
//         return;
//     }

//     // Обработка других запросов
//     const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
//     const extname = String(path.extname(filePath)).toLowerCase();
//     const mimeTypes = {
//         '.html': 'text/html',
//         '.js': 'text/javascript',
//         '.css': 'text/css',
//         '.ico': 'image/x-icon'
//     };

//     const contentType = mimeTypes[extname] || 'application/octet-stream';

//     fs.readFile(filePath, (error, content) => {
//         if (error) {
//             res.writeHead(500);
//             res.end(`Sorry, there was an error: ${error.code}`);
//             return;
//         }
//         res.writeHead(200, { 'Content-Type': contentType });
//         res.end(content, 'utf-8');
//     });
// });

// server.listen(9090, () => {
//     console.log('Server running at http://localhost:9090/');
// });
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const username = document.getElementById('username').value; // Получаем логин
    const password = document.getElementById('password').value; // Получаем пароль
    localStorage.setItem('host', 'localhost');
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

