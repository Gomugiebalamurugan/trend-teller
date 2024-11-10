<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chatbot";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the input from JavaScript
$input = file_get_contents("php://input");
$data = json_decode($input, true);
$message = $data['message'];
$messageId = $data['messageId'];

// Ensure both message and messageId are provided
if ($message && $messageId) {
    // Insert the pinned message into the database
    $stmt = $conn->prepare("INSERT INTO pinned_messages (message, message_id) VALUES (?, ?)");
    if ($stmt) {
        $stmt->bind_param("ss", $message, $messageId);
        $stmt->execute();
        $stmt->close();
        $response = array("success" => true);
    } else {
        $response = array("success" => false, "error" => $conn->error);
    }
} else {
    $response = array("success" => false, "error" => "Invalid input");
}

// Return success status as JSON
echo json_encode($response);

// Close the database connection
$conn->close();
?>
pin_message.php