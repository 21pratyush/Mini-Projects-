const apiKey = '4fddb469dc125636b60f546209216fdd';
const cityInput = document.getElementById('cityInput');
const clearInput = document.getElementById('clearInput');
const weatherDetails = document.getElementById('weatherDetails');

cityInput.addEventListener('input', toggleClearIcon);
clearInput.addEventListener('click', clearCityInput);
cityInput.addEventListener('keypress', fetchWeather);

function toggleClearIcon() {
    clearInput.style.display = cityInput.value.length > 0 ? 'block' : 'none';
}

function clearCityInput() {
    cityInput.value = '';
    clearInput.style.display = 'none';
    weatherDetails.style.display = 'none';
}

async function fetchWeather(event) {
    if (event.key === 'Enter') {
        const cityName = cityInput.value.trim();

        if (cityName) {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                // console.log(data) //checking the data is fetched or not
                if (response.ok) {
                    showWeatherDetails(data);
                } else {
                    showError(data.message);
                }
            } catch (error) {
                showError('An error occurred. Please try again later.');
            }
        } else {
            showError('Please enter a valid city name');
        }
    }
}

function showWeatherDetails(data) {
    const temperature = data.main.temp.toFixed(2);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed.toFixed(2);
    const description = data.weather[0].description;
    const country = data.sys.country;
    const dust = data.main.grnd_level; 
    const visibilityMiles = (data.visibility / 1609.34).toFixed(2); // Converting meters to miles 
    const sunriseTimestamp = data.sys.sunrise * 1000;
    const sunsetTimestamp = data.sys.sunset * 1000;
    const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString('en-US');
    const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString('en-US');

    const weatherDetails = document.getElementById('weatherDetails');
    weatherDetails.innerHTML = `
        <div class="weather-detail">
        <strong>Temperature:</strong> ${temperature} °C
        <i class="fas fa-thermometer-half temperature-icon"></i>
        </div>
        
        <div class="weather-detail">
        <strong>Humidity:</strong> ${humidity}%
        <i class="fas fa-tint humidity-icon"></i>
        </div>
        
        <div class="weather-detail">
        <strong>Wind Speed:</strong> ${windSpeed} m/s
        <i class="fas fa-wind wind-icon"></i>
        </div>
        
        <div class="weather-detail">
        <strong>Description:</strong> ${description}
        <i class="fas fa-cloud description-icon"></i>
        </div>
        
        <div class="weather-detail">
        <strong>Country:</strong> ${country}
        <i class="fas fa-flag country-icon"></i>
        </div>
        
        <div class="weather-detail">
        <strong>Dust Level:</strong> ${dust}
        <i class="fas fa-wind dust-icon"></i>
        </div>
        
        <div class="weather-detail">
        <strong>Visibility:</strong> ${visibilityMiles} mi
        <i class="fas fa-eye visibility-icon"></i>
        </div>
        
        <div class="weather-detail">
        <strong>Sunrise Time:</strong> ${sunriseTime}
        <i class="fas fa-sun sunrise-icon"></i>
        </div>
        
        <div class="weather-detail">
        <strong>Sunset Time:</strong> ${sunsetTime}
        <i class="fas fa-moon sunset-icon"></i>
        </div>
    `;

    weatherDetails.classList.add('show');
}

function showError(message) {
    weatherDetails.innerHTML = `<span class="error">${message}</span>`;
    weatherDetails.style.display = 'block';
}
