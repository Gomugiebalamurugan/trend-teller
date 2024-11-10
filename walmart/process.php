<?php
// Database connection parameters
$servername = "localhost";
$username = "root"; // Update with your MySQL username
$password = ""; // Update with your MySQL password
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
$userMessage = $data['message'];

// Placeholder bot response logic
$botResponse = "I'm still learning. How can I assist you?";

// Save the chat to the database
$stmt = $conn->prepare("INSERT INTO chat_logs (user_message, bot_response) VALUES (?, ?)");
$stmt->bind_param("ss", $userMessage, $botResponse);
$stmt->execute();
$stmt->close();

// Return the bot response as JSON
$response = array("botResponse" => $botResponse);
echo json_encode($response);

// Close the database connection
$conn->close();
?>
process.php