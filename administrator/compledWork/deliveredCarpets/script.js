document.addEventListener("DOMContentLoaded", function() {
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    const command = '/getIntervalDeliveredCarpets';
    const url = `http://${host}:${port}${command}`;

    console.log(`Fetching data from: ${url}`);

    // Обработчик для кнопки "Ցույց տալ"
    document.getElementById("showDataButton").addEventListener("click", () => {
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        // Проверка на заполненность полей и корректность дат
        if (!startDate || !endDate) {
            alert("Пожалуйста, заполните оба поля для выбора даты.");
            return;
        }
        
        if (endDate < startDate) {
            alert("Дата окончания не может быть раньше даты начала.");
            return;
        }

        // Запрос к серверу с датами
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ startDate, endDate }) // Добавляем даты в JSON
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

            data.date.forEach(item => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = item.deliveryDate;
                row.insertCell(1).textContent = item.count;
                row.insertCell(2).textContent = item.totalSurface.toFixed(2);
                row.insertCell(3).textContent = item.totalPrice.toFixed(2);

                row.addEventListener('dblclick', () => {
                    const id = item.id || ''; 
                    window.location.href = `./viewFullInfoCarpet/viewFullInfoCarpet.html?id=${id}`;
                });
            });

            document.getElementById('totalCount').textContent = data.totalCount;
            document.getElementById('totalSurface').textContent = data.totalSurface.toFixed(2);
            document.getElementById('totalPrice').textContent = data.totalPrice.toFixed(2);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    });
});

