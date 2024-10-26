document.getElementById('nextButton').addEventListener('click', () => {
    console.log('hello');

    const address = document.getElementById('address').value;
    const entrance = document.getElementById('entrance').value;
    const floor = document.getElementById('floor').value;
    const flat = document.getElementById('flat').value;
    const phone = document.getElementById('phone').value;
    const dateOfRecipte = document.getElementById('dateOfRecipte').value;
    const timeOfRecipte = document.getElementById('timeOfRecipte').value;
    const count = parseInt(document.getElementById('count').value, 10);
    const code = document.getElementById('code').value;
    const location = document.getElementById('location').value;

    // Проверяем, что все поля заполнены
    if (address && entrance && floor && flat && phone && dateOfRecipte && timeOfRecipte && count && code) {
        // Формируем URL для перехода на новую страницу
        const url = `./choisDeliveriData/choisDeliverData.html?address=${encodeURIComponent(address)}&entrance=${encodeURIComponent(entrance)}&floor=${encodeURIComponent(floor)}&flat=${encodeURIComponent(flat)}&phone=${encodeURIComponent(phone)}&dateOfRecipte=${encodeURIComponent(dateOfRecipte)}&timeOfRecipte=${encodeURIComponent(timeOfRecipte)}&count=${encodeURIComponent(count)}&code=${encodeURIComponent(code)}&location=${encodeURIComponent(location)}`;
        
        window.location.href = url;
    } else {
        alert('Խնդրում ենք լրացնել բոլոր դաշտերը:');
    }
});



    