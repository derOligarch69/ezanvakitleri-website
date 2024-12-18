document.getElementById('fetchTimes').addEventListener('click', async () => {
    const city = document.getElementById('postalCode').value.trim();

    if (!city) {
        alert('Bitte geben Sie eine Stadt ein!');
        return;
    }

    const diyanetUrl = `https://namazvakitleri.diyanet.gov.tr/en-US/${city}`;

    try {
        const response = await fetch(diyanetUrl);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const timings = Array.from(doc.querySelectorAll('.prayerTimesList tr')).map(row => {
            const columns = row.querySelectorAll('td');
            return {
                prayer: columns[0]?.textContent.trim(),
                time: columns[1]?.textContent.trim()
            };
        });

        const list = document.getElementById('timesList');
        list.innerHTML = ''; // Liste zurücksetzen

        timings.forEach(({ prayer, time }) => {
            const li = document.createElement('li');
            li.textContent = `${prayer}: ${time}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        alert('Fehler beim Abrufen der Gebetszeiten.');
    }
});
