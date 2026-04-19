const nodemailer = require("nodemailer");

const {
  smtpHost,
  smtpPort,
  smtpSecure,
  smtpUser,
  smtpPass,
  smtpFrom,
} = require("../config/env");

let transporter = null;

function createTransporter() {
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM in backend .env"
    );
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure || smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

function getTransporter() {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
}

async function sendOtpEmail({ to, otp, expiryMinutes }) {
  const mailer = getTransporter();

  await mailer.sendMail({
    from: smtpFrom,
    to,
    subject: "Your TRT Traditional Wear OTP Code",
    text: `Your TRT Traditional Wear verification code is ${otp}. This code will expire in ${expiryMinutes} minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.5;">
        <h2 style="margin-bottom: 8px;">TRT Traditional Wear Verification Code</h2>
        <p style="margin-top: 0;">Use the OTP below to continue your sign in.</p>
        <p style="font-size: 28px; font-weight: 700; letter-spacing: 4px; margin: 14px 0;">${otp}</p>
        <p style="margin: 0;">This OTP expires in ${expiryMinutes} minutes.</p>
      </div>
    `,
  });
}

module.exports = {
  sendOtpEmail,
};
