function getWeather() {
    const apiKey = 'c2afeafd15a6fbeb154c56a78bd0fdc6'; 
    const city = document.getElementById('cityInput').value;

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherIcon = data.weather[0].icon;
    const weatherDescription = data.weather[0].description;
    const backgroundImage = getBackgroundImage(weatherDescription);

    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} &#8451;</p>
        <p>Weather: ${weatherDescription}</p>
        <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
    `;

    document.body.style.backgroundImage = `url(${backgroundImage})`;
}

function getBackgroundImage(weatherDescription) {
    switch (weatherDescription.toLowerCase()) {
        case 'clear sky':
            return 'clear_sky.jpg'; 
        case 'few clouds':
        case 'scattered clouds':
        case 'broken clouds':
            return 'cloudy.jpg';
        case 'shower rain':
        case 'rain':
        case 'light rain':
            return 'rainy.jpg';
        case 'thunderstorm':
            return 'thunderstorm.jpg';
        case 'snow':
        case 'light snow':
            return 'snow.jpg';
        case 'mist':
            return 'mist.jpg';
        case 'fog':
            return 'fog.jpg';
        case 'haze':
            return 'haze.jpg';
            case 'overcast clouds':
            return 'overcast.jpg'; 
        case 'sand':
        case 'dust':
            return 'sandstorm.jpg';
        default:
            return 'background.jpg';
    }
}



