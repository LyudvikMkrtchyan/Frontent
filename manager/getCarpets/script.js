document.addEventListener("DOMContentLoaded", function() {
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    comand = '/getCarpets'
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
            row.insertCell(0).textContent = carpet.address;  
            row.insertCell(1).textContent = carpet.phoneNumber;
            row.insertCell(2).textContent = carpet.pickupDate; // Վերցնելու ամսաթիվ
            row.insertCell(3).textContent = carpet.desiredDate; // տալու ամսաթիվ
            row.insertCell(4).textContent = changeStatus(carpet.status); 
            row.insertCell(5).textContent = carpet.code; // կարգավիճակ

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
});
function changeStatus(status){
    switch (status) {
        case 'readyToTake':
            return 'պատրաստ է վերցնելու'
        case 'dirty':
            return 'կեղտոտ'
        case 'clean':
            return 'լվացած'

        case 'InDelivery':
            return 'առաքման մեջ է'
        case 'delivered':
            return 'առաքված է';
        

       
    }
}

