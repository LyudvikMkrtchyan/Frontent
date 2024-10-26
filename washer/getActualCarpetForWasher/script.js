document.addEventListener("DOMContentLoaded", function() {
    // Получаем workerId из localStorage
    const workerId = localStorage.getItem('userId');
    
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    comand = '/getActualCarpetForWasher'
    const url = `http://${host}:${port}${comand}`;
    fetch(url, {
        method: "POST", // Изменяем метод на POST
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ washerId: parseInt(workerId) }) // Отправляем workerId в теле запроса как integer
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        // Проверяем, получили ли мы данные
        if (data && Object.keys(data).length > 0) {
            // Отображаем данные о ковре
            document.getElementById("carpetCode").textContent = data.code || "Не указано";
            document.getElementById("carpetSurface").textContent = data.surface || "Не указано";
            document.getElementById("noCarpetsMessage").style.display = "none"; // Скрываем сообщение о том, что ковров нет
        } else {
            alert("Այս պահին լվացվող խալի չկա"); // Если данных нет
        }
    })
    .catch(error => {
        console.error("Ошибка при получении данных:", error);
    });

    // Добавляем обработчик для кнопки
    document.getElementById("washButton").addEventListener("click", function() {
        const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        comand = '/theCarpetIsWashed'
        const url = `http://${host}:${port}${comand}`;
        fetch(url, {
            method: "POST", // Изменяем метод на POST
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                washerId: parseInt(workerId),
                code: document.getElementById("carpetCode").textContent,
                surface: parseFloat(document.getElementById("carpetSurface").textContent)

            }) 
        })
        window.location.href = '../washerMain.html'; // 
    });
});
