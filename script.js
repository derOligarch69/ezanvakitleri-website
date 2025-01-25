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

        // Zeige die Gebetszeiten auf der Seite an, in horizontaler Reihenfolge
        const timeContainer = document.createElement('div');
        timeContainer.style.display = 'flex';
        timeContainer.style.flexWrap = 'wrap';
        timeContainer.style.justifyContent = 'space-around';
        timeContainer.style.marginTop = '20px';

        Object.entries(timings).forEach(([prayer, time]) => {
            const timeBox = document.createElement('div');
            timeBox.style.background = 'rgba(255, 255, 255, 0.2)';
            timeBox.style.padding = '10px';
            timeBox.style.margin = '5px';
            timeBox.style.borderRadius = '5px';
            timeBox.style.fontSize = '1.2rem';
            timeBox.style.color = 'white';
            timeBox.style.flex = '1 1 30%'; // Jeder Block nimmt mindestens 30% der Breite ein (bei mehr Platz verteilt es sich)
            timeBox.style.textAlign = 'center';
            timeBox.textContent = `${prayer}: ${time}`;

            timeContainer.appendChild(timeBox);
        });

        list.appendChild(timeContainer);

    } catch (error) {
        console.error(error);
        alert('Fehler beim Abrufen der Gebetszeiten.');
    }
});
