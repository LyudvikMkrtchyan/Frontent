// Получение идентификатора пользователя из localStorage
const workerId = localStorage.getItem('userId');

// Функция для запроса данных с сервера
async function fetchCarpetsData() {
    try {
        const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        comand = '/getCarpetForDeliveriConcretWorker'
        const url = `http://${host}:${port}${comand}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: parseInt(workerId, 10)})
        });
        const data = await response.json();
        
        // Обновление меток общей площади и общей суммы
        document.getElementById('totalSurface').textContent = data.TotalSurface;
        document.getElementById('totalPrice').textContent = data.totalprice;
        
        // Заполнение таблицы полученными данными
        populateTable(data.InfoFromAddres);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

// Функция для заполнения таблицы
function populateTable(carpets) {
    const tableBody = document.getElementById('carpetTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Очищаем таблицу перед добавлением новых строк
    
    carpets.forEach(carpet => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${carpet.address}</td>
            <td>${carpet.building}</td>
            <td>${carpet.entrance}</td>
            <td>${carpet.apartment}</td>
            <td>${carpet.phoneNumber}</td>
            <td>${carpet.quantity}</td>
            <td>${carpet.totalPrice}</td>
            <td>${carpet.totalSurface}</td>
        `;
        
        // Обработчик события двойного клика по строке
        row.addEventListener('dblclick', () => {
            const params = new URLSearchParams({
                address      : carpet.address,
                entrance    : carpet.entrance,
                phoneNumber  : carpet.phoneNumber,
                totalPrice   : carpet.totalPrice,
                totalSurface : carpet.totalSurface
            });
            window.location.href = `./fullInfoFromAddress/fullInfoFromAddress.html?${params.toString()}`;
        });

        tableBody.appendChild(row);
    });
}

// Вызов функции для получения данных при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchCarpetsData);
