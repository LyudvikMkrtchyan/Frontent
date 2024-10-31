// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);

// Заполняем ячейки таблицы значениями из URL
document.getElementById('washedDate').textContent = urlParams.get('washedDate') || '';
document.getElementById('desiredDate').textContent = urlParams.get('desiredDate') || '';
document.getElementById('phoneNumber').textContent = urlParams.get('phoneNumber') || '';
document.getElementById('address').textContent = urlParams.get('address') || '';
document.getElementById('surface').textContent = urlParams.get('surface') || '';
const priceParam = urlParams.get('price');
const price = priceParam ? parseFloat(priceParam).toFixed(2) : '0.00';
document.getElementById('price').textContent = price;

document.getElementById('code').textContent = urlParams.get('code') || '';

// Событие на кнопку "Փոխել օրը"
document.getElementById('choisDateButton').addEventListener('click', () => {
    const desiredDate = document.getElementById('desiredDate').textContent;
    const newDateInput = document.getElementById('newDate');

    // Показываем поле выбора даты и устанавливаем текущее значение
    newDateInput.value = desiredDate; // Устанавливаем значение из таблицы
    newDateInput.style.display = 'inline'; // Показываем поле
});

// Событие на кнопку "Հաստատել պայմանավերվածությունը"
document.getElementById('confirmButton').addEventListener('click', () => {
    const newDate = document.getElementById('newDate').value;
    const code = document.getElementById('code').textContent;
    const startTime = document.getElementById('startDeliveryTime').value; // Получаем значение времени начала
    const endTime = document.getElementById('endDeliveryTime').value; // Получаем значение времени окончания

    if (newDate && startTime && endTime) {
        // Отправка JSON на сервер
        const jsonData = {
            desiredDate: newDate,
            code: code,
            startTime: startTime, // Время начала
            endTime: endTime      // Время окончания
        };

        const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        const comand = '/changeTheCarpetStatusToDelivery';
        const url = `http://${host}:${port}${comand}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            window.location.href = '../WashedCarpets.html';

        })
    
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Խնդրում եմ ընտրեք ամսաթիվը և ժամերը:');
    }
});
