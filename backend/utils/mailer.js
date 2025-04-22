const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.walla.co.il",
  port: 587,
  secure: false, // TLS ולא SSL מלא
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

function sendRegistrationEmail(toEmail, username) {
  const mailOptions = {
    from: `"Shos Shop 👟" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "ברוך הבא ל-Shos Shop!",
    html: `<h2>שלום ${username}!</h2>
           <p>תודה שנרשמת לאתר שלנו 🥳</p>
           <p>מקווים שתהנה מהקנייה אצלנו!</p>
           <p><b>צוות Shos Shop</b></p>`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendRegistrationEmail };
