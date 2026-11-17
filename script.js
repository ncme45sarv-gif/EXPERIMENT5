async function getWeather() {

    let city = document.getElementById("city").value;
    let result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    try {

        let response = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) + "&count=1"
        );

        let data = await response.json();

        if (!data.results) {
            result.innerHTML = "City not found";
            return;
        }

        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;

        let weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        let weather = await weatherResponse.json();

        result.innerHTML = `
            <h2>${data.results[0].name}</h2>
            <p>Temperature: ${weather.current.temperature_2m} °C</p>
            <p>Humidity: ${weather.current.relative_humidity_2m}%</p>
            <p>Wind Speed: ${weather.current.wind_speed_10m} km/h</p>
        `;

    } catch (error) {
        result.innerHTML = "Unable to fetch weather data";
    }
}