document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("citySearch");
    const searchBtn = document.getElementById("searchBtn");
    const suggestionsBox = document.getElementById("searchSuggestions");

let searchTimeout = null;
let suggestionResults = [];

    const cityName = document.getElementById("cityName");
    const currentDate = document.getElementById("currentDate");
    const temperature = document.getElementById("temperature");
    const weatherIcon = document.getElementById("weatherIcon");
    const weatherCondition = document.getElementById("weatherCondition");
    const feelsLike = document.getElementById("feelsLike");

    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("windSpeed");
    const clouds = document.getElementById("clouds");
    const pressure = document.getElementById("pressure");

    const API_BASE = "backend/api";

    // Weather code descriptions
    function getWeatherInfo(code, isDay) {
        const weather = {
            0: ["Clear sky", isDay ? "☀️" : "🌙"],
            1: ["Mainly clear", "🌤️"],
            2: ["Partly cloudy", "⛅"],
            3: ["Overcast", "☁️"],
            45: ["Fog", "🌫️"],
            48: ["Depositing rime fog", "🌫️"],
            51: ["Light drizzle", "��️"],
            53: ["Moderate drizzle", "🌦️"],
            55: ["Dense drizzle", "🌧️"],
            61: ["Slight rain", "🌧️"],
            63: ["Moderate rain", "🌧️"],
            65: ["Heavy rain", "🌧️"],
            71: ["Slight snowfall", "🌨️"],
            73: ["Moderate snowfall", "🌨️"],
            75: ["Heavy snowfall", "❄️"],
            80: ["Rain showers", "🌦️"],
            81: ["Moderate showers", "🌧️"],
            82: ["Violent rain showers", "⛈️"],
            95: ["Thunderstorm", "⛈️"],
            96: ["Thunderstorm with hail", "⛈️"],
            99: ["Heavy thunderstorm", "⛈️"]
        };

        return weather[code] || ["Unknown", "🌡️"];
    }

    // Change background based on weather
    function updateWeatherBackground(code) {
        const body = document.body;
        const effect = document.getElementById("weatherEffect");
    
        body.classList.remove(
            "weather-sunny",
            "weather-cloudy",
            "weather-rainy",
            "weather-stormy",
            "weather-snowy"
        );
    
        if (code === 0 || code === 1) {
            body.classList.add("weather-sunny");
        }
        else if ([2, 3, 45, 48].includes(code)) {
            body.classList.add("weather-cloudy");
        }
        else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81].includes(code)) {
            body.classList.add("weather-rainy");
        }
        else if ([71, 73, 75, 77, 85, 86].includes(code)) {
            body.classList.add("weather-snowy");
        }
        else if ([82, 95, 96, 99].includes(code)) {
            body.classList.add("weather-stormy");
        }
    
        if (!effect) return;
    
        if ([71, 73, 75, 77, 85, 86].includes(code)) {
            createSnowEffect();
        }
        else if ([95, 96, 99].includes(code)) {
            createRainEffect();
            createLightningEffect();
        }
        else if (
            (code >= 51 && code <= 67) ||
            (code >= 80 && code <= 82)
        ) {
            createRainEffect();
        }
        else {
            effect.innerHTML = "";
        }
    }

function createRainEffect() {
    const effect = document.getElementById("weatherEffect");

    if (!effect) return;

    effect.innerHTML = "";

    for (let i = 0; i < 100; i++) {
        const drop = document.createElement("span");

        drop.className = "raindrop";
        drop.style.left = Math.random() * 100 + "%";
        drop.style.animationDuration = (0.5 + Math.random()) + "s";
        drop.style.animationDelay = Math.random() * 2 + "s";

        effect.appendChild(drop);
    }
}
   // Create Snow Effect
function createSnowEffect() {
    const effect = document.getElementById("weatherEffect");

    if (!effect) return;

    effect.innerHTML = "";

    for (let i = 0; i < 100; i++) {
        const snow = document.createElement("span");

        snow.className = "snowflake";
        snow.innerHTML = "❄";

        snow.style.left = Math.random() * 100 + "%";
        snow.style.fontSize = (8 + Math.random() * 12) + "px";
        snow.style.animationDuration = (4 + Math.random() * 6) + "s";
        snow.style.animationDelay = Math.random() * 5 + "s";

        effect.appendChild(snow);
    }
}

   // Create Lightning Effect
function createLightningEffect() {
    const effect = document.getElementById("weatherEffect");

    if (!effect) return;

    // Prevent duplicate lightning elements
    if (effect.querySelector(".lightning-flash")) return;

    const flash = document.createElement("span");
    flash.className = "lightning-flash";

    effect.appendChild(flash);
}
    // Toast notification
    function showMessage(message) {
        let toast = document.getElementById("weatherToast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "weatherToast";
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.className = "weather-toast show";

        clearTimeout(window.toastTimeout);

        window.toastTimeout = setTimeout(() => {
            toast.className = "weather-toast";
        }, 3000);
    }

    // Update current date
    function updateDate(timezone) {
        const now = new Date();

        currentDate.textContent = now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: timezone || undefined
        });
    }
    // Update hourly forecast
function updateHourlyForecast(hourly, currentTime) {
    const container = document.getElementById("hourlyForecast");

    if (!container || !hourly || !hourly.time) return;

    // Find current hour
    let startIndex = hourly.time.findIndex(time => time >= currentTime);

    if (startIndex === -1) startIndex = 0;

    const forecastHTML = [];

    for (let i = startIndex; i < Math.min(startIndex + 24, hourly.time.length); i++) {
        const time = hourly.time[i];
        const temperature = Math.round(hourly.temperature_2m[i]);
        const code = hourly.weather_code[i];
        const isDay = hourly.is_day[i];

        const [condition, icon] = getWeatherInfo(code, isDay);

        let label = "Now";

        if (i !== startIndex) {
            const hour = parseInt(time.split("T")[1].split(":")[0]);
            const suffix = hour >= 12 ? "PM" : "AM";
            const displayHour = hour % 12 || 12;

            label = `${displayHour} ${suffix}`;
        }

        forecastHTML.push(`
            <div class="forecast-card" title="${condition}">
                <p>${label}</p>
                <span>${icon}</span>
                <h3>${temperature}°</h3>
            </div>
        `);
    }

    container.innerHTML = forecastHTML.join("");
}

       // Update 7-day forecast
function updateWeeklyForecast(daily) {
    const container = document.getElementById("weeklyForecast");

    if (!container || !daily || !daily.time) return;

    const forecastHTML = [];

    for (let i = 0; i < daily.time.length; i++) {
        const date = new Date(`${daily.time[i]}T12:00:00`);

        const day = i === 0
            ? "Today"
            : date.toLocaleDateString("en-US", {
                weekday: "short"
            });

        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);

        const [condition, icon] = getWeatherInfo(
            daily.weather_code[i],
            1
        );

        forecastHTML.push(`
            <div class="week-card" title="${condition}">
                <p>${day}</p>
                <span>${icon}</span>
                <p>${maxTemp}° / ${minTemp}°</p>
            </div>
        `);
    }

    container.innerHTML = forecastHTML.join("");
}


    // Load weather using coordinates
    async function loadWeather(city, latitude, longitude) {
        showMessage(`Loading weather for ${city}...`);

        const url = `${API_BASE}/weather.php?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Weather data unavailable.");
            }

            const current = data.current;
            updateHourlyForecast(data.hourly, current.time);
            updateWeeklyForecast(data.daily);
            updateWeatherBackground(current.weather_code);

            const [condition, icon] = getWeatherInfo(
                current.weather_code,
                current.is_day
            );

            cityName.textContent = city;
            temperature.textContent = `${Math.round(current.temperature_2m)}°`;
            weatherIcon.textContent = icon;
            weatherCondition.textContent = condition;

            feelsLike.textContent =
                `Feels like ${Math.round(current.apparent_temperature)}°C`;

            humidity.textContent = `${current.relative_humidity_2m}%`;
            windSpeed.textContent = `${current.wind_speed_10m} km/h`;
            clouds.textContent = `${current.cloud_cover}%`;
            pressure.textContent = `${Math.round(current.surface_pressure)} hPa`;

            updateDate(data.location.timezone);

            showMessage(`Weather updated: ${city}`);
        } catch (error) {
            console.error(error);
            showMessage(error.message || "Unable to load weather.");
        }
    }

    // Hide city suggestions
function hideSuggestions() {
    suggestionsBox.innerHTML = "";
    suggestionsBox.classList.remove("show");
    suggestionResults = [];
}

// Load city suggestions
async function loadCitySuggestions() {
    const city = cityInput.value.trim();

    if (city.length < 2) {
        hideSuggestions();
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE}/search_city.php?city=${encodeURIComponent(city)}`
        );

        const data = await response.json();

        // Ignore outdated search responses
        if (cityInput.value.trim() !== city) return;

        if (!response.ok || !data.success) {
            hideSuggestions();
            return;
        }

        suggestionResults = data.results;

        suggestionsBox.innerHTML = data.results.map((location, index) => `
            <div class="suggestion-item" data-index="${index}">
                ${location.name}
                <small>
                    ${location.admin1 ? location.admin1 + ", " : ""}
                    ${location.country || ""}
                </small>
            </div>
        `).join("");

        suggestionsBox.classList.add("show");

    } catch (error) {
        console.error("Suggestion error:", error);
        hideSuggestions();
    }
}

// Select city suggestion
async function selectSuggestion(index) {
    const location = suggestionResults[index];

    if (!location) return;

    const displayName = location.country
        ? `${location.name}, ${location.country}`
        : location.name;

    cityInput.value = location.name;

    hideSuggestions();

    await loadWeather(
        displayName,
        location.latitude,
        location.longitude
    );
}

    // Search city
    async function searchCity() {
        const city = cityInput.value.trim();

        if (!city) {
            showMessage("Please enter a city name!");
            cityInput.focus();
            return;
        }

        searchBtn.disabled = true;

        try {
            const response = await fetch(
                `${API_BASE}/search_city.php?city=${encodeURIComponent(city)}`
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "City not found.");
            }

            // Select first matching result
const location = data.results[0];

hideSuggestions();        

            const displayName = location.country
                ? `${location.name}, ${location.country}`
                : location.name;

            await loadWeather(
                displayName,
                location.latitude,
                location.longitude
            );

        } catch (error) {
            console.error(error);
            showMessage(error.message || "City search failed.");
        } finally {
            searchBtn.disabled = false;
        }
    }

// Live city suggestions
cityInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        loadCitySuggestions();
    }, 400);
});

// Select suggestion
suggestionsBox.addEventListener("click", (event) => {
    const item = event.target.closest(".suggestion-item");

    if (!item) return;

    selectSuggestion(Number(item.dataset.index));
});

// Search button
searchBtn.addEventListener("click", searchCity);

// Enter key
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchCity();
    }

    if (event.key === "Escape") {
        hideSuggestions();
    }
});

// Hide suggestions when clicking outside
document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-box")) {
        hideSuggestions();
    }
});

    // Initial weather: Dhaka
    loadWeather("Dhaka, Bangladesh", 23.8103, 90.4125);

    console.log("Weather App connected to PHP Backend!");
});
