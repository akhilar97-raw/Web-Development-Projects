let apiKey = "c46cb75d9126f5b4d0800cf5909a31f2";

// 🌙 Dark Mode
function toggleMode() {
    document.body.classList.toggle("light");
}

// ⏳ Loader
function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
}
function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
}

// 🌦️ Get Weather
function getWeather() {
    let city = document.getElementById("city").value.trim();

    if (!city) {
        document.getElementById("result").innerHTML = "⚠️ Enter city";
        return;
    }

    fetchWeather(city);
}

// 🌍 Location Weather
function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(
        pos => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        () => document.getElementById("result").innerHTML = "❌ Location denied"
    );
}

// 🔥 Fetch by City
async function fetchWeather(city) {
    showLoader();

    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        let data = await res.json();

        if (data.cod !== 200) {
            document.getElementById("result").innerHTML = "❌ " + data.message;
            return;
        }

        displayWeather(data);
        getForecast(city);

    } catch {
        document.getElementById("result").innerHTML = "⚠️ Network Error";
    } finally {
        hideLoader();
    }
}

// 🔥 Fetch by Coordinates
async function fetchWeatherByCoords(lat, lon) {
    showLoader();

    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        let data = await res.json();

        if (data.cod !== 200) {
            document.getElementById("result").innerHTML = "❌ " + data.message;
            return;
        }

        displayWeather(data);
        getForecast(data.name);

    } catch {
        document.getElementById("result").innerHTML = "⚠️ Location Error";
    } finally {
        hideLoader();
    }
}

// 🌤️ Current Weather TABLE
function displayWeather(data) {
    let icon = data.weather?.[0]?.icon;

    document.getElementById("result").innerHTML = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">

        <table class="weather-table">
            <tr>
                <th>Property</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>🌡️ Temperature</td>
                <td>${data.main.temp}°C</td>
            </tr>
            <tr>
                <td>🌥️ Weather</td>
                <td>${data.weather[0].description}</td>
            </tr>
            <tr>
                <td>💧 Humidity</td>
                <td>${data.main.humidity}%</td>
            </tr>
        </table>
    `;
}

// 📅 Forecast TABLE
async function getForecast(city) {
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        let data = await res.json();

        if (data.cod !== "200") return;

        let html = `
            <h3>5-Day Forecast</h3>
            <table class="forecast-table">
                <tr>
                    <th>Date</th>
                    <th>Icon</th>
                    <th>Temperature</th>
                </tr>
        `;

        for (let i = 0; i < data.list.length; i += 8) {
            let item = data.list[i];

            html += `
                <tr>
                    <td>${item.dt_txt.split(" ")[0]}</td>
                    <td><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png"></td>
                    <td>${item.main.temp}°C</td>
                </tr>
            `;
        }

        html += `</table>`;

        document.getElementById("forecast").innerHTML = html;

    } catch {
        document.getElementById("forecast").innerHTML = "⚠️ Forecast Error";
    }
}
