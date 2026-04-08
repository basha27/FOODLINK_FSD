const nodemailer = require('nodemailer');

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'sameerbashask2007@gmail.com',
      pass: 'zjtd zqpi wove mzxv'.replace(/\s+/g, '')
    }
  });

  try {
    console.log('Sending email...');
    await transporter.sendMail({
      from: 'test',
      to: 'sameerbashask2007@gmail.com',
      subject: 'Test Local SMTP',
      text: 'If you get this, credentials work locally!'
    });
    console.log('Success!');
  } catch (err) {
    console.error('Error:', err);
  }
}

testEmail();
