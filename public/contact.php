<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $name = isset($data['name']) ? $data['name'] : 'Unknown';
    $email = isset($data['email']) ? $data['email'] : 'No Email';
    $phone = isset($data['phone']) ? $data['phone'] : 'No Phone';
    $city = isset($data['city']) ? $data['city'] : '';
    $category = isset($data['category']) ? $data['category'] : 'General';
    $course = isset($data['course']) ? $data['course'] : '';
    $targetCountry = isset($data['targetCountry']) ? $data['targetCountry'] : '';
    $source = isset($data['source']) ? $data['source'] : 'Website Contact Form';
    
    $htmlContent = "
    <h2>New Lead from $source</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $phone</p>
    " . ($city ? "<p><strong>City:</strong> $city</p>" : "") . "
    <p><strong>Category:</strong> $category</p>
    <p><strong>Course:</strong> $course</p>
    <p><strong>Target Country:</strong> $targetCountry</p>
    ";

    // Using the Resend API key from your server.ts
    $resendApiKey = 're_Yb66eeKq_3X7ct1z8YA6Uy6e1KVrJDsGd';

    $postData = json_encode([
        'from' => 'iExplain Education <onboarding@resend.dev>',
        'to' => ['iexplaineducation.online@gmail.com'],
        'subject' => "New Lead: $name - $category",
        'html' => $htmlContent
    ]);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $resendApiKey,
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        echo json_encode(["success" => true, "resend_response" => json_decode($response)]);
    } else {
        http_response_code(500);
        echo json_encode([
            "error" => "Failed to send email via Resend", 
            "httpCode" => $httpCode,
            "curlError" => $curlError,
            "details" => json_decode($response)
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
