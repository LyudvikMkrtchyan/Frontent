document.addEventListener("DOMContentLoaded", function() {
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    const comand = '/getWashedCarpets';
    const url = `http://${host}:${port}${comand}`;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById("carpetsTable").getElementsByTagName("tbody")[0];
        tableBody.innerHTML = ""; // Очистка предыдущих данных

        data.forEach(carpet => {
            const row = tableBody.insertRow();
            
            // Добавляем чекбокс для выбора
            const selectCell = row.insertCell(0);
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = carpet.code; // Используем значение 'code' для чекбокса
            selectCell.appendChild(checkbox);

            row.insertCell(1).textContent = carpet.washedDate;  
            row.insertCell(2).textContent = carpet.desiredDate; // տալու ամսաթիվ
            row.insertCell(3).textContent = carpet.phoneNumber;
            row.insertCell(4).textContent = carpet.address; // Վերցնելու ամսաթիվ
            row.insertCell(5).textContent = carpet.surface; 
            row.insertCell(6).textContent = carpet.price; // կարգավիճակ
            row.insertCell(7).textContent = carpet.code; // Իդ

            // Добавляем обработчик двойного нажатия
            row.addEventListener('dblclick', () => {
                // Переходим на новую страницу с id
                window.location.href = `./viewFullInfoCarpet/viewFullInfoCarpet.html?id=${carpet.id}`;
            });
        });
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });

    // Обработчик для кнопки "Ավելացնել արաքման համար"
    // Обработчик для кнопки "Ավելացնել արաքման համար"
document.getElementById("addDelivery").addEventListener("click", function() {
    const selectedCodes = Array.from(document.querySelectorAll('#carpetsTable tbody input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value); // Получаем 'code' выбранных ковров
    const selectedDate = document.getElementById("date").value;
    const selectedTime = document.getElementById("time").value;

    if (selectedCodes.length === 0) {
        alert("Խնդրում ենք ընտրել գոնե մեկ խալին:");
        return;
    }

    // Формируем данные для отправки на сервер
    const dataToSend = {
        codes: selectedCodes,
        deliveryDate: selectedDate,
        deliveryTime: selectedTime
    };

    const comand = '/prepareCarpetForDelivery';
    const url = `http://${host}:${port}${comand}`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(result => {
        console.log("Response from server:", result);
        alert("Արքայությունները հաջողությամբ ավելացվեցին!");
        // Можно обновить таблицу или сделать что-то другое
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
    });

});
