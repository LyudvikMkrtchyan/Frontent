document.addEventListener('DOMContentLoaded', function () {
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    comand = '/getOrders'
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
                row.insertCell(0).textContent = user.address; 
                row.insertCell(1).textContent = user.entrance; 
                row.insertCell(2).textContent = user.floor; 
                row.insertCell(3).textContent = user.entrance; 
                row.insertCell(4).textContent = user.flat; 
                row.insertCell(5).textContent = user.date_of_recipte; 
                row.insertCell(6).textContent = user.time_of_recipte; 
                row.insertCell(7).textContent = user.desired_date; 
                row.insertCell(8).textContent = user.code; 
                row.insertCell(9).textContent = user.location; 


            })
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
