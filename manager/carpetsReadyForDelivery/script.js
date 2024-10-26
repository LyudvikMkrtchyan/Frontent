document.getElementById('showCarpets').addEventListener('click', function() {
    const dateInput = document.getElementById('date').value;

    // Проверяем, выбрана ли дата
    if (dateInput) {
        // Создаем JSON объект для отправки на бэкенд
        const data = {
            date: dateInput
        };

        const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        const comand = '/getReadyForDeliveryCarpets';
        const url = `http://${host}:${port}${comand}`;
        fetch(url, {
            method: 'POST', // Измените на GET, если нужно
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Сетевая ошибка: ответ не был успешным');
            }
            return response.json();
        })
        .then(data => {
            console.log('Успех:', data);
            populateTable(data); // Заполняем таблицу данными
            loadDeliveryOptions(); // Загружаем доступные варианты доставщиков
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
    } else {
        alert('Пожалуйста, выберите дату'); // "Please select a date"
    }
});

// Функция для заполнения таблицы
function populateTable(carpets) {
    const tbody = document.querySelector('#carpetsTable tbody');
    tbody.innerHTML = ''; // Очищаем предыдущие данные

    carpets.forEach(carpet => {
        const row = document.createElement('tr');
        
        // Создаем ячейки для каждой колонки
        row.innerHTML = `
            <td><input type="checkbox" class="carpet-checkbox" data-code="${carpet.code}"></td>
            <td>${carpet.washingDate}</td>
            <td>${carpet.expectedDate}</td>
            <td>${carpet.phoneNumber}</td>
            <td>${carpet.address}</td>
            <td>${carpet.area}</td>
            <td>${carpet.price}</td>
            <td>${carpet.code}</td>
        `;

        tbody.appendChild(row); // Добавляем строку в тело таблицы
    });
}

// Функция для загрузки доступных вариантов доставщиков
function loadDeliveryOptions() {

    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    const comand = '/getDeliverys';
    const url = `http://${host}:${port}${comand}`;
    fetch(url) // Запрос на бэкенд
        .then(response => response.json())
        .then(deliveries => {
            const deliverySelect = document.getElementById('delivery');
            deliverySelect.innerHTML = ''; // Очищаем предыдущие значения

            deliveries.forEach(delivery => {
                const option = document.createElement('option');
                option.value = delivery.name; // Или другое поле, представляющее имя
                option.textContent = delivery.name; // Или другое поле, представляющее имя
                deliverySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Ошибка загрузки доставщиков:', error));
}

// Обработчик нажатия кнопки "Հաստատել"
document.getElementById('confirmDelivery').addEventListener('click', function() {
    const selectedDelivery = Array.from(document.getElementById('delivery').selectedOptions).map(option => option.value);
    const selectedCarpets = Array.from(document.querySelectorAll('.carpet-checkbox:checked')).map(checkbox => checkbox.getAttribute('data-code'));

    if (selectedDelivery.length > 0 && selectedCarpets.length > 0) {
        const payload = {
            delivery: selectedDelivery,
            codes: selectedCarpets
        };
        const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        const comand = '/setDeliveryForCarpets';
        const url = `http://${host}:${port}${comand}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Сетевая ошибка: ответ не был успешным');
            }
            return response.json();
        })
        .then(data => {
            console.log('Доставка успешно подтверждена:', data);
            alert('Доставка успешно подтверждена!'); // "Delivery confirmed successfully!"
            // Здесь можно обновить таблицу или сделать другие действия после подтверждения
        })
        .catch(error => console.error('Ошибка подтверждения доставки:', error));
    } else {
        alert('Пожалуйста, выберите хотя бы один доставщик и один ковер для подтверждения.'); // "Please select at least one delivery person and one carpet to confirm."
    }
});
