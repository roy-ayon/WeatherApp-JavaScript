//element
const temp = document.getElementById('temp');
const cityName = document.getElementById('city');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const cityInput = document.getElementById('cityInput');
const tempImg = document.getElementById('tempImg');
const pressure = document.getElementById('pressure');
const temMax = document.getElementById('temMax');
const temMin = document.getElementById('temMin');



//connect Api
const apiKey = "074de844f70ee2abddf53d91c5be94fe";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather(city) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weatherInfo').style.display = "none";

    } else {
        var data = await response.json();

        temp.innerText = Math.round(data.main.temp) + '°C';
        cityName.innerText = data.name;
        humidity.innerText = data.main.humidity + '%';
        windSpeed.innerText = data.wind.speed + 'km/h';
        pressure.innerText = data.main.pressure + 'mb';
        temMax.innerText = `Max: ${Math.round(data.main.temp_max)}°C`;
        temMin.innerText = `Min: ${Math.round(data.main.temp_min)}°C`;

        if (data.weather[0].main == "Clear") {
            tempImg.src = "images/clear.png";
        } else if (data.weather[0].main == "Haze") {
            tempImg.src = "images/haze.png"
        } else if (data.weather[0].main == "Clouds") {
            tempImg.src = "images/clouds.png"
        } else if (data.weather[0].main == "Drizzle") {
            tempImg.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            tempImg.src = "images/mist.gif";
        } else if (data.weather[0].main == "Rain") {
            tempImg.src = "images/rain.png"
        } else if (data.weather[0].main == "Snow") {
            tempImg.src = "images/snow.png";
        } else if (data.weather[0].main == "Fog") {
            tempImg.src = "images/fog.png";
        }
        document.querySelector('.weatherInfo').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }
};

checkWeather("Dhaka");
cityInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        checkWeather(cityInput.value);
        cityInput.value = "";
    }
})


