function addMessage(message, type, messageId = null) {
    const chatBox = document.getElementById('chat-box');
    
    // Create message container
    const messageElement = document.createElement('div');
    messageElement.className = message ${type};
    messageElement.innerText = message;

    // Add a pin button with an icon
    const pinButton = document.createElement('button');
    pinButton.className = 'pin-button';
    pinButton.style.border = 'none';
    pinButton.style.background = 'none';
    pinButton.style.cursor = 'pointer';
    pinButton.title = 'Pin this message';

    const pinIcon = document.createElement('img');
    pinIcon.src = 'pin-icon.png'; // Ensure this path is correct
    pinIcon.alt = 'Pin';
    pinIcon.style.width = '16px';
    pinIcon.style.height = '16px';

    pinButton.appendChild(pinIcon);

    // Add click event to pin the message
    pinButton.addEventListener('click', function() {
        pinMessage(message, messageId);
    });

    // Append the pin button to the message element
    messageElement.appendChild(pinButton);

    // Add the message element to the chat box
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function pinMessage(message, messageId) {
    fetch('pin_message.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message, messageId: messageId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Message pinned successfully!");
        } else {
            console.error("Failed to pin message:", data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userText = userInput.value.trim();

    if (userText === "") return;

    addMessage(userText, 'user');

    // Send message to the backend (implement backend in PHP or Node.js)
    fetch('process.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userText })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.botResponse;
        addMessage(botResponse, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
    });

    userInput.value = ''; // Clear input field
}
function pinMessage(message, messageId) {
    // Make sure message and messageId are provided
    if (!message || !messageId) return;

    // Send the message and messageId to the server to store it
    fetch('pin_message.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message, messageId: messageId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Message pinned successfully!");
        } else {
            console.error("Failed to pin message:", data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
script.js