const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/submit', async (req, res) => {
  const email = req.body.email;

  if (validateEmail(email)) {
    const transporter = nodemailer.createTransport({
      host: 'your-mail-provider-smtp-host', // Smtp host
      port: 587, // Smtp port
      secure: false, // true if secure connection required by your provider
      auth: {
        user: 'your-email@aaa.com', // YourMail
        pass: 'your-email-pass' // YourmailPassword
      }
    });

    // Email options
    const mailOptions = {
      from: 'your-email@aaa.com', // YourMail
      to: 'where-send-to@aaa.com',
      subject: 'New Email Submission',
      text: `Email: ${email}`
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(400).send('Invalid email address');
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});