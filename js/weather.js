// =====================================
// KISAN SAKTHI - WEATHER PAGE
// =====================================

const BASE_URL = "http://localhost:8080";

const weatherContainer = document.getElementById("weatherContainer");
const districtInput = document.getElementById("districtInput");

// =====================================
// LOAD DEFAULT WEATHER
// =====================================

window.onload = function () {

    districtInput.value = "Warangal";

    searchWeather();

};

// =====================================
// SEARCH WEATHER
// =====================================

async function searchWeather() {

    const district = districtInput.value.trim();

    if (district === "") {

        alert("Please enter a district name.");

        return;

    }

    weatherContainer.innerHTML = `
        <div class="loading">
            Loading weather...
        </div>
    `;

    try {

        const response = await fetch(
            `${BASE_URL}/weather/${encodeURIComponent(district)}`
        );

        console.log("Status:", response.status);

        if (!response.ok) {

            throw new Error("Unable to fetch weather");

        }

        const weather = await response.json();

        console.log(weather);

        displayWeather(weather);

    }

    catch (error) {

        console.error(error);

        weatherContainer.innerHTML = `
            <div class="error">
                <h3>Weather information not available</h3>
                <p>Please check the district name.</p>
            </div>
        `;

    }

}

// =====================================
// DISPLAY WEATHER
// =====================================

function displayWeather(weather) {

    const iconUrl =
        `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    weatherContainer.innerHTML = `

        <div class="weather-card">

            <div class="weather-top">

                <h2>${weather.district}</h2>

                <img src="${iconUrl}" alt="Weather Icon">

                <h3>${Math.round(weather.temperature)}°C</h3>

                <p>${weather.description}</p>

            </div>

            <div class="details">

                <div class="detail-box">

                    <h4>🌡 Temperature</h4>

                    <span>${weather.temperature} °C</span>

                </div>

                <div class="detail-box">

                    <h4>🤗 Feels Like</h4>

                    <span>${weather.feelsLike} °C</span>

                </div>

                <div class="detail-box">

                    <h4>💧 Humidity</h4>

                    <span>${weather.humidity}%</span>

                </div>

                <div class="detail-box">

                    <h4>🌬 Wind Speed</h4>

                    <span>${weather.windSpeed} m/s</span>

                </div>

                <div class="detail-box">

                    <h4>🌅 Sunrise</h4>

                    <span>${weather.sunrise}</span>

                </div>

                <div class="detail-box">

                    <h4>🌇 Sunset</h4>

                    <span>${weather.sunset}</span>

                </div>

            </div>

        </div>

    `;

}

// =====================================
// ENTER KEY SUPPORT
// =====================================

districtInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchWeather();

    }

});