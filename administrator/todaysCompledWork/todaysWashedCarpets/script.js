document.addEventListener("DOMContentLoaded", function() {
    const host = localStorage.getItem('host');
    const port = localStorage.getItem('port');
    const command = '/getTodayWashedCarpets';
    const url = `http://${host}:${port}${command}`;

    console.log(`Fetching data from: ${url}`);

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
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
            row.insertCell(0).textContent = item.code;
            row.insertCell(1).textContent = item.price;
            row.insertCell(2).textContent = item.surface;

            row.addEventListener('dblclick', () => {
                const id = item.id || ''; 
                window.location.href = `./viewFullInfoCarpet/viewFullInfoCarpet.html?id=${id}`;
            });
        });

        document.getElementById('totalCount').textContent = data.totalCount;
        document.getElementById('totalSurface').textContent = data.totalSurface;
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
});


