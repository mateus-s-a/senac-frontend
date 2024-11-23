document.getElementById("search").addEventListener("click", () => {
    const city = document.getElementById("city").value;
    const api_key = '29a6bdb336d558ba6689fee591ca3355';
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.current) {
                document.getElementById("weather-info").innerHTML = `
                    <h2>${data.location.name}</h2>
                    <p>Temperatura: ${data.current.temperature}°C</p>
                    <p>Condições: ${data.current.weather_descriptions[0]}</p>
                    <p>Vento: ${data.current.wind_speed} km/h</p>
                `;
            } else {
                document.getElementById("weather-info").innerHTML = "Cidade não encontrada.";
            }
        })
        .catch(error => console.error("Erro:", error));
})