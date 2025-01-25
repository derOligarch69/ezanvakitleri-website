document.getElementById('fetchTimes').addEventListener('click', async () => {
    // Holen der Stadt vom Eingabefeld
    const city = document.getElementById('cityName').value.trim();
    const country = 'Germany'; // Du kannst das Land auch ändern, falls notwendig

    if (!city) {
        alert('Bitte geben Sie eine Stadt ein!');
        return;
    }

    // Die URL der Aladhan API
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;

    try {
        // API-Anfrage durchführen
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Überprüfen, ob die API-Antwort erfolgreich war
        if (data.code !== 200) {
            throw new Error('Fehler beim Abrufen der Gebetszeiten');
        }

        // Gebetszeiten aus den API-Daten extrahieren
        const timings = data.data.timings;

        // Die Gebetszeiten im HTML anzeigen
        const list = document.getElementById('timesList');
        list.innerHTML = ''; // Liste zurücksetzen

        // Zeige die Gebetszeiten auf der Seite an
        Object.entries(timings).forEach(([prayer, time]) => {
            const li = document.createElement('li');
            li.textContent = `${prayer}: ${time}`;
            list.appendChild(li);
        });

    } catch (error) {
        console.error(error);
        alert('Fehler beim Abrufen der Gebetszeiten.');
    }
});
