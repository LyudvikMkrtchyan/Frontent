document.addEventListener("DOMContentLoaded", function() {
    const duringTimeInput = document.getElementById("duringTime");
    const priceNearbyInput = document.getElementById("priceNearby");
    const priceFarAwayInput = document.getElementById("priceFarAway");
    const updateButton = document.getElementById("updateButton");

    if (duringTimeInput) {
        // Fetch initial value from backend (/getOptions)
         const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        comand = '/getOptions'
        const url = `http://${host}:${port}${comand}`; 
        fetch(url)
            .then(response => response.json())
            .then(data => {
                duringTimeInput.value = data.during_time;
                priceNearbyInput.value = data.price_nearby;
                priceFarAwayInput.value = data.price_far_away;
                  // Убедитесь, что ключ правильный
                console.log(data);
            })
            .catch(error => console.error('Ошибка получения данных:', error));

        // Send updated value to backend (/updateOptions)
        updateButton.addEventListener("click", function() {
            const duringTimeValue = parseInt(duringTimeInput.value,10);
            const priceNearbyValue = parseInt(priceNearbyInput.value,10);
            const priceFarAwayValue = parseInt(priceFarAwayInput.value,10);
            
            const host = localStorage.getItem('host');
            const port = localStorage.getItem('port');
            comand = '/updateOptions'
            const url = `http://${host}:${port}${comand}`; 
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    during_time: duringTimeValue, 
                    price_nearby: priceNearbyValue,
                    price_far_away: priceFarAwayValue
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Ответ сервера:', data);
                alert('Չորանալու ժամանակը թարմացվեց:');
            })
            .catch(error => console.error('Ошибка отправки данных:', error));
        });
    } else {
        console.error('Элемент с ID "duringTime" не найден.');
    }
});

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = '../administratorMain.html'; // Укажите путь к странице для отображения всех пользователей
});

