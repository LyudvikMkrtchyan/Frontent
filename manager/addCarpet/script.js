document.getElementById('nextButton').addEventListener('click', () => {
    console.log('hello');

    const address = document.getElementById('address').value;
    const entrance = document.getElementById('entrance').value;
    const floor = document.getElementById('floor').value;
    const flat = document.getElementById('flat').value;
    const phone = document.getElementById('phone_number').value; // Изменено на phone_number
    const location = document.getElementById('location').value;
    const code = document.getElementById('code').value;



    // Проверяем, что все поля заполнены
    if (address && entrance && floor && flat && phone && location) {
        // Формируем URL для перехода на новую страницу
        const url = `./choisDate/choisDate.html?address=${encodeURIComponent(address)}&entrance=${encodeURIComponent(entrance)}&floor=${encodeURIComponent(floor)}&flat=${encodeURIComponent(flat)}&phone=${encodeURIComponent(phone)}&location=${encodeURIComponent(location)}&code=${encodeURIComponent(code)}`;
        
        window.location.href = url;
    } else {
        alert('Խնդրում ենք լրացնել բոլոր դաշտերը:');
    }
});
