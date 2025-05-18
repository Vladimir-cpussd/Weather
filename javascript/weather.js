document.addEventListener('DOMContentLoaded', function() {
    
    const API_KEY = '076bb67390eb8137634168bb1f701a02';
    const CITY = 'Moscow';
    
    
    const weatherDataElement = document.getElementById('weatherData');
    

    async function fetchWeather() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=ru&appid=${API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error('Не удалось получить данные о погоде');
            }
            
            const data = await response.json();
            displayWeather(data);
            setBackgroundByWeather(data);
        } catch (error) {
            weatherDataElement.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
            setDefaultBackground();
        }
    }
    
  
    function displayWeather(data) {
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const windSpeed = data.wind.speed;
        
        weatherDataElement.innerHTML = `
            <div class="weather-info">
                <p><strong>Температура:</strong> ${temp}°C</p>
                <p><strong>Погода:</strong> ${description}</p>
                <p><strong>Ветер:</strong> ${windSpeed} м/с</p>
            </div>
        `;
    }
    
    
    function setBackgroundByWeather(data) {
        const weatherMain = data.weather[0].main.toLowerCase();
        const weatherDescription = data.weather[0].description.toLowerCase();
        const body = document.body;
        
       
        body.className = '';
        
        
        if (weatherMain.includes('местами дождь') || weatherDescription.includes('дождь') || weatherMain.includes('небольшой дождь')) {
            body.classList.add('weather-rainy');
        } 
        else if (weatherMain.includes('местами облачно') || weatherDescription.includes('облачно') || weatherDescription.includes('пасмурно')) {
            body.classList.add('weather-cloudy');
        }
        else if ( weatherDescription.includes('ясно') || weatherDescription.includes('солнечно')) {
            body.classList.add('weather-sunny');
        }
        else if (weatherMain.includes('снежная буря') || weatherDescription.includes('снег')) {
            body.classList.add('weather-snowy');
        }
        else {
            setDefaultBackground();
        }
    }
    
   
    function setDefaultBackground() {
        document.body.className = 'weather-default';
    }
    
    
    fetchWeather();
    
    
    const style = document.createElement('style');
    style.textContent = `
        body {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            transition: background-image 0.5s ease;
        }
        .weather-default {
            background-image: url('../main.jpg');
        }
        .weather-sunny {
            background-image: url('../weather_images/sunny.jpg');
        }
        .weather-cloudy {
            background-image: url('../weather_images/cloudy.jpg');
        }
        .weather-rainy {
            background-image: url('../weather_images/rain.jpg');
        }
        .weather-snowy {
            background-image: url('../weather_images/snow.jpg');
        }
    `;
    document.head.appendChild(style);
});