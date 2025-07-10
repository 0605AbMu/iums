const nodemailer = require('nodemailer');

async function sendActivationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const url = `${process.env.BASE_URL}/api/auth/activate/${token}`;
  await transporter.sendMail({
    to: email,
    subject: 'Activate your account',
    html: `<p>Click <a href="${url}">here</a> to activate your account. Link expires in 1 hour.</p>`
  });
}

module.exports = {
  sendActivationEmail
};
