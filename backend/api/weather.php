<?php

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../helpers/weather_helper.php';

// Default location: Dhaka
$latitude = isset($_GET['lat']) ? (float) $_GET['lat'] : 23.8103;
$longitude = isset($_GET['lon']) ? (float) $_GET['lon'] : 90.4125;

// Validate coordinates
if ($latitude < -90 || $latitude > 90 ||
    $longitude < -180 || $longitude > 180) {
    send_json([
        'success' => false,
        'message' => 'Invalid coordinates.'
    ], 400);
}

// Open-Meteo API URL
$url = WEATHER_API_URL . '?' . http_build_query([
    'latitude' => $latitude,
    'longitude' => $longitude,
    'current' => 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,cloud_cover,surface_pressure',
    'hourly' => 'temperature_2m,weather_code,is_day',
    'daily' => 'weather_code,temperature_2m_max,temperature_2m_min',
    'timezone' => 'auto'
]);

// cURL request
$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_CAINFO => 'C:/wamp64/certs/cacert.pem',
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_USERAGENT => 'WeatherApp/1.0'
]);

$response = curl_exec($ch);
$error = curl_error($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

if ($response === false || $error !== '') {
    send_json([
        'success' => false,
        'message' => 'Weather connection failed.',
        'error' => $error
    ], 502);
}

if ($httpCode !== 200) {
    send_json([
        'success' => false,
        'message' => 'Weather service returned an error.',
        'http_code' => $httpCode
    ], 502);
}

$data = json_decode($response, true);

if (!is_array($data) || !isset($data['current'])) {
    send_json([
        'success' => false,
        'message' => 'Invalid weather data received.'
    ], 502);
}

send_json([
    'success' => true,
    'location' => [
        'latitude' => $latitude,
        'longitude' => $longitude,
        'timezone' => $data['timezone'] ?? 'Unknown'
    ],
    'current' => $data['current'],
    'hourly' => $data['hourly'] ?? [],
    'daily' => $data['daily'] ?? []
]);
