document.addEventListener("DOMContentLoaded", () => {
    const carpetsTableBody = document.getElementById("carpetsTable").getElementsByTagName("tbody")[0];
    const workerSelect = document.getElementById("workerSelect");
    const confirmButton = document.getElementById("confirmButton");

    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    
    // Функция для загрузки данных ковров и работников
    function loadCarpetsAndWorkers() {
        const url = `http://${host}:${port}/getCarpetsReadyForDelivery`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Заполняем выпадающий список работников
                const workers = data.worker; // Исправлено на data.worker
                workers.forEach(worker => {
                    const option = document.createElement("option");
                    option.value = worker.id;
                    option.textContent = worker.name;
                    workerSelect.appendChild(option);
                });

                // Заполняем таблицу ковров
                const carpets = data.carpet; // Исправлено на data.carpet
                carpets.forEach(carpet => {
                    const row = carpetsTableBody.insertRow();
                    
                    // Добавляем чекбокс
                    const selectCell = row.insertCell();
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.classList.add("carpetCheckbox");
                    checkbox.value = carpet.code;
                    selectCell.appendChild(checkbox);

                    // Заполняем остальные ячейки таблицы
                    row.insertCell().textContent = carpet.wash_date;
                    row.insertCell().textContent = carpet.desired_date;
                    row.insertCell().textContent = carpet.delivery_time_min;
                    row.insertCell().textContent = carpet.delivery_time_max;
                    row.insertCell().textContent = carpet.surface;
                    row.insertCell().textContent = carpet.price;
                    row.insertCell().textContent = carpet.code;
                });
            })
            .catch(error => console.error("Error:", error));
    }

    // Обработчик нажатия на кнопку "Հաստատել"
    confirmButton.addEventListener("click", () => {
        const selectedCodes = [];
        document.querySelectorAll(".carpetCheckbox:checked").forEach(checkbox => {
            selectedCodes.push(checkbox.value);
        });

        const selectedWorker = workerSelect.value;

        if (selectedCodes.length === 0 || !selectedWorker) {
            alert("Խնդրում եմ ընտրեք գորգերը և աշխատակցին:");
            return;
        }

        const jsonData = {
            codes: selectedCodes,
            worker: parseInt(selectedWorker, 10)
        };

        const url = `http://${host}:${port}/setCarpetsCourier`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            location.reload();
            return response.json();
        })
        .then(data => {
            console.log("Success:", data);
            alert("Կտավների առաքումը հաջողությամբ կատարվեց!");
        })
        .catch(error => console.error("Error:", error));
    });

    // Загружаем данные при загрузке страницы
    loadCarpetsAndWorkers();
});
