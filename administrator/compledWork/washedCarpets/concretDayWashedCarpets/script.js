document.addEventListener("DOMContentLoaded", function() {
    // Извлечение даты из URL
    const urlParams = new URLSearchParams(window.location.search);
    const washDate = urlParams.get("ամսաթիվ");

    // Устанавливаем дату в метку
    document.getElementById("washDateLabel").textContent = washDate;

    // URL для запроса к бэкенду
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    const command = '/getConcretDayWashedCarpets';
    const url = `http://${host}:${port}${command}`;

    // Запрос к серверу с датой
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ washDate }) // Отправляем дату как параметр
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        const tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";

        // Заполнение таблицы данными из JSON
        data.date.forEach(item => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = item.code;
            row.insertCell(1).textContent = item.price.toFixed(2);
            row.insertCell(2).textContent = item.surface.toFixed(2);

            row.addEventListener('dblclick', () => {
                const id = item.id || ''; 
                window.location.href = `./viewFullInfoCarpet/viewFullInfoCarpet.html?id=${id}`;
            });
        });

        // Заполнение итоговых данных
        document.getElementById('totalCount').textContent = data.totalCount;
        document.getElementById('totalSurface').textContent = data.totalSurface.toFixed(2);
        document.getElementById('totalPrice').textContent = data.totalPrice.toFixed(2);
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
});
