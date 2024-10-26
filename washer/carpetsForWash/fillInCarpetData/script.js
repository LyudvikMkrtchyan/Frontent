document.addEventListener("DOMContentLoaded", function() {
    


    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    console.log("Код из URL:", code); // Отладочная строка

    // Проверка на null
    if (code === null) {
        alert("Код отсутствует в URL!"); // Сообщение об отсутствии кода
        return; // Останавливаем дальнейшее выполнение
    }

    // Устанавливаем значение кода в поле ввода
    document.getElementById("code").value = code;

    // Добавляем обработчик для кнопки подтверждения
    document.getElementById("confirmButton").addEventListener("click", function() {
        const length = parseFloat(document.getElementById("length").value); // Преобразуем в число с плавающей запятой
        const width = parseFloat(document.getElementById("width").value);

        // Проверяем, заполнены ли все поля
        if (length && width) {
            // Рассчитываем площадь
            const surface = length * width;

            const workerId = parseInt(localStorage.getItem('userId'));
            const data = {
                workerId : workerId,
                code: code,
                surface: surface
            };

            const host = localStorage.getItem('host');
            const port = localStorage.getItem('port');
            comand = '/setCarpetParametrFromWasher'
            const url = `http://${host}:${port}${comand}`;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                window.location.href = '../../washerMain.html'
                if (!response.ok) {
                    throw new Error("Сетевая ошибка: ответ не ок");
                }
                return response.json();
            })
            .then(data => {
                console.log("Успех:", data);
                alert("Параметры ковра успешно установлены!");
            })
            .catch(error => {
                console.error("Проблема с операцией fetch:", error);
            }); 

        } else {
            alert("Пожалуйста, заполните все поля!");
        }
    });
});

