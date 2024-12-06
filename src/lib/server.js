const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

app.post('/send-email', async (req, res) => {
  const { valid_passcode, user_email } = req.body;

  try {
    const response = await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
      {
        personalizations: [
          {
            to: [{ email: user_email }],
            subject: "Carpool With Me: One Time Passcode",
          },
        ],
        from: { email: 'wenx.chin@gmail.com' },
        content: [{ type: 'text/plain', value: `Your one time passcode is: ${valid_passcode}` }],
      },
      {
        headers: {
          Authorization: `Bearer {SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error.message);
    res.status(500).send('Failed to send email');
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
