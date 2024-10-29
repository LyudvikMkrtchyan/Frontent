document.addEventListener("DOMContentLoaded", function() {
    // Получаем параметры из URL
    renderCalendar()
    const urlParams = new URLSearchParams(window.location.search);
    const code = parseInt(urlParams.get('code'), 10);

    // Проверяем, существует ли id
    if (!code) {
        console.error("ID не найден в URL");
        return;
    }

    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    comand = '/getCarpetInfo'
    const url = `http://${host}:${port}${comand}`;
    console.log(url)
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code: code // Передаем id в тело запроса
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            // Здесь предполагается, что данные возвращаются в виде объекта, а не массива
            document.getElementById('address').value = data.address;
            document.getElementById('entrance').value = data.entrance;
            document.getElementById('phone_number').value = data.phone_number;
            document.getElementById('floor').value = data.floor;
            document.getElementById('flat').value = data.flat;
            document.getElementById('pickup_date').value = data.pickup_date;
            document.getElementById('id_delivery_to_washing').value = data.id_delivery_to_washing;
            document.getElementById('id_delivery_to_home').value = data.id_delivery_to_home;
            document.getElementById('wash_date').value = data.wash_date;
            document.getElementById('delivery_date').value = data.delivery_date;
            document.getElementById('washer').value = data.washer;
            document.getElementById('price').value = data.price;
            document.getElementById('status').value = data.status;
            document.getElementById('code').value = data.code;
            document.getElementById('desired_date').value = data.desired_date;
            document.getElementById('location').value = data.location;
            document.getElementById('surface').value = data.surface;
        }
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
});

function renderCalendar() {
    const calendarElement = document.getElementById("calendar");
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Определяем день недели и отмечаем текущий день недели красным
    const dayOfWeek = today.getDay();
    const dayElements = document.querySelectorAll(".day");
    if (dayElements[dayOfWeek]) {
        dayElements[dayOfWeek].classList.add("current-day");
    }

    // Удаляем старые даты, если они есть
    const oldDates = document.querySelectorAll(".date");
    oldDates.forEach(date => date.remove());

    // Первая дата месяца и день недели для неё
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Добавление пустых ячеек для выравнивания календаря
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("date");
        calendarElement.appendChild(emptyCell);
    }

    // Заполнение числами месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        dayElement.classList.add("date");

        // Проверка, является ли дата сегодняшней
        if (day === today.getDate()) {
            dayElement.classList.add("today");
        }

        calendarElement.appendChild(dayElement);
    }
}

document.getElementById('saveButton').disabled = true; // Отключаем кнопку по умолчанию

document.getElementById('editButton').addEventListener('click', function () {
    // Активируем поля (добавьте нужные поля)
    const fields = ['address', 'phone_number', 'entrance','floor', 'flat'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.disabled = !field.disabled;
        if (!field.disabled) {
            field.focus();
        }
    });
    
    // Активируем кнопку "Հաստատել փոփոխությունը"
    document.getElementById('saveButton').disabled = false;
});

document.getElementById('saveButton').addEventListener('click', async function () {
    const address = document.getElementById('address').value;
    const entrance = document.getElementById('entrance').value;
    const floor = document.getElementById('floor').value;
    const flat = document.getElementById('flat').value;
    const phoneNumber = document.getElementById('phone_number').value;
    const code = document.getElementById('code').value;

    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    const command = '/changeCarpetInfo';
    const url = `http://${host}:${port}${command}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: address,
                entrance: entrance,
                floor: floor,
                code: code,
                flat: flat,
                phoneNumber: phoneNumber,
            }),
        });

        if (response.ok) {
            location.reload()
        } else {
            console.error('Ошибка при обновлении данных');
        }
    } catch (error) {
        console.error('Произошла ошибка при отправке запроса:', error);
    }
});

