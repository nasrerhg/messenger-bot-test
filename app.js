const express = require('express');
const bodyParser = require('body-parser');

const VERIFY_TOKEN = 'your_verification_token'; // Replace with your verification token from Facebook

const app = express();
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
  if (req.body.object === 'page') {
    // Verify the request
    if (req.body.verification_mode === 'challenge') {
      const challenge = req.body.challenge;
      console.log('Verifying webhook...');
      return res.status(200).send(challenge);
    }

    // Process incoming messages
    req.body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message) {
          const senderId = event.sender.id;
          const messageText = event.message.text;
          console.log(`Received message from ${senderId}: ${messageText}`);

          // Send a simple response
          const response = {
            text: `You sent: ${messageText}`,
          };
          sendTextMessage(senderId, response);
        }
      });
    });

    return res.status(200).send();
  }
});

// Function to send text messages (implementation details omitted for brevity)
function sendTextMessage(senderId, message) {
  // Implement logic to send message using Facebook Messenger API
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
