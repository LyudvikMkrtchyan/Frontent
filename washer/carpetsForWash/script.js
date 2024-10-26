document.addEventListener("DOMContentLoaded", function() {
    // Отправка запроса для получения списка ковров
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    comand = '/getCarpetsForWash'
    const url = `http://${host}:${port}${comand}`
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

        // Заполнение таблицы полученными данными
        data.forEach(carpet => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = carpet.washDate;  
            row.insertCell(1).textContent = carpet.address;
            row.insertCell(2).textContent = carpet.code;

            // Добавляем обработчик двойного нажатия на строку
            row.addEventListener('dblclick', () => {
                
                window.location.href = `./fillInCarpetData/fillInCarpetData.html?code=${carpet.code}`;
            });
        });

        // Добавляем логику для кнопки "լվանալ"
        const washButton = document.getElementById("washButton");
        const codeInput = document.getElementById("codeInput");

        washButton.addEventListener("click", function() {
            const enteredCode = codeInput.value.trim(); // Получаем введенный код

            if (!enteredCode) {
                alert("Խնդրում ենք մուտքագրել կոդը"); // Если код не введен
                return;
            }

            // Поиск введенного кода среди данных ковров
            let found = false;
            data.forEach(carpet => {
                if (carpet.code === enteredCode) {
                    found = true;
                    window.location.href = `./fillInCarpetData/fillInCarpetData.html?code=${carpet.code}`
                }
            });

            if (!found) {
                alert("Код не найден");
            }
        });
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
});
