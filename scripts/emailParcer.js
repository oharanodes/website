const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const email = req.body.email;

  if (validateEmail(email)) {
    const transporter = nodemailer.createTransport({
      host: 'your-mail-provider-smtp-host', // Your smtp
      port: 587, // Your smtp
      secure: false, // Set to true if secure connection required
      auth: {
        user: 'your-mail@aaa.com', // Your mail
        pass: 'your-mail-pass' // Your mail pass
      }
    });

    const mailOptions = {
      from: 'your-mail@aaa.com', // Your mail
      to: 'receive@aaa.com', // Receiving email
      subject: 'New Email Submission',
      text: `Email: ${email}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully!');
      }
    });
  } else {
    res.status(400).send('Invalid email address');
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}