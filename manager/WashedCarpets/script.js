document.addEventListener("DOMContentLoaded", function() {
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    const comand = '/getWashedCarpets'; // добавлено const для командной строки
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
            row.insertCell(0).textContent = carpet.washedDate;  
            row.insertCell(1).textContent = carpet.desiredDate;
            row.insertCell(2).textContent = carpet.phoneNumber; // Վերցնելու ամսաթիվ
            row.insertCell(3).textContent = carpet.address; // տալու ամսաթիվ
            row.insertCell(4).textContent = carpet.surface// 
            row.insertCell(5).textContent = carpet.price// 
            row.insertCell(6).textContent = carpet.code; // 

            // Добавляем обработчик двойного нажатия
            row.addEventListener('dblclick', () => {
                const params = new URLSearchParams({
                    washedDate : carpet.washedDate,
                    desiredDate: carpet.desiredDate,
                    phoneNumber: carpet.phoneNumber,
                    address: carpet.address,
                    surface: carpet.surface,
                    price: carpet.price,
                    code: carpet.code
                });
                
                window.location.href = `./CallTheCustomerForDelivery/CallTheCustomerForDelivery.html?${params.toString()}`;
            });
        });
    })
    .catch(error => {
        console.error("Ошибка при получении данных:", error);
    });
});