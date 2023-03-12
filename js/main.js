const searchBtn = document.querySelector('#searchBtn'),
    searchItem = document.querySelector('#searchItem'),
    weatherError = document.querySelector('.weather-error'),
    weatherDetails = document.querySelector('.weather-details'),
    weatherImg = document.querySelector('.weather-details .image img'),
    weatherTemp = document.querySelector('.weather-details .temperature'),
    weatherCity = document.querySelector('.weather-details .city'),
    weatherDesc = document.querySelector('.weather-details .desc'),
    weatherHumidity = document.querySelector('.weather-details .humidity span'),
    weatherWind = document.querySelector('.weather-details .wind span');

searchBtn.addEventListener('click', getWeatherInfo);
searchItem.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        getWeatherInfo();
    }
    if (e.key === "Backspace") {
        weatherDetails.classList.remove('fade-in');
        weatherError.style.display = 'none';
    }
});

function getWeatherInfo() {
    const APIKey = 'f48cb0463b6bb8ee575b9764e0f84644',
        searchValue = searchItem.value;

    if (searchValue === '') {
        weatherError.classList.add('fade-in');
        weatherError.style.display = 'block';
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${APIKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === '404') {
                    weatherDetails.style.display = 'none';
                    weatherError.classList.add('fade-in');
                    weatherError.style.display = 'block';
                } else {
                    weatherError.style.display = 'none';
                    weatherDetails.style.display = 'block';
                    weatherError.classList.remove('fade-in');

                    switch (data.weather[0].main) {
                        case 'Clear':
                            weatherImg.src = 'img/clear.png';
                            break;

                        case 'Clouds':
                            weatherImg.src = 'img/clouds.png';
                            break;

                        case 'Clouds':
                            weatherImg.src = 'img/clouds.png';
                            break;

                        case 'Rain':
                            weatherImg.src = 'img/rain.png';
                            break;

                        case 'Snow':
                            weatherImg.src = 'img/snow.png';
                            break;

                        case 'Haze':
                            weatherImg.src = 'img/mist.png';
                            break;

                        case 'Mist':
                            weatherImg.src = 'img/mist.png';
                            break;

                        case 'Drizzle':
                            weatherImg.src = 'img/drizzle.png';
                            break;

                        case 'Wind':
                            weatherImg.src = 'img/wind.png';
                            break;

                        default:
                            weatherImg.src = '';
                    }

                    weatherTemp.innerHTML = `${parseInt(data.main.temp)}°C`;
                    weatherCity.innerHTML = data.name;
                    weatherDesc.innerHTML = data.weather[0].description;
                    weatherHumidity.innerHTML = `${data.main.humidity}%`;
                    weatherWind.innerHTML = `${data.wind.speed} km/h`;

                    weatherDetails.classList.add('fade-in');
                }
            });
    }
}
