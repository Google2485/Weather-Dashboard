<?php

function send_json($data, $status_code = 200)
{
    http_response_code($status_code);

    header('Content-Type: application/json; charset=utf-8');

    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    exit;
}
