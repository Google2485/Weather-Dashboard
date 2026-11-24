<?php

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../helpers/weather_helper.php';

// Get city name
$city = isset($_GET['city']) ? trim($_GET['city']) : '';

if ($city === '') {
    send_json([
        'success' => false,
        'message' => 'City name is required.'
    ], 400);
}

// Build API URL
$url = GEOCODING_API_URL . '?' . http_build_query([
    'name' => $city,
    'count' => 5,
    'language' => 'en',
    'format' => 'json'
]);

// Initialize cURL
$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_CAINFO => 'C:/wamp64/certs/cacert.pem',
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_USERAGENT => 'WeatherApp/1.0'
]);

// Execute request
$response = curl_exec($ch);

$curlError = curl_error($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

// Connection error
if ($response === false || $curlError !== '') {
    send_json([
        'success' => false,
        'message' => 'Geocoding connection failed.',
        'error' => $curlError
    ], 502);
}

// Check HTTP status
if ($httpCode !== 200) {
    send_json([
        'success' => false,
        'message' => 'Geocoding service returned an error.',
        'http_code' => $httpCode
    ], 502);
}

// Decode JSON
$data = json_decode($response, true);

if (!is_array($data)) {
    send_json([
        'success' => false,
        'message' => 'Invalid response from geocoding service.'
    ], 502);
}

// City not found
if (empty($data['results'])) {
    send_json([
        'success' => false,
        'message' => 'City not found.'
    ], 404);
}

// Success response
send_json([
    'success' => true,
    'query' => $city,
    'results' => $data['results']
]);
