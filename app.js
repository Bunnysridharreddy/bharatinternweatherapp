const apiKey = '6a43606b8fae78714a43d922be91b474';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            updateWeatherUI(data);
        } else {
            showError(data.message);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Failed to fetch weather data');
    }
}

function updateWeatherUI(data) {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const iconElement = document.getElementById('icon');

    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    iconElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    clearError();
}

function showError(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
}

function clearError() {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';
}

const defaultCity = 'VISAKHAPATNAM';
getWeather(defaultCity);

