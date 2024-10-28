document.addEventListener('DOMContentLoaded', function () {
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    const comand = '/getWorkersForSalary';
    const url = `http://${host}:${port}${comand}`;

    // Получение списка пользователей с сервера
    fetch(url)
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

                // Добавляем чекбокс для выбора
                const checkboxCell = row.insertCell(0);
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add('selectCheckbox');
                checkbox.dataset.userId = user.id;
                checkbox.dataset.status = user.status;
                checkboxCell.appendChild(checkbox);

                row.insertCell(1).textContent = user.name;
                row.insertCell(2).textContent = user.surname;
                row.insertCell(3).textContent = changeStatus(user.status);
                row.insertCell(4).textContent = user.id;
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось загрузить пользователей.');
        });
});

// Функция для изменения статуса
function changeStatus(status) {
    switch (status) {
        case 'Paid':
            return 'Վճարած';
        case 'Unpaid':
            return 'Չվճարած';
        default:
            return status;
    }
}

// Обработчик кнопки "Եկել է աշխատանքի"
document.getElementById('checkStatusButton').addEventListener('click', function () {
    const selectedCheckboxes = document.querySelectorAll('.selectCheckbox:checked');

    if (selectedCheckboxes.length === 0) {
        alert('Пожалуйста, выберите хотя бы одного пользователя.');
        return;
    }

    const unpaidUserIds = [];
    selectedCheckboxes.forEach(checkbox => {
        const userId = checkbox.dataset.userId;
        const userStatus = checkbox.dataset.status;

        if (userStatus === 'Unpaid') {
            unpaidUserIds.push(parseInt(userId));
        } else {
            alert(`ID:  ${userId} Աշխատողի օրը արդեն հաշվարկված է.`);
        }
    });

    if (unpaidUserIds.length > 0) {
        const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        const comand = '/setSalary';
        const url = `http://${host}:${port}${comand}`;

        // Отправляем массив ID на сервер
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: unpaidUserIds })
        })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка отправки данных');
            location.reload(); // Обновляем страницу после успешной отправки
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось отправить запрос.');
        });
    }
});

// Обработчик кнопки "Հետ"
document.getElementById('backButton').addEventListener('click', function () {
    window.location.href = '../workers.html';
});
