

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', async () => {

        const date = document.getElementById('datePicker').value;

        if (!date) {
            alert('Խնդրում ենք ընտրել ամսաթիվ:');
            return;
        }

        try {
            const endpoint = 'getHeavyBurden';

            const response = await fetch(`http://localhost:9091/getHeavyBurden`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data); // Проверка полученных данных
            populateTable(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
    document.getElementById('ConfirmBtn').addEventListener('click', async () => {
        console.log('ok')
        const date = document.getElementById('datePicker').value;
        const queryParams = getQueryParams();
        if (!date) {
            alert('Խնդրում ենք լրացնել բոլոր դաշտերը:');
            return;
        }
        try {
            const host = localStorage.getItem('host');
            const port = localStorage.getItem('port');
            comand = '/addCarpet'
            const url = `http://${host}:${port}${comand}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: localStorage.getItem('userId'),
                    date: date,
                    address: queryParams.address,
                    entrance: queryParams.entrance,
                    floor: queryParams.floor,
                    flat: queryParams.flat,
                    phoneNumber: queryParams.phone,
                    code : queryParams.code,
                    location: queryParams.location
               
                }),
            });

            window.location.href = '../../managerMain.html'
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

});

function populateTable(data) {
    const tbody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Очистить предыдущие данные

    data.forEach(item => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = item.date;
        row.insertCell(1).textContent = item.count;
    });
}
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        address: params.get('address'),
        entrance: params.get('entrance'),
        floor: params.get('floor'),
        flat: params.get('flat'),
        phone: params.get('phone'),
        count: params.get('count'),
        code: params.get('code'),

        location: params.get('location')
    };
  
}