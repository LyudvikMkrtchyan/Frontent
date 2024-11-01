// Извлечение параметров из URL
const urlParams = new URLSearchParams(window.location.search);

const address = urlParams.get('address');
const entrance = urlParams.get('entrance');
const floor = urlParams.get('floor');
const flat = urlParams.get('flat');
const phoneNumber = urlParams.get('phoneNumber');
const totalPrice = urlParams.get('totalPrice');
const totalSurface = urlParams.get('totalSurface');
console.log('ok')

// Отображение информации об адресе и этаже
document.getElementById('address').textContent = address;
document.getElementById('entrance').textContent = entrance;
document.getElementById('floor').textContent = floor;
document.getElementById('flat').textContent = flat;
document.getElementById('phoneNumber').textContent = phoneNumber;

// Обновление значений для общей площади и общей суммы
document.getElementById('totalPrice').textContent = totalPrice;

// Функция для отправки данных на сервер и получения информации о коврах
async function fetchCarpetDetails() {
    try {
        const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        comand = '/getInDeliveredCarpetsFullInfoFromAddress'
        const url = `http://${host}:${port}${comand}`
        console.log(url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address     : address,
                entrance    : entrance,
                floor       : floor,
                flat        : flat ,
                phoneNumber : phoneNumber
            })
        });
        
        // Обработка ответа
        const data = await response.json();
        
        // Заполнение таблицы данными из ответа
        populateTable(data); // Убедитесь, что здесь передается массив объектов без имени
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

// Функция для заполнения таблицы данными ковра
function populateTable(details) {
    const tableBody = document.getElementById('carpetDetailsTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Очистка таблицы перед добавлением новых данных

    details.forEach(detail => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${detail.code}</td>
            <td>${detail.surface}</td>
            <td>${detail.price}</td>
        `;
        tableBody.appendChild(row);
    });
}
document.getElementById("deliverButton").addEventListener("click", async () => {
    // Собираем значения из столбца 'code' каждой строки таблицы
    const rows = document.querySelectorAll("#carpetDetailsTable tbody tr");
    const codes = Array.from(rows).map(row => row.cells[0].innerText);
    
    // Отправляем запрос на сервер
    try {
        const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        comand = '/changeCarpetsStatusToDelivered'
        const url = `http://${host}:${port}${comand}`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ codes })
        });
        
        if (response.ok) {
            // Перенаправление после успешного запроса
            window.location.href = "../todaysCarpetsToGiveOut.html"; // Укажите нужную локацию
        } else {
            console.error("Ошибка при отправке данных");
        }
    } catch (error) {
        console.error("Ошибка:", error);
    }
});

// Вызов функции для получения данных при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchCarpetDetails);

