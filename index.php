<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App</title>

    <link rel="stylesheet" href="frontend/css/style.css">
</head>
<body>
<div id="weatherEffect" class="weather-effect"></div>

    <main class="weather-app">

        <!-- Header -->
        <header class="header">
            <div class="logo">
                <span class="logo-icon">☀</span>
                <span>Weatherly</span>
            </div>

            <div class="search-box">
    <span>⌕</span>

    <input
        type="text"
        id="citySearch"
        placeholder="Search city..."
        autocomplete="off"
    >

    <button id="searchBtn">Search</button>

    <div id="searchSuggestions" class="search-suggestions"></div>
</div>
        </header>

        <!-- Main Weather -->
        <section class="main-weather">

            <div class="location-info">
                <p id="cityName">Dhaka, Bangladesh</p>
                <p id="currentDate">Monday, November 23</p>
            </div>

            <div class="temperature">
                <h1 id="temperature">28°</h1>
                <div class="weather-icon" id="weatherIcon">☀️</div>
            </div>

            <h2 id="weatherCondition">Sunny</h2>
            <p id="feelsLike">Feels like 30°</p>

        </section>

        <!-- Weather Details -->
        <section class="weather-details">

            <div class="detail-card">
                <span>💧</span>
                <p>Humidity</p>
                <h3 id="humidity">72%</h3>
            </div>

            <div class="detail-card">
                <span>💨</span>
                <p>Wind Speed</p>
                <h3 id="windSpeed">12 km/h</h3>
            </div>

            <div class="detail-card">
                <span>☁️</span>
                <p>Clouds</p>
                <h3 id="clouds">20%</h3>
            </div>

            <div class="detail-card">
                <span>🌡️</span>
                <p>Pressure</p>
                <h3 id="pressure">1013 hPa</h3>
            </div>

        </section>

        <!-- Hourly Forecast -->
        <section class="forecast-section">

            <h2>Today's Forecast</h2>

            <div class="hourly-forecast" id="hourlyForecast">

                <div class="forecast-card">
                    <p>Now</p>
                    <span>☀️</span>
                    <h3>28°</h3>
                </div>

                <div class="forecast-card">
                    <p>12 PM</p>
                    <span>🌤️</span>
                    <h3>29°</h3>
                </div>

                <div class="forecast-card">
                    <p>1 PM</p>
                    <span>☀️</span>
                    <h3>30°</h3>
                </div>

                <div class="forecast-card">
                    <p>2 PM</p>
                    <span>⛅</span>
                    <h3>29°</h3>
                </div>

                <div class="forecast-card">
                    <p>3 PM</p>
                    <span>🌤️</span>
                    <h3>28°</h3>
                </div>

                <div class="forecast-card">
                    <p>4 PM</p>
                    <span>🌥️</span>
            <h3>27°</h3>
                </div>

            </div>

        </section>

        <!-- Weekly Forecast -->
        <section class="forecast-section">

            <h2>7-Day Forecast</h2>

            <div class="weekly-forecast" id="weeklyForecast">

                <div class="week-card">
                    <p>Today</p>
                    <span>☀️</span>
                    <p>30° / 24°</p>
                </div>

                <div class="week-card">
                    <p>Tue</p>
                    <span>🌤️</span>
                    <p>29° / 23°</p>
                </div>

                <div class="week-card">
                    <p>Wed</p>
                    <span>🌧️</span>
                    <p>27° / 22°</p>
                </div>

                <div class="week-card">
                    <p>Thu</p>
                    <span>⛅</span>
                    <p>28° / 23°</p>
                </div>

                <div class="week-card">
                    <p>Fri</p>
                    <span>☀️</span>
                    <p>31° / 24°</p>
                </div>

                <div class="week-card">
                    <p>Sat</p>
                    <span>🌤️</span>
            <p>30° / 23°</p>
                </div>

                <div class="week-card">
                    <p>Sun</p>
                    <span>🌧️</span>
                    <p>26° / 21°</p>
                </div>

            </div>

        </section>

        <footer class="footer">
    <p>Weather data powered by Open-Meteo</p>

    <p class="developer-credit">
        Developed with ❤️ by
        <strong>Abdullah Al Fahim</strong>
    </p>

    <p class="copyright">
        © 2026 Weather App. All Rights Reserved.
    </p>
</footer>

    </main>

    <script src="frontend/js/app.js"></script>

</body>
</html>
