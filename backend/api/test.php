<?php

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../helpers/weather_helper.php';

send_json([
    'success' => true,
    'message' => 'Weather Backend API is working!',
    'app' => APP_NAME,
    'environment' => APP_ENV
]);
